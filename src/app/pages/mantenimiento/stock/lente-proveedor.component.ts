import { ParametroService } from './../../../services/parametro.service';
import { SweetAlertService } from './../../../services/sweetalert.service';
import { MessageService } from 'primeng-lts/api';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { LenteComponent } from './lente/lente.component';

@Component({
  selector: 'app-lente-proveedor',
  templateUrl: './lente-proveedor.component.html',
})
export class LenteProveedorComponent implements OnInit {
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
      { field: 'tipo', header: 'Tipo lente', width: '45%' },
      { field: 'proveedor', header: 'Proveedor', width: '45%' },
      { field: '', header: 'Acción', width: '10%' },
    ];
  }

  ngOnInit() {
    this.loadlist();
  }

  loadlist() {
    this.loading = true;
    try {
      this.parametroService.getLentesProveedor().subscribe(
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
    const ref = this.dialogService.open(LenteComponent, {
      data,
      header: 'Editar Lente con proveedor',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((LenteComponent: any) => {
      if (LenteComponent) {
        this.loadlist();
      }
    });
  }

  nuevo() {
    const data: any = null;
    const ref = this.dialogService.open(LenteComponent, {
      data,
      header: 'Crear Lente con proveedor',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((LenteComponent: any) => {
      if (LenteComponent) {
        this.loadlist();
      }
    });
  }
}
