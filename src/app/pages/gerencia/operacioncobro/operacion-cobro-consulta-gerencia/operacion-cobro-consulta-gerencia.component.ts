import { ObraSocial } from 'src/app/models/obra-social.model';

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  PipeTransform,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import swal from 'sweetalert2';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

import { MessageService } from 'primeng-lts/api';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { PracticaService } from 'src/app/services/practica.service';
import { OperacionCobroDetalle } from 'src/app/models/operacion-cobro-detalle.model';
import { formatDate, CurrencyPipe } from '@angular/common';
import { OverlayPanelModule, OverlayPanel } from 'primeng-lts/overlaypanel';
import { PopupObraSocialComponent } from 'src/app/shared/popups/popup-obra-social/popup-obra-social.component';

import { ObraSocialService } from 'src/app/services/obra-social.service';
import { logo_clinica, calendarioIdioma } from './../../../../config/config';
import { PopupOperacionCobroRegistroEditarComponent } from '../../../../shared/popups/popup-operacion-cobro-registro-editar/popup-operacion-cobro-registro-editar.component';
import { PopupOperacionCobroEditarComponent } from '../../../../shared/popups/popup-operacion-cobro-editar/popup-operacion-cobro-editar.component';
import { PopupOperacionCobroRegistroBuscarComponent } from '../../../../shared/popups/popup-operacion-cobro-registro-buscar/popup-operacion-cobro-registro-buscar.component';

@Component({
  selector: 'app-operacion-cobro-consulta-gerencia',
  templateUrl: './operacion-cobro-consulta-gerencia.component.html',
  styleUrls: ['./operacion-cobro-consulta-gerencia.component.css'],
  providers: [MessageService, DialogService],
})
export class OperacionCobroConsultaGerenciaComponent implements OnInit {
  cantidad_practica: number = 0;
  total_facturado: number = 0;
  total_original: number = 0;
  cols: any[];
  selectedItem: OperacionCobroDetalle;
  popItem: OperacionCobroDetalle;
  newPopItem: boolean;
  resultSave: boolean;
  es: any;
  displayDialog: boolean;
  // LOADING
  loading: boolean;
  updateDataForm: FormGroup;
  formObraSocial: FormGroup;
  elemento: OperacionCobroDetalle = null;
  elementos: OperacionCobroDetalle[] = null;
  elementosFiltrados: OperacionCobroDetalle[] = null;
  selecteditems: OperacionCobroDetalle[] = [];
  selecteditemRegistro: OperacionCobroDetalle = null;
  popItemOperacionCobro: OperacionCobroDetalle = null;
  _id: number = 0;
  columns: any[];
  fechaDesde: Date;
  _fechaDesde: string;
  fechaHasta: Date;
  _fechaHasta: string;
  DateForm: FormGroup;
  popItemObraSocial: ObraSocial;

  constructor(
    private miServicio: PracticaService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private cp: CurrencyPipe
  ) {
    this.cols = [
      { field: 'accion', header: 'Accion', width: '6%' },
      { field: 'operacion_cobro_id', header: 'Cobro N??', width: '5%' },
      { field: 'apellido', header: 'Apellido', width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '10%' },
      { field: 'dni', header: 'DNI', width: '7%' },
      { field: 'obra_social_nombre', header: 'O.S', width: '15%' },
      { field: 'descripcion', header: 'Descrpici??n', width: '15%' },
      { field: 'complejidad', header: 'nivel', width: '5%' },
      { field: 'codigo', header: 'Codigo', width: '8%' },
      { field: 'medico_nombre', header: 'M??dico', width: '10%' },
      { field: 'usuario_cobro_nombre', header: 'Usuario', width: '8%' },
      { field: 'fecha_cobro', header: 'Fecha', width: '8%' },
      { field: 'motivo_observacion', header: 'Observac??n', width: '15%' },

      { field: 'cantidad', header: 'Cant.', width: '6%' },
      { field: 'valor_original', header: 'Orig.', width: '6%' },
      { field: 'valor_facturado', header: 'Fact.', width: '6%' },
      { field: 'distribucion', header: 'dist', width: '6%' },
      { field: 'forma_pago', header: 'Medio', width: '10%' },
    ];

    this.columns = [
      { title: 'Apellido', dataKey: 'apellido' },
      { title: 'Nombre', dataKey: 'nombre' },
      { title: 'DNI', dataKey: 'dni' },
      { title: 'Obra social', dataKey: 'obra_social_nombre' },
      { title: 'C??digo', dataKey: 'codigo' },
      { title: 'Descripci??n', dataKey: 'descripcion' },
      { title: 'Cant', dataKey: 'cantidad' },
      { title: 'Valor', dataKey: 'valor_facturado' },
      { title: 'Dist', dataKey: 'distribucion' },
      { title: 'Medio', dataKey: 'forma_pago' },
      { title: 'Usuario', dataKey: 'usuario_cobro_nombre' },
    ];

    this.DateForm = new FormGroup({
      fecha_desde: new FormControl('', Validators.required),
      fecha_hasta: new FormControl('', Validators.required),
      presentacion_nro: new FormControl(''),
      obra_social: new FormControl(''),
      buscar_paciente: new FormControl(''),
    });

    this.formObraSocial = new FormGroup({
      nombre: new FormControl('', Validators.required),
      id: new FormControl('86'),
      coseguro_nombre: new FormControl('Sin coseguro'),
      coseguro_id: new FormControl('86'),
      valor: new FormControl(0),
      coseguro_valor: new FormControl(0),
      pmo_descripcion: new FormControl(''),
      codigo: new FormControl(''),
      complejidad: new FormControl(''),
      total_practica_coseguro: new FormControl(0),
      total_practica: new FormControl(0),
      es_coseguro: new FormControl(),
      tiene_distribucion: new FormControl(),
    });
  }

  ngOnInit() {
    this.es = calendarioIdioma;
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.DateForm.patchValue({ fecha_desde: this.fechaDesde });
    this.DateForm.patchValue({ fecha_hasta: this.fechaHasta });
    this.popItemOperacionCobro = new OperacionCobroDetalle(
      '',
      '',
      0,
      0,
      0,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      0,
      0,
      0,
      '',
      '',
      '',
      0
    );
  }

  actualizarFechaDesde(event) {
    console.log(event);
    this.fechaDesde = event;
    console.log(new Date(this.fechaDesde));
  }

  actualizarFechaHasta(event) {
    console.log(event);
    this.fechaHasta = event;
    console.log(new Date(this.fechaHasta));
  }

  /** CARGA LA LISTA **/

  editRow(row) {
    console.log(row.data);
    this.popItem = row.data;
    /* if( this.actualizarDatos()){
            this.showToast('exito','Registro modificado','Exito al modificar');
        }*/
  }

  accion(
    event: any,
    overlaypanel: OverlayPanel,
    elementos: OperacionCobroDetalle
  ) {
    if (elementos) {
      this.selecteditemRegistro = elementos;
    }
    console.log(this.selecteditemRegistro);
    overlaypanel.toggle(event);
  }

  sumarValores(vals: any) {
    let i: number;
    //console.log(vals[1]['valor_facturado']);
    console.log(vals.length);
    this.total_facturado = 0;
    this.total_original = 0;
    this.cantidad_practica = 0;
    for (i = 0; i < vals.length; i++) {
      this.total_original =
        this.total_original + Number(vals[i]['valor_original']);
      this.total_facturado =
        this.total_facturado + Number(vals[i]['valor_facturado']);
    }
    this.cantidad_practica = vals.length;
    console.log(this.total_facturado);
  }

  filtered(event) {
    console.log(event.filteredValue);
    this.elementosFiltrados = event.filteredValue;
    this.sumarValores(this.elementosFiltrados);
  }

  editarRegistro() {
    let data: any;
    data = this.selecteditemRegistro;
    const ref = this.dialogService.open(
      PopupOperacionCobroRegistroEditarComponent,
      {
        data,
        header: 'Editar registro',
        width: '98%',
        height: '90%',
      }
    );

    ref.onClose.subscribe(
      (PopupOperacionCobroRegistroEditarComponent: OperacionCobroDetalle) => {
        this.loadRegistro();
        if (PopupOperacionCobroRegistroEditarComponent) {
          console.log(PopupOperacionCobroRegistroEditarComponent);
          this.popItemOperacionCobro =
            PopupOperacionCobroRegistroEditarComponent;

          //  this.formObraSocial.patchValue({id: this.popItemObraSocial.id});
          // this.formObraSocial.patchValue({nombre: this.popItemObraSocial.nombre});
        }
      }
    );
  }

  editarOperacionCobro() {
    let data: any;
    data = this.selecteditemRegistro;
    const ref = this.dialogService.open(PopupOperacionCobroEditarComponent, {
      data,
      header: 'Editar registro',
      width: '98%',
      height: '90%',
    });
    ref.onClose.subscribe(
      (PopupOperacionCobroEditarComponent: OperacionCobroDetalle) => {
        this.loadRegistro();
        if (PopupOperacionCobroEditarComponent) {
          console.log(PopupOperacionCobroEditarComponent);
          //  this.popItemOperacionCobro = PopupOperacionCobroEditarComponent;

          //  this.formObraSocial.patchValue({id: this.popItemObraSocial.id});
          // this.formObraSocial.patchValue({nombre: this.popItemObraSocial.nombre});
        }
      }
    );
  }

  eliminarRegistro() {
    swal({
      title: '??Desea eliminar el registro?',
      text: 'Va a eliminar un registro',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FF8A65',
      cancelButtonColor: '#C5E1A5',
      confirmButtonText: 'Si, guardar!',
    }).then((result) => {
      if (result.value) {
        this.deleteRegistro(this.selecteditemRegistro.id);
      }
    });
  }

  afectarRegistros() {
    console.log(this.selecteditems);
    let td = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm', 'en');
    let th = formatDate(this.fechaHasta, 'dd/MM/yyyy HH:mm', 'en');
    /* if(this.elementosFiltrados.length != this.elementos.length){
        console.log(this.elementosFiltrados);
    }*/
    swal({
      title: '??Desea afectar estos  registros?',
      text:
        'Va a afectar una liquidacion con fecha desde ' +
        td +
        ' y fecha hasta ' +
        th +
        ' para la obra social ' +
        this.formObraSocial.value.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C5E1A5',
      cancelButtonColor: '#FF8A65',
      confirmButtonText: 'Si, guardar!',
    }).then((result) => {
      if (result.value) {
        this.selecteditems.forEach((element) => {
          element['usuario_audita_id'] = 1; // DEBE SER MODIFICADO PARA QUE AUDITE EL USUARIO
        });
        this.auditarRegistros();
      }
    });
  }
  buscarObraSocial() {
    let data: any;
    const ref = this.dialogService.open(PopupObraSocialComponent, {
      data,
      header: 'Buscar Practica',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupObraSocialComponent: ObraSocial) => {
      if (PopupObraSocialComponent) {
        console.log(PopupObraSocialComponent);
        this.popItemObraSocial = PopupObraSocialComponent;
        this.formObraSocial.patchValue({ id: this.popItemObraSocial.id });
        this.formObraSocial.patchValue({
          nombre: this.popItemObraSocial.nombre,
        });
      }
    });
  }

  buscarPractica() {
    let data: any;
    const ref = this.dialogService.open(
      PopupOperacionCobroRegistroBuscarComponent,
      {
        data,
        header: 'Buscar Practica',
        width: '100%',
        height: '100%',
      }
    );

    ref.onClose.subscribe(
      (PopupOperacionCobroRegistroBuscarComponent: ObraSocial) => {
        if (PopupObraSocialComponent) {
          console.log(PopupOperacionCobroRegistroBuscarComponent);
        }
      }
    );
  }

  loadRegistro() {
    this.es = calendarioIdioma;
    this.loading = true;
    this._fechaDesde = formatDate(this.fechaDesde, 'yyyy-MM-dd HH:mm', 'en');
    this._fechaHasta = formatDate(this.fechaHasta, 'yyyy-MM-dd HH:mm', 'en');
    console.log(this._fechaDesde + ' ' + this._fechaHasta);
    try {
      this.miServicio
        .getOperacionCobroRegistrosBetweenDates(
          this._fechaDesde,
          this._fechaHasta,
          'PEN'
        )
        .subscribe(
          (resp) => {
            if (resp[0]) {
              this.elementos = resp;
              console.log(this.elementos);
            } else {
              this.elementos = null;
            }

            this.loading = false;
            console.log(resp);
            this.sumarValores(resp);
          },
          (error) => {
            // error path
            console.log(error.message);
            console.log(error.status);
            this.throwAlert(
              'error',
              'Error: ' + error.status + '  Error al cargar los registros',
              error.message,
              error.status
            );
          }
        );
    } catch (error) {
      this.throwAlert(
        'error',
        'Error al cargar los registros',
        error,
        error.status
      );
    }
  }

  deleteRegistro(id: string) {
    try {
      this.miServicio.destroyByPracticaById(id).subscribe(
        (resp) => {
          if (resp == 1) {
            this.throwAlert(
              'success',
              'Se modific?? el registro con ??xito',
              '',
              ''
            );
            this.loadRegistro();
          } else {
            this.throwAlert(
              'error',
              'No se elimino ningun registro',
              'Registro',
              '200'
            );
          }

          this.loading = false;
          console.log(resp);
          this.sumarValores(resp);
        },
        (error) => {
          // error path
          console.log(error.message);
          console.log(error.status);
          this.throwAlert(
            'error',
            'Error: ' + error.status + '  Error al cargar los registros',
            error.message,
            error.status
          );
        }
      );
    } catch (error) {
      this.throwAlert(
        'error',
        'Error al cargar los registros',
        error,
        error.status
      );
    }
  }

  auditarRegistros() {
    try {
      console.log(JSON.stringify(this.selecteditems));
      this.miServicio.auditarpractica(this.selecteditems).subscribe(
        (resp) => {
          console.log(resp);
          if (resp != 0) {
            this.throwAlert(
              'success',
              'Se auditaron con ??xito ' + resp + ' registros',
              '',
              ''
            );
            this.loadRegistro();
          }

          this.loading = false;
          console.log(resp);
          this.sumarValores(resp);
        },
        (error) => {
          // error path
          console.log(error.message);
          console.log(error.status);
          this.throwAlert(
            'error',
            'Error: ' + error.status + '  Error al cargar los registros',
            error.message,
            error.status
          );
        }
      );
    } catch (error) {
      this.throwAlert(
        'error',
        'Error al cargar los registros',
        error,
        error.status
      );
    }
  }

  generarPdfListado(filtro: string) {
    console.log(this.selecteditems);
    let _fechaEmision = formatDate(new Date(), 'dd/MM/yyyy HH:mm', 'en');
    let _fechaDesde = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm', 'en');
    let _fechaHasta = formatDate(this.fechaHasta, 'dd/MM/yyyy HH:mm', 'en');
    let tfacturado: number = 0;
    let ttransferencia: number = 0;
    let tdebito: number = 0;
    let tcredito: number = 0;
    let tefectivo: number = 0;
    let tpractica: number = 0;
    let tvarios: number = 0;
    let tcheque: number = 0;
    let tconsulta_medico: number = 0;
    let testudio_medico: number = 0;
    let testudio_clinica: number = 0;
    let ttotal_medico: number = 0;

    let i = 0;
    for (i = 0; i < this.selecteditems.length; i++) {
      if (this.selecteditems[i]['forma_pago'] === 'TRANSFERENCIA') {
        ttransferencia =
          ttransferencia + Number(this.selecteditems[i]['valor_facturado']);
      }
      if (this.selecteditems[i]['forma_pago'] === 'EFECTIVO') {
        tefectivo =
          tefectivo + Number(this.selecteditems[i]['valor_facturado']);
      }
      if (this.selecteditems[i]['forma_pago'] === 'TARJETA - CREDITO') {
        tcredito = tcredito + Number(this.selecteditems[i]['valor_facturado']);
      }
      if (this.selecteditems[i]['forma_pago'] === 'TARJETA - DEBITO') {
        tdebito = tdebito + Number(this.selecteditems[i]['valor_facturado']);
      }
      if (this.selecteditems[i]['forma_pago'] === 'CHEQUE') {
        tcheque = tcheque + Number(this.selecteditems[i]['valor_facturado']);
      }
      if (this.selecteditems[i]['forma_pago'] === 'VARIOS') {
        tvarios = tvarios + Number(this.selecteditems[i]['valor_facturado']);
      }
      console.log(this.selecteditems[i]['complejidad']);
      if (
        this.selecteditems[i]['complejidad'] == '2' &&
        this.selecteditems[i]['forma_pago'] !== 'TRANSFERENCIA' &&
        this.selecteditems[i]['forma_pago'] !== 'TARJETA - CREDITO' &&
        this.selecteditems[i]['forma_pago'] !== 'TARJETA - DEBITO'
      ) {
        console.log(this.selecteditems[i]['valor_facturado']);
        testudio_medico =
          testudio_medico +
          Number(this.selecteditems[i]['valor_facturado']) * 0.5;
        ttotal_medico = Number(ttotal_medico) + Number(testudio_medico);
      }

      if (
        this.selecteditems[i]['complejidad'] == '1' &&
        this.selecteditems[i]['forma_pago'] !== 'TRANSFERENCIA' &&
        this.selecteditems[i]['forma_pago'] !== 'TARJETA - CREDITO' &&
        this.selecteditems[i]['forma_pago'] !== 'TARJETA - DEBITO'
      ) {
        tconsulta_medico =
          tconsulta_medico + Number(this.selecteditems[i]['valor_facturado']);
        ttotal_medico = Number(ttotal_medico) + Number(tconsulta_medico);
      }
      tfacturado =
        tfacturado + Number(this.selecteditems[i]['valor_facturado']);
    }
    //tfacturado = Number(this.cp.transform(tfacturado, '', 'symbol-narrow', '1.2-2'));
    let userData = JSON.parse(localStorage.getItem('userData'));
    console.log(this.elementosFiltrados);
    console.log(this.selecteditems);

    if (this.selecteditems) {
      let _fechaDesde = formatDate(this.fechaDesde, 'dd/MM/yyyy HH:mm', 'en');
      let _fechaHasta = formatDate(this.fechaHasta, 'dd/MM/yyyy HH:mm', 'en');
      var doc = new jsPDF('landscape');
      /** valores de la pagina**/
      const pageSize = doc.internal.pageSize;
      const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      doc.addImage(logo_clinica, 'PNG', 10, 10, 40, 11, undefined, 'FAST');
      doc.setLineWidth(0.4);

      doc.line(10, 33, pageWidth - 10, 33);
      doc.setFontSize(12);
      doc.text('LISTADO DE ORDENES', pageWidth / 2, 15, null, null, 'center');
      doc.setFontSize(6);
      doc.text(
        'Emitido : ' + _fechaEmision,
        pageWidth / 2,
        20,
        null,
        null,
        'center'
      );
      doc.setFontSize(8);

      doc.setFontSize(6);
      doc.text(
        15,
        38,
        'Tarjeta : ' + this.cp.transform(tcredito, '', 'symbol-narrow', '1.2-2')
      );
      doc.text(
        45,
        38,
        'Debito: ' + this.cp.transform(tdebito, '', 'symbol-narrow', '1.2-2')
      );
      doc.text(
        75,
        38,
        'Efectivo: ' +
          this.cp.transform(tefectivo, '', 'symbol-narrow', '1.2-2')
      );
      doc.text(
        105,
        38,
        'Transferencia: ' +
          this.cp.transform(ttransferencia, '', 'symbol-narrow', '1.2-2')
      );
      doc.text(
        135,
        38,
        'Total : ' + this.cp.transform(tfacturado, '', 'symbol-narrow', '1.2-2')
      );
      doc.setFontSize(8);
      if (filtro === 'medico') {
        doc.text(
          pageWidth - 60,
          15,
          'M??dico : ' + this.selecteditems[0]['medico_nombre']
        );
        doc.text(
          pageWidth - 60,
          20,
          'Usuario : ' + userData['nombreyapellido']
        );
        doc.text(pageWidth - 60, 25, 'Desde : ' + _fechaDesde);
        doc.text(pageWidth - 60, 30, 'Hasta : ' + _fechaHasta);

        doc.text(
          pageWidth - 100,
          15,
          'Pr??cticas : ' +
            this.cp.transform(testudio_medico, '', 'symbol-narrow', '1.2-2')
        );
        doc.text(
          pageWidth - 100,
          20,
          'Consultas: ' +
            this.cp.transform(tconsulta_medico, '', 'symbol-narrow', '1.2-2')
        );
        // doc.line(pageWidth-100, 23, pageWidth-80, 23);
        // doc.setFontSize(10);
        // doc.text(pageWidth-100, 30, 'Total : ' +this.cp.transform(ttotal_medico, '', 'symbol-narrow', '1.2-2') );
        doc.setFontSize(8);
      } else {
        doc.text(pageWidth - 60, 15, 'CLINICA DE LA VISION');
        doc.text(
          pageWidth - 60,
          20,
          'Usuario : ' + userData['nombreyapellido']
        );
        doc.text(pageWidth - 60, 25, 'Desde : ' + _fechaDesde);
        doc.text(pageWidth - 60, 30, 'Hasta : ' + _fechaHasta);
        doc.text(
          pageWidth / 2,
          30,
          'Pr??cticas : ' +
            this.cp.transform(testudio_medico, '', 'symbol-narrow', '1.2-2')
        );
      }
      doc.setFontSize(10);

      doc.setFontSize(8);
      doc.autoTable(this.columns, this.selecteditems, {
        margin: { horizontal: 5, vertical: 42 },
        bodyStyles: { valign: 'top' },
        styles: {
          fontSize: 6,
          cellWidth: 'wrap',
          rowPageBreak: 'auto',
          halign: 'justify',
        },
        columnStyles: { text: { cellWidth: 'auto' } },
      });
      // doc.save('rendicion-de-caja'+_fechaEmision+'.pdf');
      window.open(doc.output('bloburl'));
    }
  }

  colorRow(estado: string) {
    if (estado == 'EFECTIVO') {
      return { 'es-efectivo': 'null' };
    }
    if (estado == 'TARJETA - DEBITO') {
      return { 'es-tarjeta-debito': 'null' };
    }
    if (estado == 'TARJETA - CREDITO') {
      return { 'es-tarjeta-credito': 'null' };
    }
    if (estado == 'TRANSFERENCIA') {
      return { 'es-transferencia': 'null' };
    }
  }

  showToast(estado: string, mensaje: string, encabezado: string) {
    if (estado == 'exito') {
      this.messageService.add({
        severity: 'success',
        summary: mensaje,
        detail: encabezado,
      });
    }
    if (estado == 'info') {
      this.messageService.add({
        severity: 'info',
        summary: 'El campo no es correcto',
        detail: 'Los datos del campo son incorrectos',
      });
    }
    if (estado == 'warning') {
      this.messageService.add({
        severity: 'warning',
        summary: 'El campo no es correcto',
        detail: 'Los datos del campo son incorrectos',
      });
    }
    if (estado == 'error') {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo modificar el registro',
      });
    }
  }

  throwAlert(
    estado: string,
    mensaje: string,
    motivo: string,
    errorNumero: string
  ) {
    let tipoerror: string;

    if (estado == 'success') {
      swal({
        type: 'success',
        title: 'Exito',
        text: mensaje,
      });
    }

    if (errorNumero == '422') {
      mensaje =
        'Los datos que esta tratando de guardar son iguales a los que ya poseia';
      swal({
        type: 'warning',
        title: 'Atenci??n..',
        text: mensaje,
        footer: motivo,
      });
    }

    if (estado == 'error' && errorNumero != '422') {
      if (errorNumero == '422') {
        mensaje =
          'Los datos que esta tratando de guardar son iguales a los que ya poseia';
      }
      if (errorNumero == '400 ') {
        mensaje = 'Bad Request ';
      }
      if (errorNumero == '404') {
        mensaje = 'No encontrado ';
      }
      if (errorNumero == '401') {
        mensaje = 'Sin autorizaci??n';
      }
      if (errorNumero == '403') {
        mensaje =
          ' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
      }
      if (errorNumero == '405') {
        mensaje = 'M??todo no permitido';
      }
      if (errorNumero == '500') {
        mensaje = 'Error interno en el servidor';
      }
      if (errorNumero == '503') {
        mensaje = 'Servidor no disponible';
      }
      if (errorNumero == '502') {
        mensaje = 'Bad gateway';
      }

      swal({
        type: 'error',
        title: 'Oops...',
        text: mensaje,
        footer: motivo,
      });
    }
  }
}
