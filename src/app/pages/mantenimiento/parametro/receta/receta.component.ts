import { PopupRecetaComponent } from './popup-receta/popup-receta.component';
import { SweetAlertService } from 'src/app/services/sweetalert.service';
import { MessageService } from 'primeng-lts/api';
import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../../../services/parametro.service';
import { DialogService } from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styles: [],
})
export class RecetaComponent implements OnInit {
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
      { field: 'receta', header: 'Receta', width: '40%' },
      { field: 'receta_descrpicion', header: 'Descripción', width: '30%' },
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
      this.parametroService.getParametroRecetas().subscribe(
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
    const ref = this.dialogService.open(PopupRecetaComponent, {
      data,
      header: 'Editar Receta',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupRecetaComponent: any) => {
      if (PopupRecetaComponent) {
        this.loadlist();
      }
    });
  }

  nuevo() {
    const data: any = null;
    const ref = this.dialogService.open(PopupRecetaComponent, {
      data,
      header: 'Crear Metodo de Pago',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupRecetaComponent: any) => {
      if (PopupRecetaComponent) {
        this.loadlist();
      }
    });
  }
}
