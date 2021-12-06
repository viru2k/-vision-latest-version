import { PositivePipe } from './shared/directive/simbol-directive';
import { SignDirective } from './shared/directive/sign-directive';
import { RecetaComponent } from './pages/mantenimiento/parametro/receta/receta.component';
// Route
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { PopupAccesoAutorizacionOsEditarComponent } from './shared/popups/popup-acceso-autorizacion-os-editar/popup-acceso-autorizacion-os-editar.component';
import { PopupAccesoAutorizacionOsComponent } from './shared/popups/popup-acceso-autorizacion-os/popup-acceso-autorizacion-os.component';
import { PopupProveedorFindComponent } from './shared/popups/popup-proveedor-find/popup-proveedor-find.component';
import { PopupDocumentacionDetalleComponent } from './shared/popups/popup-documentacion-detalle/popup-documentacion-detalle.component';
import { PopupOperacionCobroEditarDistribucionComponent } from './shared/popups/popup-operacion-cobro-editar-distribucion/popup-operacion-cobro-editar-distribucion.component';
import { PopupArticuloComponent } from './shared/popups/popup-articulo/popup-articulo.component';
import { PopupOperacionCobroDistribucionDetalleComponent } from './shared/popups/popup-operacion-cobro-distribucion-detalle/popup-operacion-cobro-distribucion-detalle.component';
import { PopupPacienteEsperaComponent } from './shared/popups/popup-paciente-espera/popup-paciente-espera.component';
import { PopupOperacionCobroDistribucionComponent } from './shared/popups/popup-operacion-cobro-distribucion/popup-operacion-cobro-distribucion.component';
import { PopupDetalleOperacionCobroDistribucionComponent } from './shared/popups/popup-detalle-operacion-cobro-distribucion/popup-detalle-operacion-cobro-distribucion.component';
import { PopupOperacionCobroRegistroBuscarTodosComponent } from './shared/popups/popup-operacion-cobro-registro-buscar-todos/popup-operacion-cobro-registro-buscar-todos.component';
import { PopupOperacionCobroDetallePacienteComponent } from './shared/popups/popup-operacion-cobro-detalle-paciente/popup-operacion-cobro-detalle-paciente.component';
import { PopupOperacionCobroDetalleComponent } from './shared/popups/popup-operacion-cobro-detalle/popup-operacion-cobro-detalle.component';
import { PopupListadoCirugiaQuirofanoObservacionEditarComponent } from './shared/popups/popup-listado-cirugia-quirofano-observacion-editar/popup-listado-cirugia-quirofano-observacion-editar.component';
import { PopupFichaQuirurgicaOperacionCobroComponent } from './shared/popups/popup-ficha-quirurgica-operacion-cobro/popup-ficha-quirurgica-operacion-cobro.component';
import { PopupCobroDistribucionEditarComponent } from './shared/popups/popup-cobro-distribucion-editar/popup-cobro-distribucion-editar.component';
import { PopupListadoCirugiaQuirofanoEditarComponent } from './shared/popups/popup-listado-cirugia-quirofano-editar/popup-listado-cirugia-quirofano-editar.component';
import { PopupDerivarAsesoramientoListadoComponent } from './shared/popups/popup-derivar-asesoramiento-listado/popup-derivar-asesoramiento-listado.component';
import { PopupPresentacionEditarComponent } from './shared/popups/popup-presentacion-editar/popup-presentacion-editar.component';
import { PopupOperacionCobroPresentacionEditarRegistroComponent } from './shared/popups/popup-operacion-cobro-presentacion-editar-registro/popup-operacion-cobro-presentacion-editar-registro.component';
import { PopupOperacionCobroPresentacionComponent } from './shared/popups/popup-operacion-cobro-presentacion/popup-operacion-cobro-presentacion.component';
import { PopupEstudiosImagenComponent } from './shared/popups/popup-estudios-imagen/popup-estudios-imagen.component';
import { PopupOperacionCobroRegistroBuscarComponent } from './shared/popups/popup-operacion-cobro-registro-buscar/popup-operacion-cobro-registro-buscar.component';
import { PopupPacienteConsultaComponent } from './shared/popups/popup-paciente-consulta/popup-paciente-consulta.component';
import { PopupOperacionCobroEditarComponent } from './shared/popups/popup-operacion-cobro-editar/popup-operacion-cobro-editar.component';
import { PopupAgendaObservacionComponent } from './shared/popups/popup-agenda-observacion/popup-agenda-observacion.component';
import { PopupDerivarAsesoramientoComponent } from './shared/popups/popup-derivar-asesoramiento/popup-derivar-asesoramiento.component';
import { PopupHistoriaClinicaRegistroNuevoComponent } from './shared/popups/popup-historia-clinica-registro-nuevo/popup-historia-clinica-registro-nuevo.component';
import { PopupHistoriaClinicaRegistroComponent } from './shared/popups/popup-historia-clinica-registro/popup-historia-clinica-registro.component';
import { PopupLiquidacionDetalleComponent } from './shared/popups/popup-liquidacion-detalle/popup-liquidacion-detalle.component';
import { PopupHistoriaClinicaListaConsultaComponent } from './shared/popups/popup-historia-clinica-lista-consulta/popup-historia-clinica-lista-consulta.component';
import { PopupLenteTipoComponent } from './shared/popups/popup-lente-tipo/popup-lente-tipo.component';
import { PopupPacienteEstudioComponent } from './shared/popups/popup-paciente-estudio/popup-paciente-estudio.component';
import { PopupFichaQuirurgicaAnesteciaComponent } from './shared/popups/popup-ficha-quirurgica-anestecia/popup-ficha-quirurgica-anestecia.component';
import { PopupFichaQuirurgicaEstadoComponent } from './shared/popups/popup-ficha-quirurgica-estado/popup-ficha-quirurgica-estado.component';
import { PopupFichaQuirurgicaMedicoGrupoComponent } from './shared/popups/popup-ficha-quirurgica-medico-grupo/popup-ficha-quirurgica-medico-grupo.component';
import { PopupFichaQuirurgicaLenteComponent } from './shared/popups/popup-ficha-quirurgica-lente/popup-ficha-quirurgica-lente.component';
import { PopupLentesComponent } from './shared/popups/popup-lentes/popup-lentes.component';
import { PopupOperacionCobroRegistroEditarComponent } from './shared/popups/popup-operacion-cobro-registro-editar/popup-operacion-cobro-registro-editar.component';
import { PopupTurnoEditarComponent } from './shared/popups/popup-turno-editar/popup-turno-editar.component';
import { PopupObraSocialComponent } from './shared/popups/popup-obra-social/popup-obra-social.component';
import { PopupPracticaPorcentajeComponent } from './shared/popups/popup-practica-porcentaje/popup-practica-porcentaje.component';
import { PopupPacienteObrasocialComponent } from './shared/popups/popup-paciente-obrasocial/popup-paciente-obrasocial.component';
import { PopupPacienteComponent } from './shared/popups/popup-paciente/popup-paciente.component';
import { PopupUsuarioComponent } from './shared/popups/popup-usuario/popup-usuario.component';
import { PopUpFormaPagoComponent } from './shared/popups/popup-forma-pago/popup-forma-pago.component';
import { PopupConvenioComponent } from './shared/popups/popup-convenio/popup-convenio.component';
import { PopupAgendaComponent } from './shared/popups/popup-agenda/popup-agenda.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { PopupMedicoComponent } from './shared/popups/popup-medico/popup-medico.component';
/* 
In primeng-lts/components/table/table.d.ts
Replace
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
With
import { OnDestroy } from '@angular/core';

 */

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, Injector } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData, CurrencyPipe, DecimalPipe } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
} from '@angular/common/http';

/** LIBRERIAS 3RO**/

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { config } from './config/config';
import { GalleriaModule } from 'primeng-lts/galleria';

import { FileUploadModule } from 'primeng-lts/fileupload';
import { CardModule } from 'primeng-lts/card';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { OrderListModule } from 'primeng-lts/orderlist';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { TableModule } from 'primeng-lts/table';
import { DropdownModule } from 'primeng-lts/dropdown';
import { OverlayPanelModule } from 'primeng-lts/overlaypanel';
import { DialogModule } from 'primeng-lts/dialog';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { CalendarModule } from 'primeng-lts/calendar';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { MenubarModule } from 'primeng-lts/menubar';
import { MenuModule } from 'primeng-lts/menu';
import { SpinnerModule } from 'primeng-lts/spinner';
import { ToastModule } from 'primeng-lts/toast';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { ListboxModule } from 'primeng-lts/listbox';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { ScrollPanelModule } from 'primeng-lts/scrollpanel';
import { PanelModule } from 'primeng-lts/panel';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import localeEsAR from '@angular/common/locales/es-AR';

registerLocaleData(localeEsAR, 'es-Ar');

/** DIRECTIVAS **/

/****barcode para imprimir */

/** COMPONENTES **/
import { AppComponent } from './app.component';
import { UsuarioModuloOldComponent } from './pages/mantenimiento/usuario-modulo/usuario-modulo.component';
import { UsuarioPasswordComponent } from './pages/mantenimiento/usuario-password/usuario-password.component';
import { LoginComponent } from './pages/login/login.component';
import { QuirofanoComponent } from './pages/quirofano/quirofano.component';
import { MedicoComponent } from './pages/medico/medico.component';
import { PopupMedicoEditComponent } from './pages/medico/popup-medico-edit/popup-medico-edit.component';

import { PacienteComponent } from './pages/paciente/paciente.component';

/** compartido**/
import { LoadingComponent } from './shared/components/loading/loading.component';

/** MANTENIMIENTO **/
import { PacienteService } from './services/paciente.service';
import { ObraSocialComponent } from './pages/mantenimiento/convenio/obra-social/obra-social.component';
import { PmoComponent } from './pages/mantenimiento/convenio/obra-social/pmo/pmo.component';
import { ConvenioComponent } from './pages/mantenimiento/convenio/convenio/convenio.component';
/** MEDICO **/

/** FACTURACION **/
import { LiquidacionGeneradaComponent } from './pages/facturacion/liquidacion-generada/liquidacion-generada.component';
import { LiquidacionComponent } from './pages/facturacion/liquidacion/liquidacion.component';

/** PRACTICA - CIRUGIA **/
import { CirugiaComponent } from './pages/mantenimiento/cirugia/cirugia.component';
import { CirugiaGrupoComponent } from './pages/mantenimiento/cirugia/cirugia-grupo/cirugia-grupo.component';
import { CirugiaGrupoMedicoComponent } from './pages/mantenimiento/cirugia/cirugia-grupo-medico/cirugia-grupo-medico.component';
import { PopupObrasocialComponent } from './pages/mantenimiento/popup/popup-obrasocial/popup-obrasocial.component';
import { PopupPmoComponent } from './pages/mantenimiento/popup/popup-pmo/popup-pmo.component';
import { PopupEntidadFacturaComponent } from './pages/mantenimiento/popup/popup-entidad-factura/popup-entidad-factura.component';
import { PopupMedicoGrupoMedicoComponent } from './pages/mantenimiento/popup/popup-medico-grupo-medico/popup-medico-grupo-medico.component';
import { PopupMedicoGrupoComponent } from './pages/mantenimiento/popup/popup-medico-grupo/popup-medico-grupo.component';
import { LiquidarComponent } from './pages/facturacion/liquidacion/liquidar/liquidar.component';
import { OperacionCobroComponent } from './pages/facturacion/operacion-cobro/operacion-cobro.component';
import { AgendaComponent } from './pages/recepcion/agenda/agenda.component';
import { EditConvenioComponent } from './pages/mantenimiento/convenio/edit-convenio/edit-convenio.component';
import { CreacionComponent } from './pages/mantenimiento/popup/popup-paciente/creacion/creacion.component';

import { TurnoComponent } from './pages/recepcion/agenda/turno/turno.component';
import { PopupCombinadaComponent } from './pages/facturacion/operacion-cobro/popup-combinada/popup-combinada.component';
import { PopupCombinadaItemComponent } from './pages/facturacion/operacion-cobro/popup-combinada/popup-combinada-item/popup-combinada-item.component';
import { EditObraSocialComponent } from './pages/mantenimiento/convenio/obra-social/edit-obra-social/edit-obra-social.component';
import { DistribucionPracticaComponent } from './pages/mantenimiento/distribucion-practica/distribucion-practica.component';
import { PopupCombinadaLecturaComponent } from './pages/facturacion/operacion-cobro/popup-combinada-lectura/popup-combinada-lectura.component';

import { AgendaMedicoComponent } from './pages/mantenimiento/agenda/agenda-medico/agenda-medico.component';

import { PopupTurnoUsuarioObraSocialComponent } from './pages/recepcion/agenda/turno/popup-turno-usuario-obra-social/popup-turno-usuario-obra-social.component';
import { PopupPacienteNuevoComponent } from './pages/paciente/popup-paciente/popup-paciente.component';
import { DateFormatPipe } from './shared/pipes/date-format.pipe';
import { PopupObraSocialMedicoComponent } from './pages/medico/popup-obra-social-medico/popup-obra-social-medico.component';
import { from } from 'rxjs';
import { AgendaBloqueoComponent } from './pages/mantenimiento/agenda/agenda-bloqueo/agenda-bloqueo.component';
import { OperacionCobroAuditarComponent } from './pages/facturacion/liquidacion/auditar/operacion-cobro-auditar/operacion-cobro-auditar.component';

import { OperacionCobroDetalleComponent } from './pages/facturacion/liquidacion/auditar/operacion-cobro-detalle/operacion-cobro-detalle.component';
import { PopupHistoriaClinicaResumenComponent } from './shared/popups/medico/popup-historia-clinica-resumen/popup-historia-clinica-resumen.component';
import { OperacionCobroAfectarComponent } from './pages/facturacion/liquidacion/auditar/operacion-cobro-afectar/operacion-cobro-afectar.component';
import { StockLenteComponent } from './pages/stock/lentes/stock-lente/stock-lente.component';
import { AltaLenteComponent } from './pages/stock/lentes/alta-lente/alta-lente.component';
import { PopupDetalleLenteComponent } from './pages/stock/lentes/popup/popup-detalle-lente/popup-detalle-lente.component';
import { LenteComponent } from './pages/mantenimiento/stock/lente/lente.component';
import { InsumoComponent } from './pages/mantenimiento/stock/insumo/insumo.component';
import { HistoriaClinicaComponent } from './pages/medico/historia-clinica/historia-clinica.component';
import { AgendaAtencionMedicoComponent } from './pages/medico/agenda/agenda-atencion-medico/agenda-atencion-medico.component';
import { EmptyComponent } from './pages/info/empty/empty.component';
import { NotFoundComponent } from './pages/info/not-found/not-found.component';
import { ListadoCirugiaComponent } from './pages/asesoramiento/ficha-quirurgica/listado-cirugia/listado-cirugia.component';

import { UsuarioModuloComponent } from './pages/mantenimiento/usuario/usuario-modulo/usuario-modulo.component';
import { LiquidacionDetalleComponent } from './pages/facturacion/liquidacion/liquidar/liquidacion-detalle/liquidacion-detalle.component';
import { ConfeccionFacturaComponent } from './pages/facturacion/liquidacion/liquidar/confeccion-factura/confeccion-factura.component';

import { HistoriaClinicaVisualizarComponent } from './pages/medico/historia-clinica/historia-clinica-visualizar/historia-clinica-visualizar.component';
import { OperacionCobroDetalleMedicoComponent } from './pages/medico/facturacion/operacion-cobro-detalle-medico/operacion-cobro-detalle-medico.component';

import { AgendaConsultaComponent } from './pages/gerencia/agenda/agenda-consulta/agenda-consulta.component';
import { OperacionCobroConsultaGerenciaComponent } from './pages/gerencia/operacioncobro/operacion-cobro-consulta-gerencia/operacion-cobro-consulta-gerencia.component';
import { NumberToWordsPipe } from './shared/pipes/number-to-words.pipe';
import { EstudioCargaComponent } from './pages/estudios/estudio-carga/estudio-carga.component';

import { environment } from '../environments/environment';
import { PushNotificationService } from './services/push-notification.service';

import { ListadoCirugiaQuirofanoComponent } from './pages/asesoramiento/ficha-quirurgica/listado-cirugia-quirofano/listado-cirugia-quirofano.component';
import { ListadoCirugiaEditarComponent } from './pages/medico/asesoramiento/listado-cirugia-editar/listado-cirugia-editar.component';

import { AgendaBloqueoEdicionComponent } from './pages/mantenimiento/agenda/agenda-bloqueo-edicion/agenda-bloqueo-edicion.component';

import { AgendaRecepcionComponent } from './pages/recepcion/agenda/agenda-recepcion/agenda-recepcion.component';
import { PopupNotificacionComponent } from './pages/notificacion/popup-notificacion/popup-notificacion.component';
import { PopupChatComponent } from './pages/notificacion/popup-chat/popup-chat.component';
import { PopupListadoUsuarioComponent } from './pages/notificacion/popup-notificacion/popup-listado-usuario/popup-listado-usuario.component';
import { PopupNotificacionNuevaComponent } from './pages/notificacion/popup-notificacion/popup-notificacion-nueva/popup-notificacion-nueva.component';
import { ListadoCirugiaQuirofanoConsultaComponent } from './pages/quirofano/listado-cirugia-quirofano-consulta/listado-cirugia-quirofano-consulta.component';
import { FacturaElectronicaComponent } from './pages/facturacion/factura/factura-electronica/factura-electronica.component';
import { GerenciaDetalleOperacionCobroComponent } from './pages/gerencia/gerencia-detalle-operacion-cobro/gerencia-detalle-operacion-cobro.component';
import { BuscarClienteFacturaComponent } from './pages/facturacion/factura-electronica/popups/buscar-cliente-factura/buscar-cliente-factura.component';
import { PopupFacturaRenglonComponent } from './pages/factura/factura-electronica/popups/popup-factura-renglon/popup-factura-renglon.component';
import { BuscarConceptoFacturaComponent } from './pages/facturacion/factura-electronica/popups/buscar-concepto-factura/buscar-concepto-factura.component';
import { OtrasAccionesComponent } from './pages/facturacion/factura/otras-acciones/otras-acciones.component';
import { FacturacionArticuloComponent } from './pages/mantenimiento/facturacion-articulo/facturacion-articulo.component';
import { PopupPacienteAmpliadoComponent } from './pages/mantenimiento/popup/popup-paciente/popup-paciente-ampliado.component';
import { ListadoCirugiaSinUsoComponent } from './pages/quirofano/listado-cirugia/listado-cirugia-sin-uso.component';
import { UsuarioComponent } from './pages/mantenimiento/usuario/usuario/usuario.component';
import { PopupUsuarioEditarComponent } from './pages/mantenimiento/usuario/popup-usuario-editar/popup-usuario-editar.component';
import { PopupUsuarioEditarPasswordComponent } from './pages/mantenimiento/usuario/popup-usuario-editar-password/popup-usuario-editar-password.component';
import { CirugiaEditarComponent } from './pages/lista/cirugia-editar/cirugia-editar.component';
import { EstudioComponent } from './pages/lista/estudio/estudio.component';
import { EstudioEditarComponent } from './pages/lista/estudio-editar/estudio-editar.component';
import { ObrasocialAutorizacionWebEditarComponent } from './pages/lista/obrasocial-autorizacion-web-editar/obrasocial-autorizacion-web-editar.component';
import { ObrasocialAutorizacionWebComponent } from './pages/lista/obrasocial-autorizacion-web/obrasocial-autorizacion-web.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ChatListComponent } from './pages/chat/chat-list/chat-list.component';
import { ChatMessageComponent } from './pages/chat/chat-message/chat-message.component';
import { PopupAsociarUsuarioComponent } from './pages/chat/popups/popup-asociar-usuario/popup-asociar-usuario.component';
import { PopupAdjuntarArchivoComponent } from './pages/chat/popups/popup-adjuntar-archivo/popup-adjuntar-archivo.component';
import { PopupAsociarUsuarioGrupoComponent } from './pages/chat/popups/popup-asociar-usuario-grupo/popup-asociar-usuario-grupo.component';
import { InsumoStockComponent } from './pages/insumo/insumo-stock/insumo-stock.component';
import { StockInsumoEditarComponent } from './pages/mantenimiento/stock/insumo/stock-insumo-editar/stock-insumo-editar.component';
import { InsumoStockAgregarComponent } from './pages/insumo/insumo-stock/insumo-stock-agregar/insumo-stock-agregar.component';
import { PopupInsumoMovimientoDetalleComponent } from './pages/insumo/popups/popup-insumo-movimiento-detalle/popup-insumo-movimiento-detalle.component';
import { PopupInsumoAsociarComponent } from './pages/insumo/popups/popup-insumo-asociar/popup-insumo-asociar.component';
import { PopupInsumoConsultaComponent } from './pages/insumo/popups/popup-insumo-consulta/popup-insumo-consulta.component';
import { PopupOperacionCobroDistribucionMultipleComponentComponent } from './shared/popups/popup-operacion-cobro-distribucion-multiple-component/popup-operacion-cobro-distribucion-multiple-component.component';
import { MovimientoConceptoCuentaComponent } from './pages/mantenimiento/movimiento-caja/movimiento-concepto-cuenta/movimiento-concepto-cuenta.component';
import { MovimientoCuentaComponent } from './pages/mantenimiento/movimiento-caja/movimiento-cuenta/movimiento-cuenta.component';
import { MovimientoTipoMonedaComponent } from './pages/mantenimiento/movimiento-caja/movimiento-tipo-moneda/movimiento-tipo-moneda.component';
import { PopupMovimientoConceptoCuentaEditarComponent } from './pages/mantenimiento/movimiento-caja/popup-movimiento-concepto-cuenta-editar/popup-movimiento-concepto-cuenta-editar.component';
import { PopupMovimientoTipoMonedaEditarComponent } from './pages/mantenimiento/movimiento-caja/popup-movimiento-tipo-moneda-editar/popup-movimiento-tipo-moneda-editar.component';
import { PopupMovimientoCuentaEditarComponent } from './pages/mantenimiento/movimiento-caja/popup-movimiento-cuenta-editar/popup-movimiento-cuenta-editar.component';
import { MovimientoTipoComprobanteComponent } from './pages/mantenimiento/movimiento-caja/movimiento-tipo-comprobante/movimiento-tipo-comprobante.component';
import { PopupMovimientoTipoComprobanteEditarComponent } from './pages/mantenimiento/movimiento-caja/popup-movimiento-tipo-comprobante-editar/popup-movimiento-tipo-comprobante-editar.component';
import { ListadoCajaComponent } from './pages/gerencia/movimiento-caja/listado-caja/listado-caja.component';
import { PopupMovimientoComponent } from './pages/gerencia/movimiento-caja/popup-movimiento/popup-movimiento.component';
import { PopupMovimientoFindFacturaComponent } from './pages/gerencia/movimiento-caja/popup-movimiento-find-factura/popup-movimiento-find-factura.component';
import { PopupMovimientoFindPacienteCobroComponent } from './pages/gerencia/movimiento-caja/popup-movimiento-find-paciente-cobro/popup-movimiento-find-paciente-cobro.component';
import { ProveedorComponent } from './pages/mantenimiento/proveedor/proveedor.component';
import { PopupProveedorEditarComponent } from './pages/mantenimiento/popup/popup-proveedor-editar/popup-proveedor-editar.component';

import { ChatNotificatorComponent } from './pages/chat/chat-notificator/chat-notificator.component';
import { BuscarComprobanteAfipComponent } from './pages/facturacion/factura-electronica/popups/buscar-comprobante-afip/buscar-comprobante-afip.component';
import { PopupMedicoFacturaComponent } from './pages/medico/popup-medico-factura/popup-medico-factura.component';

import { UsuarioEditarComponent } from './pages/mantenimiento/usuario-editar/usuario-editar.component';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import { UsuarioNewComponent } from './pages/mantenimiento/usuario/usuario.component';
import { SweetAlertService } from './services/sweetalert.service';
import { ExcelService } from './services/excel.service';

// Translation

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MetodoPagoComponent } from './pages/mantenimiento/parametro/metodo-pago/metodo-pago.component';
import { EstudiosComponent } from './pages/mantenimiento/parametro/estudios/estudios.component';
import { PopupMetodoPagoComponent } from './pages/mantenimiento/parametro/metodo-pago/popup-metodo-pago/popup-metodo-pago.component';
import { PopupEstudiosComponent } from './pages/mantenimiento/parametro/estudios/popup-estudios/popup-estudios.component';
import { PopupRecetaComponent } from './pages/mantenimiento/parametro/receta/popup-receta/popup-receta.component';
import { LenteProveedorComponent } from './pages/mantenimiento/stock/lente-proveedor.component';

registerLocaleData(localeEsAR, 'es-Ar');

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    LoginComponent,
    QuirofanoComponent,
    MedicoComponent,
    PacienteComponent,
    LoadingComponent,
    ObraSocialComponent,
    ConvenioComponent,
    PmoComponent,
    CirugiaComponent,
    CirugiaGrupoComponent,
    CirugiaGrupoMedicoComponent,
    LiquidacionGeneradaComponent,
    LiquidacionComponent,

    PopupMedicoEditComponent,
    PopupMedicoFacturaComponent,
    PopupObrasocialComponent,
    PopupPmoComponent,
    PopupEntidadFacturaComponent,
    PopupMedicoComponent,
    PopupMedicoGrupoMedicoComponent,
    PopupMedicoGrupoComponent,
    LiquidarComponent,
    OperacionCobroComponent,
    AgendaComponent,
    EditConvenioComponent,
    CreacionComponent,
    PopupAgendaComponent,

    PopupConvenioComponent,
    PopupPacienteComponent,
    PopupPacienteNuevoComponent,
    TurnoComponent,
    PopupCombinadaComponent,
    PopupCombinadaItemComponent,
    EditObraSocialComponent,
    DistribucionPracticaComponent,
    PopupCombinadaLecturaComponent,
    PopUpFormaPagoComponent,
    AgendaMedicoComponent,
    PopupUsuarioComponent,
    PopupTurnoUsuarioObraSocialComponent,
    PopupUsuarioComponent,
    DateFormatPipe,
    PopupPacienteObrasocialComponent,
    PopupPracticaPorcentajeComponent,
    PopupObraSocialMedicoComponent,
    PopupObraSocialComponent,
    AgendaBloqueoComponent,
    OperacionCobroAuditarComponent,
    PopupTurnoEditarComponent,
    OperacionCobroDetalleComponent,
    PopupHistoriaClinicaResumenComponent,
    PopupOperacionCobroRegistroEditarComponent,
    OperacionCobroAfectarComponent,
    StockLenteComponent,
    AltaLenteComponent,
    PopupDetalleLenteComponent,
    LenteComponent,
    InsumoComponent,
    HistoriaClinicaComponent,
    AgendaAtencionMedicoComponent,
    EmptyComponent,
    NotFoundComponent,
    ListadoCirugiaComponent,
    PopupLentesComponent,
    LiquidacionDetalleComponent,
    ConfeccionFacturaComponent,
    PopupFichaQuirurgicaLenteComponent,
    PopupFichaQuirurgicaMedicoGrupoComponent,
    PopupFichaQuirurgicaEstadoComponent,
    PopupFichaQuirurgicaAnesteciaComponent,
    PopupPacienteEstudioComponent,
    PopupLenteTipoComponent,
    PopupHistoriaClinicaListaConsultaComponent,
    PopupLiquidacionDetalleComponent,
    PopupHistoriaClinicaRegistroComponent,
    PopupHistoriaClinicaRegistroNuevoComponent,
    PopupDerivarAsesoramientoComponent,
    HistoriaClinicaVisualizarComponent,
    PopupAgendaObservacionComponent,
    PopupOperacionCobroEditarComponent,
    PopupPacienteConsultaComponent,
    OperacionCobroDetalleMedicoComponent,
    PopupOperacionCobroRegistroBuscarComponent,
    AgendaConsultaComponent,
    OperacionCobroConsultaGerenciaComponent,
    PopupEstudiosImagenComponent,
    PopupOperacionCobroPresentacionComponent,
    PopupOperacionCobroPresentacionEditarRegistroComponent,
    PopupPresentacionEditarComponent,
    ListadoCirugiaQuirofanoComponent,
    PopupDerivarAsesoramientoListadoComponent,
    PopupListadoCirugiaQuirofanoEditarComponent,
    PopupCobroDistribucionEditarComponent,
    PopupFichaQuirurgicaOperacionCobroComponent,
    ListadoCirugiaEditarComponent,
    PopupListadoCirugiaQuirofanoObservacionEditarComponent,
    AgendaBloqueoEdicionComponent,
    PopupOperacionCobroDetalleComponent,
    PopupOperacionCobroDetallePacienteComponent,
    PopupOperacionCobroRegistroBuscarTodosComponent,
    PopupDetalleOperacionCobroDistribucionComponent,
    PopupOperacionCobroDistribucionComponent,
    AgendaRecepcionComponent,
    PopupPacienteEsperaComponent,
    PopupNotificacionComponent,
    PopupChatComponent,
    PopupListadoUsuarioComponent,
    PopupNotificacionNuevaComponent,
    ListadoCirugiaQuirofanoConsultaComponent,
    FacturaElectronicaComponent,
    GerenciaDetalleOperacionCobroComponent,
    BuscarClienteFacturaComponent,
    PopupFacturaRenglonComponent,
    BuscarConceptoFacturaComponent,
    PopupOperacionCobroDistribucionDetalleComponent,
    OtrasAccionesComponent,
    FacturacionArticuloComponent,
    PopupArticuloComponent,
    PopupOperacionCobroEditarDistribucionComponent,
    PopupAccesoAutorizacionOsComponent,
    PopupAccesoAutorizacionOsEditarComponent,
    PopupPacienteComponent,
    PopupArticuloComponent,
    PopupPacienteAmpliadoComponent,
    ListadoCirugiaSinUsoComponent,
    PopupUsuarioEditarComponent,
    PopupUsuarioEditarPasswordComponent,
    CirugiaEditarComponent,
    EstudioComponent,
    EstudioEditarComponent,
    ObrasocialAutorizacionWebEditarComponent,
    ObrasocialAutorizacionWebComponent,
    ChatComponent,
    ChatListComponent,
    ChatMessageComponent,
    PopupAsociarUsuarioComponent,
    PopupAdjuntarArchivoComponent,
    PopupAsociarUsuarioGrupoComponent,
    InsumoStockComponent,
    StockInsumoEditarComponent,
    InsumoStockAgregarComponent,
    PopupInsumoMovimientoDetalleComponent,
    PopupInsumoAsociarComponent,
    PopupInsumoConsultaComponent,
    PopupOperacionCobroDistribucionMultipleComponentComponent,
    MovimientoConceptoCuentaComponent,
    MovimientoCuentaComponent,
    MovimientoTipoMonedaComponent,
    PopupMovimientoConceptoCuentaEditarComponent,
    PopupMovimientoTipoMonedaEditarComponent,
    PopupMovimientoCuentaEditarComponent,
    MovimientoTipoComprobanteComponent,
    PopupMovimientoTipoComprobanteEditarComponent,
    ListadoCajaComponent,
    PopupMovimientoComponent,
    PopupMovimientoFindFacturaComponent,
    PopupMovimientoFindPacienteCobroComponent,
    ProveedorComponent,
    PopupProveedorEditarComponent,
    PopupProveedorFindComponent,
    ChatNotificatorComponent,
    BuscarComprobanteAfipComponent,
    UsuarioComponent,
    UsuarioNewComponent,
    UsuarioEditarComponent,
    UsuarioModuloComponent,
    UsuarioModuloOldComponent,
    UsuarioPasswordComponent,
    PopupDocumentacionDetalleComponent,
    EstudioCargaComponent,
    MetodoPagoComponent,
    PopupMetodoPagoComponent,
    EstudiosComponent,
    RecetaComponent,
    PopupEstudiosComponent,
    PopupRecetaComponent,
    LenteProveedorComponent,
    NumberToWordsPipe,
    SignDirective,
    PositivePipe,
  ],
  imports: [
    GalleriaModule,
    FileUploadModule,
    BrowserModule,
    FormsModule,
    MultiSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TableModule,
    CardModule,
    DropdownModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    MenubarModule,
    MenuModule,
    CheckboxModule,
    SpinnerModule,
    ToastModule,
    ListboxModule,
    OverlayPanelModule,
    DynamicDialogModule,
    OrderListModule,
    InputTextareaModule,
    ScrollPanelModule,
    ProgressSpinnerModule,
    PanelModule,
    InputSwitchModule,
    ToggleButtonModule,
    AutoCompleteModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [SignDirective],
  entryComponents: [
    PopupObrasocialComponent,
    PopupPmoComponent,
    PopupEntidadFacturaComponent,
    PopupMedicoComponent,
    PopupPacienteComponent,
    PopupMedicoGrupoMedicoComponent,
    PopupMedicoGrupoComponent,
    EditConvenioComponent,
    EditObraSocialComponent,
    PopupAgendaComponent,
    PopupConvenioComponent,
    PopupCombinadaComponent,
    PopupPacienteNuevoComponent,
    PopupCombinadaItemComponent,
    PopupCombinadaLecturaComponent,
    PopUpFormaPagoComponent,
    PopupUsuarioComponent,
    PopupTurnoUsuarioObraSocialComponent,
    PopupPacienteObrasocialComponent,
    PopupPracticaPorcentajeComponent,
    PopupObraSocialMedicoComponent,
    PopupObraSocialComponent,
    PopupMedicoEditComponent,
    PopupMedicoFacturaComponent,
    PopupTurnoEditarComponent,
    PopupOperacionCobroRegistroEditarComponent,
    PopupFichaQuirurgicaLenteComponent,
    PopupFichaQuirurgicaMedicoGrupoComponent,
    PopupDetalleLenteComponent,
    PopupLenteTipoComponent,
    PopupFichaQuirurgicaEstadoComponent,
    PopupFichaQuirurgicaAnesteciaComponent,
    PopupPacienteEstudioComponent,
    PopupHistoriaClinicaListaConsultaComponent,
    PopupHistoriaClinicaRegistroNuevoComponent,
    PopupLentesComponent,
    PopupHistoriaClinicaRegistroComponent,
    PopupHistoriaClinicaRegistroComponent,
    PopupHistoriaClinicaListaConsultaComponent,
    PopupDerivarAsesoramientoComponent,
    PopupAgendaObservacionComponent,
    PopupOperacionCobroEditarComponent,
    PopupPacienteConsultaComponent,
    PopupOperacionCobroRegistroBuscarComponent,
    PopupEstudiosImagenComponent,
    PopupOperacionCobroPresentacionComponent,
    PopupOperacionCobroPresentacionEditarRegistroComponent,
    PopupPresentacionEditarComponent,
    PopupDerivarAsesoramientoListadoComponent,
    PopupListadoCirugiaQuirofanoEditarComponent,
    PopupCobroDistribucionEditarComponent,
    PopupFichaQuirurgicaOperacionCobroComponent,

    PopupListadoCirugiaQuirofanoObservacionEditarComponent,
    PopupOperacionCobroDetalleComponent,
    PopupOperacionCobroDetallePacienteComponent,
    PopupOperacionCobroRegistroBuscarTodosComponent,
    PopupDetalleOperacionCobroDistribucionComponent,
    PopupOperacionCobroDistribucionComponent,
    PopupPacienteEsperaComponent,
    PopupNotificacionComponent,
    PopupChatComponent,
    PopupListadoUsuarioComponent,
    PopupNotificacionNuevaComponent,
    PopupFacturaRenglonComponent,
    BuscarConceptoFacturaComponent,
    PopupOperacionCobroDistribucionDetalleComponent,
    PopupLiquidacionDetalleComponent,
    PopupArticuloComponent,
    PopupOperacionCobroEditarDistribucionComponent,
    PopupPacienteComponent,
    ListadoCirugiaComponent,
    PopupArticuloComponent,
    PopupOperacionCobroDistribucionMultipleComponentComponent,
    PopupProveedorFindComponent,
    PopupProveedorEditarComponent,
    BuscarComprobanteAfipComponent,
    /** usuario */
    PopupUsuarioComponent,
    UsuarioModuloComponent,
    UsuarioEditarComponent,
    UsuarioPasswordComponent,

    /* -------------------------------------------------------------------------- */
    /*                                    CHAT                                    */
    /* -------------------------------------------------------------------------- */

    PopupAsociarUsuarioComponent,
    PopupAdjuntarArchivoComponent,
    PopupAsociarUsuarioGrupoComponent,

    /* -------------------------------------------------------------------------- */
    /*                                   INSUMOS                                  */
    /* -------------------------------------------------------------------------- */

    StockInsumoEditarComponent,
    InsumoStockAgregarComponent,
    PopupInsumoMovimientoDetalleComponent,
    PopupInsumoAsociarComponent,
    PopupInsumoConsultaComponent,

    /* -------------------------------------------------------------------------- */
    /*                             MOVIMIENTOS DE CAJA                            */
    /* -------------------------------------------------------------------------- */

    PopupMovimientoConceptoCuentaEditarComponent,
    PopupMovimientoTipoMonedaEditarComponent,
    PopupMovimientoCuentaEditarComponent,
    PopupMovimientoTipoComprobanteEditarComponent,
    PopupMovimientoComponent,
    PopupMovimientoFindFacturaComponent,
    PopupMovimientoFindPacienteCobroComponent,
    PopupDocumentacionDetalleComponent,

    PopupMovimientoTipoMonedaEditarComponent,
    PopupMovimientoCuentaEditarComponent,
    PopupMovimientoTipoComprobanteEditarComponent,
    PopupMovimientoComponent,
    PopupMovimientoFindFacturaComponent,
    PopupMovimientoFindPacienteCobroComponent,
    PopupMetodoPagoComponent,
    PopupEstudiosComponent,
    PopupRecetaComponent,
    LenteComponent,
  ],

  providers: [
    CurrencyPipe,
    DecimalPipe,
    NumberToWordsPipe,
    PacienteService,
    PushNotificationService,
    ExcelService,
    { provide: LOCALE_ID, useValue: 'es-Ar' },
    MultiSelectModule,

    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (injector: Injector) {
        return new JwtInterceptor(injector);
      },
      multi: true,
      deps: [Injector],
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    SweetAlertService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/* -------------------------------------------------------------------------- */
/*                             PRIME NG IMPORTANTE                            */
/* -------------------------------------------------------------------------- */
