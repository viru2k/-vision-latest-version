import { Component, OnInit } from '@angular/core';
import { FacturacionV2Service } from './../../../../services/facturacion-v2.service';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import swal from 'sweetalert2';
import { calendarioIdioma, logo_clinica } from './../../../../config/config';
import { PopupFacturaRenglonComponent } from './../../../factura/factura-electronica/popups/popup-factura-renglon/popup-factura-renglon.component';
import { DialogService } from 'primeng-lts/dynamicdialog';
import { MessageService } from 'primeng-lts/api';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { FacturaElectronicaRenglon } from './../../../../models/factura-electronica-renglon.model';
import {
  FacturaElectronica,
  FacturaElectronicaPdfBody,
} from './../../../../models/factura-electronica.model';
import { formatDate, CurrencyPipe } from '@angular/common';
import { FacturaAlicuotaAsociada } from '../../../../models/factura_alicuota_asociada.model';
import { PopupLiquidacionDetalleComponent } from '../../../../shared/popups/popup-liquidacion-detalle/popup-liquidacion-detalle.component';
import { PopupPacienteObrasocialComponent } from './../../../../shared/popups/popup-paciente-obrasocial/popup-paciente-obrasocial.component';
import { Paciente } from './../../../../models/paciente.model';
import { PopupProveedorFindComponent } from '../../../../shared/popups/popup-proveedor-find/popup-proveedor-find.component';
import { BuscarComprobanteAfipComponent } from '../../factura-electronica/popups/buscar-comprobante-afip/buscar-comprobante-afip.component';

import * as html2canvas from 'html2canvas';
import { PopupFacturaImpresionComponent } from './popup-factura-impresion/popup-factura-impresion.component';
@Component({
  selector: 'app-factura-electronica',
  templateUrl: './factura-electronica.component.html',
  styleUrls: ['./factura-electronica.component.css'],
  providers: [MessageService, DialogService],
})
export class FacturaElectronicaComponent implements OnInit {
  cols: any[];
  loading: boolean;
  loadingspinner: boolean;
  credito: boolean;
  elementos: FacturaElectronicaRenglon[] = [];
  elementosPDF: any[] = [];
  elementosAlicuota: any[] = null;
  elementosMedicos: any[] = null;
  elementosComprobante: any[] = null;
  elementosConcepto: any[] = null;
  elementosDocumento: any[] = null;
  elementosPtoVta: any[] = null;
  elementosCondicionIva: any[] = null;
  selecteditems: FacturaElectronicaRenglon = null;
  elementoAlicuota: number = null;
  elementoMedicos: any = null;
  //elementoComprobante: number = null;
  elementoComprobante: any = null;
  elementoComprobanteCredito: number = 0;
  elementoConcepto: number = null;
  elementoDocumento: number = null;
  elementoPtoVta: number = null;
  elementoPtoVtaCredito: number = null;
  elementoCondicionIva: number = null;
  comprobante_credito: string = null;
  selecteditemRegistro: FacturaElectronicaRenglon = null;
  selecteditemRenglon: FacturaElectronicaRenglon = null;
  facturaAlicuotaAsociada: FacturaAlicuotaAsociada[] = [];

  pto_vta: string = '0';
  _pto_vta: string = '0';
  pto_vta_credito: string = '0';
  _pto_vta_credito: string = '0';
  _medico_nombre = '';
  _comprobante_nombre = '';
  _comprobante_nombre_credito = '';
  factura_numero: string = '0';
  factura_numero_ceros: string = '0';
  comprobante_id = 0;
  comprobante_id_credito = 0;
  nrodocumento: string = '0';
  observacion: string = '';
  cliente: string = '';
  CAE: string = null;
  CAE_vto: string;
  factura_nro: string;
  _factura_nro: string;
  es: any;
  fecha: Date;
  _fecha: string;
  fechaDesde: Date;
  _fechaDesde: string;
  fechaHasta: Date;
  _fechaHasta: string;
  columns: any[];
  /***valores totales */
  cantidad: number = 0;
  subtotal: number = 0;
  subtotal_excento: number = 0;
  subtotal_iva: number = 0;
  total: number = 0;
  importe_total: number = 0;
  importe_total_neto_no_gravado: number = 0;
  importe_neto: number = 0;
  importe_op_exenta: number = 0;
  importe_iva: number = 0;
  userData;
  medico_id: string;
  peticion: string;
  es_afip: string;
  movimiento: FacturaElectronicaRenglon;

  public myAngularxQrCode: string = null;

  constructor(
    private facturacionService: FacturacionV2Service,
    public dialogService: DialogService,
    private messageService: MessageService,
    private cp: CurrencyPipe
  ) {
    this.myAngularxQrCode = 'ItSoluionStuff.com';
    this.cols = [
      { field: 'descripcion', header: 'Descripción', width: '55%' },
      { field: 'cantidad', header: 'Cantidad', width: '10%' },
      { field: 'precio_unitario', header: 'P. unitario', width: '10%' },
      { field: 'alicuota_descripcion', header: 'Alícuota', width: '9%' },
      { field: 'iva', header: 'IVA', width: '10%' },
      { field: 'total_renglon', header: 'Subtotal', width: '10%' },
    ];

    this.columns = [
      { title: 'Descripcion', dataKey: 'descripcion' },
      { title: 'Can', dataKey: 'cantidad' },
      { title: 'Precio unit.', dataKey: 'precio_unitario' },
      { title: 'Alic.', dataKey: 'alicuota_descripcion' },
      { title: 'Iva', dataKey: 'iva' },
      { title: 'Importe', dataKey: 'total_renglon' },
    ];
  }

  ngOnInit() {
    this.es = calendarioIdioma;
    this.fecha = new Date();
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.getMedicosFacturan();
  }

  accion(
    event: any,
    overlaypanel: OverlayPanel,
    elementos: FacturaElectronicaRenglon
  ) {
    if (elementos) {
      this.selecteditemRegistro = elementos;
    }

    console.log(this.selecteditemRegistro);
    overlaypanel.toggle(event);
  }

  actualizarFecha(event) {
    console.log(event);
    this.fecha = event;
    console.log(new Date(this.fecha));
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

  TipoComprobantesDisponibles() {
    this.loading = true;
    this.peticion = 'Cargando comprobante';
    try {
      this.facturacionService
        .TipoComprobantesDisponibles(this.medico_id)
        .subscribe(
          (resp) => {
            this.elementos = resp;
            this.loading = false;
            console.log(resp);
            this.loading = false;
            this.peticion = '';
          },
          (error) => {
            // error path
            this.loading = false;
            this.peticion = '';
            console.log(error.message);
            console.log(error.status);
            swal({
              toast: false,
              type: 'error',
              text: error.message,
              title: 'error.status',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );
    } catch (error) {}
  }

  TipoConceptosDisponibles() {
    this.loading = true;
    this.peticion = 'Cargando conceptos';
    try {
      this.facturacionService
        .TipoConceptosDisponibles(this.medico_id)
        .subscribe(
          (resp) => {
            this.loading = false;
            this.elementos = resp;
            this.loading = false;
            this.peticion = '';
            console.log(resp);
          },
          (error) => {
            // error path
            this.loading = false;
            this.peticion = '';
            console.log(error.message);
            console.log(error.status);
            swal({
              toast: false,
              type: 'error',
              text: error.message,
              title: 'error.status',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );
    } catch (error) {}
  }

  TipoDocumentosDisponibles() {
    this.loading = true;
    this.peticion = 'Cargando documentos';
    try {
      this.facturacionService
        .TipoDocumentosDisponibles(this.medico_id)
        .subscribe(
          (resp) => {
            this.elementos = resp;
            this.loading = false;
            this.peticion = '';
            console.log(resp);
          },
          (error) => {
            // error path
            this.loading = false;
            this.peticion = '';
            console.log(error.message);
            console.log(error.status);
            swal({
              toast: false,
              type: 'error',
              text: error.message,
              title: 'error.status',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );
    } catch (error) {}
  }

  Alicuota() {
    this.loading = true;
    this.peticion = 'Cargando alícuota';
    try {
      this.facturacionService.Alicuota().subscribe(
        (resp) => {
          this.elementosAlicuota = resp;
          this.loading = false;
          this.peticion = '';
          console.log(this.elementosAlicuota);
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  getMedicosFacturan() {
    this.loading = true;
    this.peticion = 'Cargando médicos';
    try {
      this.facturacionService.getMedicosFacturan().subscribe(
        (resp) => {
          this.elementosMedicos = resp;
          this.loading = false;
          this.peticion = '';
          console.log(this.elementosMedicos);
          this.elementoMedicos = this.elementosMedicos['0'];
          console.log(this.elementoMedicos['id']);
          this.medico_id = this.elementoMedicos['id'];

          // UNA VEZ QUE TENGO EL DATO DEL MEDICO PROCEDO A BUSCAR TODOS LOS DEMAS CAMPOS

          this.Alicuota();
          this.Concepto();
          this.Documento();
          this.PtoVta();
          this.CategoriaIva();
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  Comprobante() {
    this.loading = true;
    this.peticion = 'Cargando comprobantes';
    try {
      this.facturacionService.Comprobante().subscribe(
        (resp) => {
          this.elementosComprobante = resp;

          this.loading = false;
          this.peticion = '';
          console.log(this.elementosComprobante);
          //this.elementoComprobante = this.elementoComprobante[3];
          this.elementoComprobante = this.elementosComprobante.find(
            (x) => x.id === this.elementoMedicos['factura_comprobante_id']
          );
          console.log(this.elementoComprobante);

          if (this.elementoPtoVta) {
            this.obtenerUltimaFactura();
          }
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  Concepto() {
    this.loading = true;
    this.peticion = 'Cargando concepto';
    try {
      this.facturacionService.Concepto().subscribe(
        (resp) => {
          this.elementosConcepto = resp;
          this.loading = false;
          this.peticion = '';
          console.log(this.elementosConcepto);
          this.elementoConcepto = this.elementosConcepto[2];
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  Documento() {
    this.loading = true;
    this.peticion = 'Cargando documento';
    try {
      this.facturacionService.Documento().subscribe(
        (resp) => {
          this.elementosDocumento = resp;
          this.loading = false;
          this.peticion = '';
          console.log(this.elementosDocumento);
          //  this.elementoDocumento = this.elementosDocumento[7];
          this.elementoDocumento = this.elementosDocumento.find(
            (x) =>
              x.id == this.elementoMedicos['factura_documento_comprador_id']
          );
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  PtoVta() {
    this.loading = true;
    this.peticion = 'Cargando punto de venta';
    try {
      this.facturacionService.PtoVta().subscribe(
        (resp) => {
          let i: number = 0;
          let resultado = resp;

          resultado.forEach((element) => {
            resp[i]['punto_vta'] = this.padLeft(resp[i]['punto_vta'], '0', 4);
            i++;
          });
          this.elementosPtoVta = resp;
          // DE ACUERDO AL PUNTO DE VENTA POR DEFECTO LO PRE SELECCIONO
          // console.log( this.elementosPtoVta.find(x => x.id == this.elementoMedicos['factura_punto_vta_id']));
          this.elementoPtoVta = this.elementosPtoVta.find(
            (x) => x.id == this.elementoMedicos['factura_punto_vta_id']
          );
          this.pto_vta = this.elementoPtoVta['punto_vta'];
          //  this._pto_vta =  this.elementoPtoVta['punto_vta'];
          this.loading = false;
          this.peticion = '';
          console.log(this.elementosPtoVta);
          this.Comprobante();
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  CategoriaIva() {
    this.loading = true;
    this.peticion = 'Cargando categoria';
    try {
      this.facturacionService.CategoriaIva().subscribe(
        (resp) => {
          this.elementosCondicionIva = resp;

          this.elementoCondicionIva = this.elementosCondicionIva[4];
          this.loading = false;
          this.peticion = '';
          console.log(resp);
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error.message);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error.message,
            title: 'error.status',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      );
    } catch (error) {}
  }

  padLeft(text: string, padChar: string, size: number): string {
    return (String(padChar).repeat(size) + text).substr(size * -1, size);
  }

  guardarDatos() {
    console.log(this.elementoPtoVta);
    this._fecha = formatDate(this.fecha, 'yyyy-MM-dd', 'en');
    this._fechaDesde = formatDate(this.fechaDesde, 'yyyy-MM-dd', 'en');
    this._fechaHasta = formatDate(this.fechaHasta, 'yyyy-MM-dd', 'en');
    console.log('elemento documento ' + this.elementoDocumento);
    console.log('elemento comprobante ' + this.elementoComprobante);
    console.log('elemento concepto ' + this.elementoConcepto);
    console.log('elemento pto. venta ' + this.pto_vta);
    console.log('TOTALES ');
    console.log('importe_total ' + this.importe_total);
    console.log(
      'importe_total_neto_no_gravado ' + this.importe_total_neto_no_gravado
    );
    console.log('importe_op_exenta ' + this.importe_op_exenta);
    console.log('importe_neto ' + this.importe_neto);
    console.log('importe_iva ' + this.importe_iva);

    let facturaElectronica = new FacturaElectronica(
      '0',
      this.pto_vta,
      this.elementoComprobante['id'],
      this.elementoConcepto['id'],
      this.elementoDocumento['id'],
      this.nrodocumento,
      this.cliente,
      this.factura_numero,
      this._fecha,
      this._fechaDesde,
      this._fechaHasta,
      this.importe_total,
      this.importe_total_neto_no_gravado,
      this.importe_neto,
      this.importe_op_exenta,
      this.importe_iva,
      this.facturaAlicuotaAsociada,
      this.elementos,
      '',
      '',
      this.elementoMedicos['id'],
      this.observacion,
      this.elementoCondicionIva['categoria_iva'],
      this.es_afip,
      this.userData.id,
      this.credito,
      this.elementoComprobanteCredito['id'],
      this.pto_vta,
      this.comprobante_credito
    );
    console.log(facturaElectronica);

    if (
      Number(this.elementoDocumento['id']) === 86 ||
      Number(this.elementoDocumento['id']) === 80
    ) {
      console.log(Number(this.elementoDocumento['id']));
      console.log(this.nrodocumento.length);
      if (this.nrodocumento.length === 11) {
        console.log(Number(this.elementoDocumento['id']));
        // this.generarPDF();
        this.CrearFactura(facturaElectronica);
      } else {
        swal({
          toast: false,
          type: 'warning',
          text: 'Error en la cantidad de dígitos del  CUIT / CUIL',
          title: 'Digitos incorrectos',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }

    if (
      Number(this.elementoDocumento['id']) !== 86 &&
      Number(this.elementoDocumento['id']) !== 80
    ) {
      console.log(Number(this.elementoDocumento['id']));
      console.log(this.nrodocumento.length);
      if (this.nrodocumento.length <= 8 && this.nrodocumento.length >= 5) {
        console.log(Number(this.elementoDocumento['id']));
        // this.generarPDF();
        this.CrearFactura(facturaElectronica);
      } else {
        swal({
          toast: false,
          type: 'warning',
          text: 'Error en la cantidad de dígitos',
          title: 'Digitos incorrectos',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    }
  }

  CrearFactura(facturaElectronica) {
    this.loading = true;
    this.peticion = 'Creando factura';

    try {
      this.facturacionService.crearFactura(facturaElectronica).subscribe(
        (resp) => {
          this.loading = false;
          this.peticion = '';

          /* -------------------------------------------------------------------------- */
          /*                 SI ES RECIBO , NO ES OFICIAL Y NO TRAE CAE                 */
          /* -------------------------------------------------------------------------- */
          //if(facturaElectronica['factura_comprobante_id']=== 15){
          /*   if (this.es_afip === 'NO') {
            this.CAE = '';
            this.CAE_vto = '';
            this._factura_nro = resp;
            this.factura_nro = this.padLeft(String(resp), '0', 8);
            swal({
              toast: false,
              type: 'success',
              text: 'confeccionando PDF',
              title:
                'FACTURA Nº ' + this.factura_nro + ' GENERADA CORRETAMENTE',
              showConfirmButton: false,
              timer: 4000,
              onClose: () => {
                this.generarPDF();
              },
            });
          } else { */
          this.CAE = resp[0]['cae'];
          this.CAE_vto = resp[0]['cae_vto'];
          this.factura_nro = this.padLeft(
            String(resp[0]['factura_numero']),
            '0',
            8
          );
          swal({
            toast: false,
            type: 'success',
            text: 'confeccionando PDF',
            title: 'FACTURA Nº ' + this.factura_nro + ' GENERADA CORRETAMENTE',
            showConfirmButton: false,
            timer: 4000,
            onClose: () => {
              this.generarPDF();
            },
          });
          // }

          //   this.generarPDF();
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error);
          console.log(error.message);
          swal({
            toast: false,
            type: 'error',
            text: error,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
          });
        }
      );
    } catch (error) {}
  }

  private handleRenglones(): void {}

  obtenerMedico() {
    console.log(this.elementoMedicos);
    this.medico_id = this.elementoMedicos['id'];
    this._medico_nombre = this.elementoMedicos['nombreyapellido'];
    this.loading = true;
    this.peticion = 'Obteniendo ultima factura y punto de venta';
    console.log(this.elementoComprobante);
    try {
      this.facturacionService.getDatoMedico(this.medico_id).subscribe(
        (resp) => {
          this.loading = false;
          this.peticion = '';
          console.log(resp);

          /* -------------------------------------------------------------------------- */
          /*                      OBTENGO MUESTRO EL PUNTO DE VENTA                     */
          /* -------------------------------------------------------------------------- */

          this.elementoPtoVta = this.elementosPtoVta.find(
            (x) => x.id == resp[0]['punto_vta']
          );
          this.pto_vta = this.elementoPtoVta['punto_vta'];
          console.log(resp[0]['punto_vta']);

          /* -------------------------------------------------------------------------- */
          /*                           OBTENGO EL COMPROBANTE                           */
          /* -------------------------------------------------------------------------- */

          this.elementoComprobante = this.elementosComprobante.find(
            (x) => x.id == resp[0]['factura_comprobante_id']
          );

          /* -------------------------------------------------------------------------- */
          /*                           QUITO FACTURA A SI NO ES R.I                     */
          /* -------------------------------------------------------------------------- */
          this.getComprobanteBymedico(this.medico_id);
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error,
            title: 'Algo no esta bien....',
            showConfirmButton: true,
          });
        }
      );
    } catch (error) {}
  }

  getComprobanteBymedico(medico_id: string) {
    try {
      this.facturacionService.getComprobanteBymedico(medico_id).subscribe(
        (resp) => {
          this.loading = false;
          console.log(resp);
          //   this.factura_numero = String(resp);
          //   this.factura_numero_ceros = this.padLeft(String(resp), "0", 8);
          this.elementosComprobante = resp;
        },
        (error) => {
          // error path
          this.loading = false;
          this.peticion = '';
          console.log(error);
          console.log(error.status);
          swal({
            toast: false,
            type: 'error',
            text: error,
            title: 'Algo no esta bien....',
            showConfirmButton: true,
          });
        }
      );
    } catch (error) {}
  }

  obtenerPuntoVta() {
    console.log(this.elementoPtoVta);
    this._pto_vta = this.elementoPtoVta['id'];
    this.pto_vta = this.padLeft(this.elementoPtoVta['punto_vta'], '0', 4);
    console.log(this.pto_vta);
    //this.obtenerUltimaFactura();
  }

  obtenerPuntoVtaCredito() {
    console.log(this.elementoPtoVtaCredito);
    this._pto_vta_credito = this.elementoPtoVtaCredito['id'];
    this._pto_vta_credito = this.padLeft(
      this.elementoPtoVtaCredito['punto_vta'],
      '0',
      4
    );
    console.log(this.pto_vta_credito);
    //this.obtenerUltimaFactura();
  }

  onElementoDocumento() {
    console.log(this.elementoDocumento);
  }

  obtenerUltimaFactura() {
    this.loading = true;
    this.peticion = 'Obteniendo ultima factura y punto de venta';
    console.log(this.elementosComprobante);
    this._comprobante_nombre = this.comprobante_id =
      this.elementoComprobante['descripcion'];
    this.comprobante_id = this.elementoComprobante['id'];
    this.es_afip = this.elementoComprobante['es_afip'];
    console.log(this.es_afip);
    try {
      this.facturacionService
        .GetLastVoucher(
          this.pto_vta,
          this.elementoComprobante['id'],
          this.medico_id
        )
        .subscribe(
          (resp) => {
            this.loading = false;
            this.peticion = '';
            resp = resp + 1;
            console.log(resp);
            this.factura_numero = String(resp);
            this.factura_numero_ceros = this.padLeft(String(resp), '0', 8);
          },
          (error) => {
            // error path
            this.loading = false;
            this.peticion = '';
            console.log(error);
            console.log(error.status);
            swal({
              toast: false,
              type: 'error',
              text: error,
              title: 'Algo no esta bien....',
              showConfirmButton: true,
            });
          }
        );
    } catch (error) {}
  }

  obtenerUltimaFacturaCredito() {
    console.log(this.elementoComprobanteCredito);
    this._comprobante_nombre_credito = this.comprobante_id =
      this.elementoComprobanteCredito['descripcion'];
    this.comprobante_id_credito = this.elementoComprobanteCredito['id'];
    this.es_afip = this.elementoComprobanteCredito['es_afip'];
  }

  agregarRenglon() {
    let data: any;
    //data = this.selecteditemRegistro;
    const ref = this.dialogService.open(PopupFacturaRenglonComponent, {
      data,
      header: 'Agregar registro de factura',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe(
      (
        PopupOperacionCobroRegistroEditarComponent: FacturaElectronicaRenglon
      ) => {
        if (PopupOperacionCobroRegistroEditarComponent) {
          console.log(PopupOperacionCobroRegistroEditarComponent);

          let movimiento: FacturaElectronicaRenglon;
          movimiento = PopupOperacionCobroRegistroEditarComponent;
          console.log('renglones', movimiento);
          console.log('facturaAlicuotaAsociada', this.facturaAlicuotaAsociada);
          console.log('concepto iva', movimiento['tipo_concepto_iva']['name']);
          console.log('tota_renglon', movimiento['total_renglon']);
          console.log('tota_renglon', movimiento.total_renglon);

          if (movimiento['tipo_concepto_iva']['name'] === 'EXENTO') {
            // Total neto no gravado
            this.importe_total_neto_no_gravado =
              this.importe_total_neto_no_gravado + 0;
            // Importe neto
            this.importe_neto = this.importe_neto + 0;
            // importe operacion exentas
            this.importe_op_exenta =
              this.importe_op_exenta + movimiento.total_sin_iva;
            // Importe iva
            this.importe_iva = this.importe_iva + 0;
            // Importe total
            this.importe_total =
              this.importe_iva +
              this.importe_neto +
              this.importe_op_exenta +
              this.importe_total_neto_no_gravado;
          }
          if (movimiento['tipo_concepto_iva']['name'] === 'GRAVADO') {
            // Total neto no gravado
            this.importe_total_neto_no_gravado =
              this.importe_total_neto_no_gravado + 0;
            // Importe neto
            this.importe_neto = this.importe_neto + movimiento.total_sin_iva;
            // importe operacion exentas
            this.importe_op_exenta = this.importe_op_exenta + 0;
            // Importe iva
            this.importe_iva = this.importe_iva + movimiento.iva;
            // Importe total
            this.importe_total =
              this.importe_iva +
              this.importe_neto +
              this.importe_op_exenta +
              this.importe_total_neto_no_gravado;
          }
          if (movimiento['tipo_concepto_iva']['name'] === 'NO GRAVADO') {
            // Total neto no gravado
            this.importe_total_neto_no_gravado =
              this.importe_total_neto_no_gravado + movimiento.total_renglon;
            // Importe neto
            this.importe_neto = this.importe_neto + 0;
            // importe operacion exentas
            this.importe_op_exenta = this.importe_op_exenta + 0;
            // Importe iva
            this.importe_iva = this.importe_iva + 0;
            // Importe total
            this.importe_total =
              this.importe_iva +
              this.importe_neto +
              this.importe_op_exenta +
              this.importe_total_neto_no_gravado;
          }
          /* -------------------------------------------------------------------------- */
          /*        COMPROBANTES FACTURA B Y C CON SUS NOTAS DE CREDITO Y DEBITO        */
          /* -------------------------------------------------------------------------- */

          this.elementos.push(movimiento);
          console.log(this.elementos);
          // GUARDO LAS ALICUOTAS ASOCIADAS

          let alicuota_id = '0';
          let iva = 0;
          let precio_unitario = 0;
          let existe: Boolean = false;

          // ITERO PARA VERIFICAR SI EXISTE EL RENGLON CON LA ALICUOTA, SI EXISTE SUMO SUS VALORES
          for (
            let index = 0;
            index < this.facturaAlicuotaAsociada.length;
            index++
          ) {
            console.log(movimiento['alicuota_id']);
            console.log(this.facturaAlicuotaAsociada[index]['id']);
            if (this.facturaAlicuotaAsociada) {
              if (
                Number(movimiento['alicuota_id']) ===
                Number(this.facturaAlicuotaAsociada[index]['id'])
              ) {
                console.log('valor existente');
                existe = true;
                precio_unitario =
                  Number(this.facturaAlicuotaAsociada[index]['Importe']) +
                  Number(movimiento['precio_unitario']);
                iva =
                  Number(
                    this.facturaAlicuotaAsociada[index]['importe_gravado']
                  ) + movimiento['iva'];
                this.facturaAlicuotaAsociada[index]['importe_gravado'] =
                  Math.round(iva * 100) / 100;
                this.facturaAlicuotaAsociada[index]['Importe'] =
                  Math.round(precio_unitario * 100) / 100;
              }
            }
          }
          // SI EL RENGLON  DE ALICUOTA NO EXISTE LO CREO UNA UNICA VEZ
          if (!existe) {
            let _factura_alicuota_asociada = new FacturaAlicuotaAsociada(
              movimiento['alicuota_id'],
              Math.round(Number(movimiento['iva']) * 100) / 100,
              Math.round(Number(movimiento['precio_unitario']) * 100) / 100,
              '0'
            );
            this.facturaAlicuotaAsociada.push(_factura_alicuota_asociada);
          }

          this.sumarValores();
        }
      }
    );
  }

  // 20300712144

  agregarRenglonOS() {
    let data: any;
    //data = this.selecteditemRegistro;
    const ref = this.dialogService.open(PopupLiquidacionDetalleComponent, {
      data,
      header: 'Agregar registro de factura',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe(
      (PopupLiquidacionDetalleComponent: FacturaElectronicaRenglon[]) => {
        if (PopupLiquidacionDetalleComponent) {
          console.log(PopupLiquidacionDetalleComponent);
          let movimiento: FacturaElectronicaRenglon[];
          movimiento = PopupLiquidacionDetalleComponent;

          for (let index = 0; index < movimiento.length; index++) {
            this.elementos.push(movimiento[index]);
          }
          console.log(this.elementos);
          let alicuota_id = '0';
          let iva = 0;
          let precio_unitario = 0;
          let existe: Boolean = false;
          for (let j = 0; j < movimiento.length; j++) {
            // ITERO PARA VERIFICAR SI EXISTE EL RENGLON CON LA ALICUOTA, SI EXISTE SUMO SUS VALORES
            for (
              let index = 0;
              index < this.facturaAlicuotaAsociada.length;
              index++
            ) {
              console.log(movimiento[j]['alicuota_id']);
              console.log(movimiento[j]);
              console.log(this.facturaAlicuotaAsociada[index]['id']);
              if (this.facturaAlicuotaAsociada) {
                if (
                  Number(movimiento[j]['alicuota_id']) ===
                  Number(this.facturaAlicuotaAsociada[index]['id'])
                ) {
                  console.log('valor existente');
                  existe = true;
                  precio_unitario =
                    Number(this.facturaAlicuotaAsociada[index]['Importe']) +
                    Number(movimiento[j]['total_sin_iva']);
                  iva =
                    Number(
                      this.facturaAlicuotaAsociada[index]['importe_gravado']
                    ) + Number(movimiento[j]['iva']);
                  this.facturaAlicuotaAsociada[index]['importe_gravado'] =
                    Math.round(iva * 100) / 100;
                  this.facturaAlicuotaAsociada[index]['Importe'] =
                    Math.round(precio_unitario * 100) / 100;
                }
              }
            }
            // SI EL RENGLON  DE ALICUOTA NO EXISTE LO CREO UNA UNICA VEZ
            if (!existe) {
              //let _factura_alicuota_asociada = new FacturaAlicuotaAsociada(movimiento['alicuota_id'],Number(movimiento['iva']),Number(movimiento['precio_unitario']),'0' );
              let _factura_alicuota_asociada = new FacturaAlicuotaAsociada(
                movimiento[j]['alicuota_id'],
                Math.round(Number(movimiento[j]['iva']) * 100) / 100,
                Math.round(Number(movimiento[j]['precio_unitario']) * 100) /
                  100,
                '0'
              );
              this.facturaAlicuotaAsociada.push(_factura_alicuota_asociada);
            }
          }

          this.sumarValores();
        }
      }
    );
  }

  eliminarRegistro(result: any) {
    console.log(result);
    this.elementos = [];
    this.sumarValores();
  }

  sumarValores() {
    let i: number;

    this.total = 0;
    this.cantidad = 0;
    this.subtotal = 0;
    this.subtotal_iva = 0;
    this.subtotal_excento = 0;

    for (i = 0; i < this.elementos.length; i++) {
      this.cantidad = this.cantidad + Number(this.elementos[i]['cantidad']);
      this.subtotal =
        this.subtotal + Number(this.elementos[i]['total_sin_iva']);
      // AGREGAR VALIDACION SEGUN CODIGO IVA PARA 0%  Y PARA 21% O 10,5
      this.subtotal_iva = this.subtotal_iva + Number(this.elementos[i]['iva']);
      this.total = this.total + Number(this.elementos[i]['total_renglon']);
    }

    for (i = 0; i < this.facturaAlicuotaAsociada.length; i++) {
      console.log(this.facturaAlicuotaAsociada[i]['id']);
      if (Number(this.facturaAlicuotaAsociada[i]['id']) === 3) {
        this.subtotal_excento =
          this.subtotal_excento +
          Number(this.facturaAlicuotaAsociada[i]['importe_gravado']);
        console.log('exento ' + this.subtotal_excento);
      }
    }
  }

  buscarPaciente() {
    let data: any;
    const ref = this.dialogService.open(PopupPacienteObrasocialComponent, {
      data,
      header: 'Buscar paciente',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupPacienteObrasocialComponent: Paciente) => {
      if (PopupPacienteObrasocialComponent) {
        console.log(PopupPacienteObrasocialComponent);

        this.cliente =
          PopupPacienteObrasocialComponent.apellido +
          ' ' +
          PopupPacienteObrasocialComponent.nombre;
        this.nrodocumento = String(PopupPacienteObrasocialComponent.dni);
        this.elementoDocumento = this.elementosDocumento.find(
          (x) => x.id == 96
        );
        console.log(this.nrodocumento);
      }
    });
  }

  buscarCliente() {
    let data: any;
    const ref = this.dialogService.open(PopupProveedorFindComponent, {
      data,
      header: 'Buscar proveedor',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe((PopupProveedorFindComponent: any) => {
      if (PopupProveedorFindComponent) {
        console.log(PopupProveedorFindComponent);

        this.cliente = PopupProveedorFindComponent.proveedor_nombre;
        this.nrodocumento = String(PopupProveedorFindComponent.proveedor_cuit);
        this.elementoDocumento = this.elementosDocumento.find(
          (x) => x.id === 80
        );
        this.elementoCondicionIva = this.elementosCondicionIva.find(
          (x) => x.categoria_iva === PopupProveedorFindComponent.condicion_iva
        );
        this.elementoDocumento = this.elementosDocumento.find(
          (x) => x.descripcion === PopupProveedorFindComponent.tipo_documento
        );
      }
    });
  }

  buscarFacturaAfip() {
    console.log(this.pto_vta);
    console.log(this._pto_vta);
    console.log(this._factura_nro);
    console.log(this.factura_numero);
    console.log(this.medico_id);

    this.loading = false;
    let data: any = [];
    data._pto_vta = this._pto_vta;
    data.factura_numero = this.factura_numero;
    data.comprobante_id = this.comprobante_id;
    data.medico_id = this.medico_id;
    data._medico_nombre = this._medico_nombre;
    data._comprobante_nombre = this._comprobante_nombre;
    data.pto_vta = this.pto_vta;
    const ref = this.dialogService.open(BuscarComprobanteAfipComponent, {
      data,
      header: 'Buscar facturas de afip',
      width: '98%',
      height: '90%',
    });

    ref.onClose.subscribe((BuscarComprobanteAfipComponent: any) => {
      if (BuscarComprobanteAfipComponent) {
        console.log(BuscarComprobanteAfipComponent);
      }
    });
  }

  generarPDF() {
    const facturaElectonicaData: FacturaElectronicaPdfBody = {
      elementosPDF: this.elementos,
      elementoMedicos: this.elementoMedicos,
      elementoComprobante: this.elementoComprobante,
      CAE: this.CAE,
      CAE_vto: this.CAE_vto,
      subtotal: this.subtotal,
      subtotal_iva: this.subtotal_iva,
      subtotal_excento: this.subtotal_excento,
      total: this.total,
      factura_nro: this.factura_nro,
      pto_vta: this.pto_vta,
      fecha: formatDate(this.fecha, 'dd/MM/yyyy', 'en'),
      fechaDesde: formatDate(this.fechaDesde, 'dd/MM/yyyy', 'en'),
      fechaHasta: formatDate(this.fechaHasta, 'dd/MM/yyyy', 'en'),
      nrodocumento: this.nrodocumento,
      elementoDocumento: this.elementoDocumento,
      cliente: this.cliente,
      elementoCondicionIva: this.elementoCondicionIva,
      observacion: this.observacion,
    };

    let data = facturaElectonicaData;
    const ref = this.dialogService.open(PopupFacturaImpresionComponent, {
      data,
      header: 'GENERANDO PDF',
      width: '250px',
      height: '250px',
    });

    ref.onClose.subscribe((PopupFacturaImpresionComponent: any) => {
      if (PopupFacturaImpresionComponent) {
        console.log(PopupFacturaImpresionComponent);
      }
    });

    // GENERO EL FORMATO DE LOS COBROS
    // CODIGO  QUITADO PARA PRUEBAS

    // FIN CODIGO QUITADO

    this.limpiarDatos();
  }

  limpiarDatos() {
    this.elementosPDF = [];
    this.elementos = [];
    this.pto_vta = '0';
    this.factura_numero = '0';
    this.factura_numero_ceros = '0';
    this.nrodocumento = '0';
    this.cliente = '';
    this.CAE = '';
    this.fecha = new Date();
    this.fechaDesde = new Date();
    this.fechaHasta = new Date();
    this.cantidad = 0;
    this.subtotal = 0;
    this.subtotal_excento = 0;
    this.subtotal_iva = 0;
    this.total = 0;
    this.facturaAlicuotaAsociada = [];
    this.observacion = '';
    this.cliente = '';
    this.getMedicosFacturan();
  }

  testQr() {
    this.myAngularxQrCode = 'ItSoluionStuff.com';
    var pdf = new jsPDF();

    pdf.setFontSize(15);
    pdf.text('Crave Cookie', 43, 20);

    pdf.setFontSize(10);
    pdf.text('Scan For Menu', 43, 25);
    let h2c: any = html2canvas;
    const pageSize = pdf.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    h2c(document.querySelector('#qr_code_new')).then((canvas) => {
      let imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', pageWidth / 2 - 30, 40);
      window.open(pdf.output('bloburl'));
    });
  }
}
