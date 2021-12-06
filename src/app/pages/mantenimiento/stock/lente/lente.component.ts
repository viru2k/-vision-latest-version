import { Component, OnInit } from '@angular/core';
import { SweetAlertService } from './../../../../services/sweetalert.service';
import { ParametroService } from './../../../../services/parametro.service';
import {
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng-lts/dynamicdialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lente',
  templateUrl: './lente.component.html',
  styleUrls: ['./lente.component.css'],
})
export class LenteComponent implements OnInit {
  updateDataForm: FormGroup;
  elementos: any;
  unidades: any;
  unidad: string;
  esNuevo;
  loading;
  selectedItem: any;
  selectedForma: any;
  userData: any;

  constructor(
    public config: DynamicDialogConfig,
    private parametroService: ParametroService,
    private sweetAlertService: SweetAlertService,
    public ref: DynamicDialogRef
  ) {
    this.updateDataForm = new FormGroup({
      id: new FormControl(''),
      proveedor: new FormControl('', Validators.required),
      tipo: new FormControl(''),
    });
  }

  ngOnInit() {
    console.log(this.config.data);
    if (this.config.data) {
      console.log('es editable');
      this.esNuevo = false;
      this.updateDataForm.patchValue(this.config.data);
      console.log(this.updateDataForm);
    } else {
      this.esNuevo = true;
    }
  }

  guardarDatos() {
    if (this.esNuevo) {
      this.crear();
    } else {
      this.modificar();
    }
  }

  crear() {
    this.setEstado();
    this.loading = true;
    try {
      this.parametroService
        .setLenteProveedor(this.updateDataForm.value)
        .subscribe(
          (resp) => {
            this.loading = false;
            console.log(resp);
            this.ref.close(resp);
          },
          (error) => {
            // error path
            console.log(error);
            this.sweetAlertService.errorAlert('error', error, '', false);
          }
        );
    } catch (error) {}
  }

  modificar() {
    this.setEstado();
    console.log(this.updateDataForm.value.id);

    console.log(this.updateDataForm);
    try {
      this.parametroService
        .putLenteProveedor(
          this.updateDataForm.value,
          this.updateDataForm.value.id
        )
        .subscribe(
          (resp) => {
            this.loading = false;
            console.log(resp);
            this.ref.close(resp);
          },
          (error) => {
            // error path
            console.log(error);
          }
        );
    } catch (error) {}
  }

  private setEstado(): void {
    if (this.updateDataForm.value.esActivo) {
      this.updateDataForm.patchValue({ estado: 'ACTIVO' });
    } else {
      this.updateDataForm.patchValue({ estado: 'INACTIVO' });
    }
  }
}
