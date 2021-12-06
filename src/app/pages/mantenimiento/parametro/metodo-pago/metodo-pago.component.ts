import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { MessageService } from 'primeng-lts/api';
import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../../../services/parametro.service';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { PopupMetodoPagoComponent } from './popup-metodo-pago/popup-metodo-pago.component';

@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.component.html',
  styles: [],
})
export class MetodoPagoComponent implements OnInit {
  cols: any[];
  columns: any[];
  elementos: any[];
  selecteditems: any;
  loading;

  constructor(
    private parametroService: ParametroService,
    private sweetAlertService: SweetAlertService,
    public dialogService: DialogService,
    private messageService: MessageService
  ) {
    this.cols = [
      { field: 'forma_pago', header: 'Forma Pago', width: '70%' },
      { field: 'estado', header: 'Estado', width: '20%' },
      { field: '', header: 'Acción', width: '10%' },
    ];
  }

  ngOnInit() {
    this.loadlist();
  }

  loadlist() {
    this.loading = true;
    try {
      this.parametroService.getParametroMetodoPagos().subscribe(
        (resp) => {
          this.elementos = resp;
          console.log(this.elementos);
          this.loading = false;
          console.log(resp);
        },
        (error) => {
          // error path
          /*           console.log(error);
          this.sweetAlertService.errorAlert(
            'Error',
            error,
            error.Status,
            false
          ); */
        }
      );
    } catch (error) {
      //  this.sweetAlertService.errorAlert('Error', error, error.Status, false);
    }
  }

  buscar(elemento: any) {
    console.log(elemento);
    const data: any = elemento;
    const ref = this.dialogService.open(PopupMetodoPagoComponent, {
      data,
      header: 'Editar Metodo de Pago',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupMetodoPagoComponent: any) => {
      if (PopupMetodoPagoComponent) {
        this.loadlist();
      }
    });
  }

  nuevo() {
    const data: any = null;
    const ref = this.dialogService.open(PopupMetodoPagoComponent, {
      data,
      header: 'Crear Metodo de Pago',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupMetodoPagoComponent: any) => {
      if (PopupMetodoPagoComponent) {
        this.loadlist();
      }
    });
  }
}
