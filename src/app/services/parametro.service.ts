import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS, PARAMS } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class ParametroService {
  private url: string = URL_SERVICIOS;
  constructor(public http: HttpClient) {}

  // Metodo Pago
  getParametroMetodoPago(id: number) {
    return this.http.get<any>(this.url + 'v2/metodopago/' + id);
  }

  getParametroMetodoPagos() {
    return this.http.get<any[]>(this.url + 'v2/metodospago');
  }

  putParametroMetodoPago(parametro: any, id: string) {
    return this.http.put<any>(this.url + 'v2/metodopago/' + id, parametro);
  }

  setParametroMetodoPago(parametro: any) {
    return this.http.post<any>(this.url + 'v2/metodopago', parametro);
  }

  // Receta

  getParametroReceta(id: number) {
    return this.http.get<any>(this.url + 'v2/receta/' + id);
  }

  getParametroRecetas() {
    return this.http.get<any[]>(this.url + 'v2/recetas');
  }

  putParametroReceta(parametro: any, id: string) {
    return this.http.put<any>(this.url + 'v2/receta/' + id, parametro);
  }

  setParametroReceta(parametro: any) {
    console.log('RECETAAAAA');
    return this.http.post<any>(this.url + 'v2/receta', parametro);
  }

  // Estudios
  getParametroEstudio(id: number) {
    return this.http.get<any>(this.url + 'v2/estudios/' + id);
  }

  getParametroEstudios() {
    return this.http.get<any[]>(this.url + 'v2/estudios');
  }

  putParametroEstudio(parametro: any, id: string) {
    return this.http.put<any>(this.url + 'v2/estudios/' + id, parametro);
  }

  setParametroEstudio(parametro: any) {
    return this.http.post<any>(this.url + 'v2/estudios', parametro);
  }

  // Lentes y proveedor
  getLenteProveedor(id: number) {
    return this.http.get<any>(this.url + 'lente/proveedor/' + id);
  }

  getLentesProveedor() {
    return this.http.get<any[]>(this.url + 'lente/proveedores');
  }

  putLenteProveedor(parametro: any, id: string) {
    return this.http.put<any>(this.url + 'lente/proveedor/' + id, parametro);
  }

  setLenteProveedor(parametro: any) {
    return this.http.post<any>(this.url + 'lente/proveedor', parametro);
  }
}
