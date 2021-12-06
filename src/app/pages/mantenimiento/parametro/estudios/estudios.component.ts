import { SweetAlertService } from './../../../../services/sweetalert.service';
import { MessageService } from 'primeng-lts/api';
import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../../../services/parametro.service';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { PopupEstudiosComponent } from './popup-estudios/popup-estudios.component';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styles: [],
})
export class EstudiosComponent implements OnInit {
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
      { field: 'estudio', header: 'Estudio', width: '45%' },
      { field: 'estudio_descripcion', header: 'Descripción', width: '45%' },
      { field: 'estado', header: 'Estado', width: '10%' },
      { field: '', header: 'Acción', width: '10%' },
    ];
  }

  ngOnInit() {
    console.log('cargando insumo');
    this.loadlist();
  }

  loadlist() {
    this.loading = true;
    try {
      this.parametroService.getParametroEstudios().subscribe(
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
    const ref = this.dialogService.open(PopupEstudiosComponent, {
      data,
      header: 'Editar Estudio',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupEstudiosComponent: any) => {
      if (PopupEstudiosComponent) {
        this.loadlist();
      }
    });
  }

  nuevo() {
    const data: any = null;
    const ref = this.dialogService.open(PopupEstudiosComponent, {
      data,
      header: 'Crear Estudio',
      width: '50%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupEstudiosComponent: any) => {
      if (PopupEstudiosComponent) {
        this.loadlist();
      }
    });
  }
}
