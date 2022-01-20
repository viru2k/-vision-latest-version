import { FacturacionV2Service } from './../../../../../services/facturacion-v2.service';
declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');
import { calendarioIdioma, logo_clinica } from './../../../../../config/config';
import { FacturaElectronicaPdfBody } from './../../../../../models/factura-electronica.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CurrencyPipe, formatDate } from '@angular/common';
import * as html2canvas from 'html2canvas';

import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng-lts/dynamicdialog';

@Component({
  selector: 'app-popup-factura-impresion',
  templateUrl: './popup-factura-impresion.component.html',
  styleUrls: ['./popup-factura-impresion.component.scss'],
})
export class PopupFacturaImpresionComponent implements OnInit, AfterViewInit {
  facturaElectonicaData: FacturaElectronicaPdfBody;
  elementosPDF: any;
  columns: any;
  QRCode: string = 'CODIGO POR DEFECTO';
  constructor(
    public dialogService: DialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cp: CurrencyPipe
  ) {
    this.columns = [
      { title: 'Descripcion', dataKey: 'descripcion' },
      { title: 'Can', dataKey: 'cantidad' },
      { title: 'Precio unit.', dataKey: 'precio_unitario' },
      { title: 'Alic.', dataKey: 'alicuota_descripcion' },
      { title: 'Iva', dataKey: 'iva' },
      { title: 'Importe', dataKey: 'total_renglon' },
    ];
  }

  ngOnInit(): void {
    console.log(this.config.data);
  }
  ngAfterViewInit(): void {
    this.generarPDF();
  }
  generarPDF() {
    // GENERO EL FORMATO DE LOS COBROS
    this.facturaElectonicaData = <FacturaElectronicaPdfBody>this.config.data;
    this.elementosPDF = this.facturaElectonicaData.elementosPDF;
    this.QRCode =
      this.facturaElectonicaData.CAE + this.facturaElectonicaData.CAE_vto;
    let i = 0;
    for (i = 0; i < this.elementosPDF.length; i++) {
      this.elementosPDF[i]['alicuota'] = this.cp.transform(
        this.elementosPDF[i]['alicuota'],
        '',
        'symbol-narrow',
        '1.2-2'
      );
      this.elementosPDF[i]['iva'] = this.cp.transform(
        this.elementosPDF[i]['iva'],
        '',
        'symbol-narrow',
        '1.2-2'
      );
      this.elementosPDF[i]['precio_unitario'] = this.cp.transform(
        this.elementosPDF[i]['precio_unitario'],
        '',
        'symbol-narrow',
        '1.2-2'
      );
      this.elementosPDF[i]['total_renglon'] = this.cp.transform(
        this.elementosPDF[i]['total_renglon'],
        '',
        'symbol-narrow',
        '1.2-2'
      );
      this.elementosPDF[i]['total_sin_iva'] = this.cp.transform(
        this.elementosPDF[i]['total_sin_iva'],
        '',
        'symbol-narrow',
        '1.2-2'
      );
    }

    const inicio_actividades = formatDate(
      this.facturaElectonicaData.elementoMedicos['fecha_matricula'],
      'dd/MM/yyyy',
      'en'
    );
    var doc = new jsPDF();

    /** valores de la pagina**/
    const pageSize = doc.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    //borde contenedor
    doc.setLineWidth(0.3);
    doc.setDrawColor(207, 216, 220);
    doc.line(10, 10, pageWidth - 10, 10); //linea superior horizontal
    doc.line(10, 10, 10, 50); // linea vertical izquierda
    doc.line(pageWidth - 10, 10, pageWidth - 10, 50); // linea vertical derecha
    doc.line(10, 50, pageWidth - 10, 50); //linea inferior horizontal

    //borde factura letra
    doc.line(pageWidth / 2 - 6, 10, pageWidth / 2 - 6, 23); // linea vertical izquierda
    doc.line(pageWidth / 2 + 6, 10, pageWidth / 2 + 6, 23); // linea vertical derecha
    doc.line(pageWidth / 2 - 6, 23, pageWidth / 2 + 6, 23); //linea inferior horizontal

    //borde fecha emision desde hasta

    doc.line(10, 55, pageWidth - 10, 55); //linea superior horizontal
    doc.line(10, 55, 10, 63); // linea vertical izquierda
    doc.line(pageWidth - 10, 55, pageWidth - 10, 63); // linea vertical derecha
    doc.line(10, 63, pageWidth - 10, 63); //linea inferior horizontal

    // borde datos del clinete

    doc.line(10, 65, pageWidth - 10, 65); //linea superior horizontal
    doc.line(10, 65, 10, 90); // linea vertical izquierda
    doc.line(pageWidth - 10, 65, pageWidth - 10, 90); // linea vertical derecha
    doc.line(10, 90, pageWidth - 10, 90); //linea inferior horizontal

    doc.line(10, pageHeight - 25, 10, pageHeight - 15); // linea vertical izquierda
    doc.line(pageWidth - 10, pageHeight - 25, pageWidth - 10, pageHeight - 15); // linea vertical derecha
    doc.line(10, pageHeight - 25, pageWidth - 10, pageHeight - 25); //linea superior horizontal
    doc.line(10, pageHeight - 15, pageWidth - 10, pageHeight - 15); //linea inferior horizontal

    // linea divisoria
    doc.line(pageWidth / 2, 23, pageWidth / 2, 50);
    doc.setFontSize(19);
    doc.setFontStyle('bold');
    doc.text(
      this.facturaElectonicaData.elementoComprobante['letra'],
      pageWidth / 2 - 2.5,
      17
    );
    doc.setFontStyle('normal');
    doc.setFontSize(6);
    doc.text(
      'COD. ' +
        this.facturaElectonicaData.elementoComprobante['comprobante_codigo'],
      pageWidth / 2 - 4.5,
      21
    );
    doc.addImage(logo_clinica, 'PNG', 15, 12, 60.06, 12.87, undefined, 'FAST');
    doc.setFontSize(9);

    doc.text(
      this.facturaElectonicaData.elementoMedicos['nombreyapellido'],
      15,
      35
    );
    doc.setFontStyle('normal');
    doc.setFontSize(9);
    doc.text(this.facturaElectonicaData.elementoMedicos['domicilio'], 15, 40);
    doc.text(
      this.facturaElectonicaData.elementoMedicos['categoria_iva'],
      15,
      45
    );
    // izquierda
    doc.setFontSize(9);

    /* -------------------------------------------------------------------------- */
    /*                               DATOS DEL EMISO                              */
    /* -------------------------------------------------------------------------- */
    doc.setFontStyle('bold');
    doc.setFontSize(11);
    doc.text(
      this.facturaElectonicaData.elementoComprobante['descripcion'],
      pageWidth / 2 + 20,
      20
    );
    doc.text(
      'Comprobante: ' +
        this.facturaElectonicaData.pto_vta +
        ' - ' +
        this.facturaElectonicaData.factura_nro,
      pageWidth / 2 + 20,
      25
    );
    doc.setFontStyle('normal');
    doc.setFontSize(9);
    doc.text(
      'Fecha Emisión: ' + this.facturaElectonicaData.fecha,
      pageWidth / 2 + 20,
      30
    );
    doc.text(
      'C.U.I.T.: ' + this.facturaElectonicaData.elementoMedicos['cuit'],
      pageWidth / 2 + 20,
      35
    );
    doc.text(
      'Ingresos brutos: ' +
        this.facturaElectonicaData.elementoMedicos['ing_brutos'],
      pageWidth / 2 + 20,
      40
    );
    doc.text(
      'Inicio de actividades: ' + inicio_actividades,
      pageWidth / 2 + 20,
      45
    );
    doc.setLineWidth(0.4);

    /* -------------------------------------------------------------------------- */
    /*                              PERIODO DE FECHAS                             */
    /* -------------------------------------------------------------------------- */

    doc.text(
      'Período Facturado   Desde: ' + this.facturaElectonicaData.fechaDesde,
      15,
      60
    );
    doc.text(
      'Hasta: ' + this.facturaElectonicaData.fechaHasta,
      pageWidth / 2,
      60
    );

    /* -------------------------------------------------------------------------- */
    /*                              DATOS DEL CLIENTE                             */
    /* -------------------------------------------------------------------------- */

    doc.text(
      this.facturaElectonicaData.elementoDocumento['descripcion'] +
        ' : ' +
        this.facturaElectonicaData.nrodocumento,
      15,
      73
    );
    doc.text('Cliente: ' + this.facturaElectonicaData.cliente, 60, 73);
    doc.text(
      'Condición frente al IVA: ' +
        this.facturaElectonicaData.elementoCondicionIva['categoria_iva'],
      15,
      78
    );
    doc.text('Observación: ' + this.facturaElectonicaData.observacion, 15, 83);

    /* -------------------------------------------------------------------------- */
    /*                             DATOS DE LA FACTURA QR                       */
    /* -------------------------------------------------------------------------- */

    let h2c: any = html2canvas;
    h2c(document.querySelector('#qr_code_new')).then((canvas) => {
      let imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', pageWidth - 30, 73);
      window.open(doc.output('bloburl'));
    });
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text(
      'Subtotal: ' +
        this.cp.transform(
          this.facturaElectonicaData.subtotal,
          '',
          'symbol-narrow',
          '1.2-2'
        ),
      15,
      pageHeight - 18
    );
    if (
      this.facturaElectonicaData.elementoComprobante['id'] === 6 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 11
    ) {
    } else {
      doc.text(
        'Imp. IVA: ' +
          this.cp.transform(
            this.facturaElectonicaData.subtotal_iva,
            '',
            'symbol-narrow',
            '1.2-2'
          ),
        75,
        pageHeight - 18
      );
    }

    doc.text(
      'Total: ' +
        this.cp.transform(
          this.facturaElectonicaData.total,
          '',
          'symbol-narrow',
          '1.2-2'
        ),
      pageWidth - 50,
      pageHeight - 18
    );
    // PIE DE LA FACTURA
    doc.text('CAE: ' + this.facturaElectonicaData.CAE, 15, pageHeight - 10);
    if (this.facturaElectonicaData.CAE === '') {
    } else {
      doc.text(
        'Fecha de vencimiento de CAE: ' + this.facturaElectonicaData.CAE_vto,
        pageWidth / 2 + 20,
        pageHeight - 10
      );
    }

    doc.setFontStyle('normal');
    console.log(this.elementosPDF);

    /* -------------------------------------------------------------------------- */
    /*              SI ES FACTURA B O SIMILAR OMITO EL VALOR DEL IVA              */
    /* -------------------------------------------------------------------------- */

    if (
      this.facturaElectonicaData.elementoComprobante['id'] === 6 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 7 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 8 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 11 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 12 ||
      this.facturaElectonicaData.elementoComprobante['id'] === 13
    ) {
      for (i = 0; i < this.elementosPDF.length; i++) {
        this.elementosPDF[i]['alicuota'] = '';
        this.elementosPDF[i]['precio_unitario'] =
          this.elementosPDF[i]['total_renglon'];
        this.elementosPDF[i]['total_sin_iva'] =
          this.elementosPDF[i]['total_renglon'];
        this.elementosPDF[i]['iva'] = '0';
        this.elementosPDF[i]['alicuota_descripcion'] = '';
      }
    }

    doc.autoTable(this.columns, this.elementosPDF, {
      margin: { vertical: 95, right: 0, horizontal: -10 },
      bodyStyles: { valign: 'top' },
      styles: {
        fontSize: 10,
        cellWidth: 'wrap',
        rowPageBreak: 'auto',
        halign: 'justify',
        overflow: 'linebreak',
      },
      columnStyles: {
        descripcion: { columnWidth: 88 },
        cantidad: { columnWidth: 10 },
        precio_unitario: { columnWidth: 25 },
        alicuota_descripcion: { columnWidth: 12 },
        iva: { columnWidth: 25 },
        total_renglon: { columnWidth: 25 },
      },
    });
    window.open(doc.output('bloburl'));
  }
}
