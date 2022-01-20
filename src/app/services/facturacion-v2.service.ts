import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS, PARAMS } from '../config/config';
import { FacturaElectronica } from './../models/factura-electronica.model';
import { FacturaArticulo } from './../models/articulo.model';

@Injectable({
  providedIn: 'root',
})
export class FacturacionV2Service {
  private url: string = URL_SERVICIOS;

  constructor(public http: HttpClient) {}

  /******DATOS SOBRE FACTURACION******/

  GetVoucherInfo(
    punto_vta: string,
    comprobante_numero: string,
    comprobante_id: number,
    medico_id: string
  ) {
    return this.http.get<number>(
      this.url +
        'v2/afip/factura/info?punto_vta=' +
        punto_vta +
        '&comprobante_numero=' +
        comprobante_numero +
        '&comprobante_id=' +
        comprobante_id +
        '&medico_id=' +
        medico_id
    );
  }

  GetLastVoucher(
    punto_vta: string,
    comprobante_tipo: string,
    medico_id: string
  ) {
    return this.http.get<number>(
      this.url +
        'v2/afip/data/getlastvoucher?punto_vta=' +
        punto_vta +
        '&comprobante_tipo=' +
        comprobante_tipo +
        '&medico_id=' +
        medico_id
    );
  }

  getIformacionComprobante(
    punto_vta: string,
    comprobante_tipo: string,
    medico_id: string,
    comprobante_nro: string
  ) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/data/getiformacioncomprobante?punto_vta=' +
        punto_vta +
        '&comprobante_nro=' +
        comprobante_tipo +
        '&medico_id=' +
        medico_id +
        '&comprobante_tipo=' +
        comprobante_tipo
    );
  }

  TipoComprobantesDisponibles(medico_id: string) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/data/tipocomprobantesdisponibles?medico_id=' +
        medico_id
    );
  }

  TipoConceptosDisponibles(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/tipoconceptosdisponibles?medico_id=' + medico_id
    );
  }

  TipoDocumentosDisponibles(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/tipodocumentosdisponibles?medico_id=' + medico_id
    );
  }

  TipoAlicuotasDisponibles(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/tipoalicuotasdisponibles?medico_id=' + medico_id
    );
  }

  GetOptionsTypes(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/getoptionstypes?medico_id=' + medico_id
    );
  }

  ObetenerEstadoDelServidor(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/obetenerestadodelservidor?medico_id=' + medico_id
    );
  }

  getDatoMedico(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/medico/dato?medico_id=' + medico_id
    );
  }

  getComprobanteBymedico(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/data/comprobante/by/medico?medico_id=' + medico_id
    );
  }

  /******REALIZACION DE FACTURACION******/

  testAfipGetLastVoucher(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/lastvoucher?medico_id=' + medico_id
    );
  }

  CrearFacturaA(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/factura/a?medico_id=' + medico_id
    );
  }

  CrearFacturaB(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/factura/b?medico_id=' + medico_id
    );
  }

  CrearFacturaC(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/factura/c?medico_id=' + medico_id
    );
  }

  CrearNotaCreditoA(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/notacredito/a?medico_id=' + medico_id
    );
  }

  CrearNotaCreditoB(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/notacredito/b?medico_id=' + medico_id
    );
  }

  CrearNotaCreditoC(medico_id: string) {
    return this.http.get<any[]>(
      this.url + 'v2/afip/notacredito/c?medico_id=' + medico_id
    );
  }

  /******************************************************************* */
  // ELEMENTOS DE LA FACTURA
  /******************************************************************* */

  Alicuota() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/alicuota');
  }

  AlicuotaAsociada() {
    return this.http.get<any[]>(
      this.url + 'v2/afip/elementos/alicuota/asociada'
    );
  }

  Comprobante() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/comprobante');
  }

  Concepto() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/concepto');
  }

  Documento() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/documento');
  }

  PtoVta() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/pto/vta');
  }

  CategoriaIva() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/categoria/iva');
  }

  GetFacturaByid() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/factura');
  }

  crearFactura(facturaElectronica: FacturaElectronica) {
    return this.http.post<any>(
      this.url + 'v2/afip/elementos/factura/nueva',
      facturaElectronica
    );
  }

  GetFacturaByArticuloTipo() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/articulo/tipo');
  }

  FacturaArticulo() {
    return this.http.get<any[]>(this.url + 'v2/afip/elementos/articulo');
  }

  CrearFacturaArticulo(articulo: FacturaArticulo) {
    return this.http.post<any[]>(
      this.url + 'v2/afip/elementos/articulo',
      articulo
    );
  }

  ActualizarFacturaArticulo(articulo: FacturaArticulo) {
    return this.http.put<any[]>(
      this.url + 'v2/afip/elementos/articulo/' + articulo.id,
      articulo
    );
  }

  crearFacturaNotaCredito(facturaElectronica: FacturaElectronica) {
    return this.http.post<any>(
      this.url + 'v2/afip/elementos/factura/nota/credito',
      facturaElectronica
    );
  }

  getMedicosFacturan() {
    return this.http.get<any[]>(this.url + 'v2/afip/data/medicos/facturan');
  }

  GetFacturaBetweenDates(fecha_desde: string, fecha_hasta: string) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/elementos/factura/by/fecha?fecha_desde=' +
        fecha_desde +
        '&fecha_hasta=' +
        fecha_hasta
    );
  }

  GetFacturaByNameOrDocumento(factura_documento: string) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/elementos/factura/by/cliente?factura_cliente=' +
        factura_documento +
        '&factura_documento=' +
        factura_documento
    );
  }

  GetFacturaById(factura_numero: string) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/elementos/factura/by/id?factura_numero=' +
        factura_numero
    );
  }

  getLibroIva(fecha_desde: string, fecha_hasta: string, medico_id: string) {
    return this.http.get<any[]>(
      this.url +
        'v2/afip/elementos/factura/libro/iva?fecha_desde=' +
        fecha_desde +
        '&fecha_hasta=' +
        fecha_hasta +
        '&medico_id=' +
        medico_id
    );
  }

  postFacturaMedico(val: any[], user_id: string) {
    console.log(val);
    return this.http.post<any>(this.url + 'medico/factura/add/' + user_id, val);
  }

  delFacturaMedico(factura_comprobante_medico_id: string) {
    return this.http.delete<string>(
      this.url + 'medico/factura/remove/' + factura_comprobante_medico_id
    );
  }
}
