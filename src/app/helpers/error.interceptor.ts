import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SweetAlertService } from '../services/sweetalert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    public sweetAlertService: SweetAlertService
  ) {}

  popupResponse: any;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        let reserr = String(err.status);

        if (reserr === '0') {
          this.popupResponse = this.sweetAlertService.errorAlert(
            err.statusText,
            err.message,
            'ERROR ' + reserr,
            false
          );
        }

        if (reserr.charAt(0) === '4') {
          if (reserr !== '429' && reserr !== '401') {
            this.popupResponse = this.sweetAlertService.warningAlert(
              'Error al realizar la acción',
              err.name + ' ----  ' + err.message,
              'ERROR ' + reserr,
              false
            );
          }

          if (reserr === '401') {
            this.authenticationService.logout();
            this.router.navigateByUrl('/login');
            this.popupResponse = this.sweetAlertService.errorAlert(
              'Sin autorización',
              'Su sesión expiro o no posee los permisos para acceder',
              'ERROR ' + reserr,
              false
            );
            window.location.reload();
            if (this.popupResponse.value) {
              console.log('click sin autorizar');
            } else {
              // press cancel on popup
            }
          }

          if (reserr === '429') {
            this.popupResponse = this.sweetAlertService.warningAlert(
              'Error al realizar la acción',
              'Se han realizado demasiadas peticiones para la misma tarea, aguarde unos minutos y vuelva a intentarlo',
              'ERROR ' + reserr,
              false
            );
          }
        }

        if (reserr === '500') {
          console.log('error', reserr);
          this.sweetAlertService.errorAlert(
            'ERROR INTERNO DEL SERVIDOR',
            err.message,
            'ERROR ' + reserr,
            false
          );
        }

        const error = err.error.message || err.statusText;

        return throwError(error);
      })
    );
  }
}
