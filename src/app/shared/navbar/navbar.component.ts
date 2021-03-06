// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

// Common

import packageInfo from '../../../../package.json';
// PrimeNg
import { MenuItem, MessageService } from 'primeng-lts/api';
import { OverlayPanel } from 'primeng-lts/overlaypanel';
import { DialogService } from 'primeng-lts/dynamicdialog';

// Sweet Alert
import swal from 'sweetalert2';

// Jquery
import * as $ from 'jquery';

// Models
import { User } from './../../models/user.model';

import { PopupChatComponent } from './../../pages/notificacion/popup-chat/popup-chat.component';

import { PopupNotificacionComponent } from './../../pages/notificacion/popup-notificacion/popup-notificacion.component';
import { PopupDocumentacionDetalleComponent } from '../popups/popup-documentacion-detalle/popup-documentacion-detalle.component';

// Services
import { AuthenticationService } from './../../services/authentication.service';
import { NotificacionesService } from '../../services/notificaciones.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat-service.service';
import { SweetAlertService } from 'src/app/services/sweetalert.service';

// Components

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [MessageService, DialogService, DatePipe],
})
export class NavbarComponent implements OnInit {
  user?: User;
  loggedIn = false;
  general: MenuItem[] = [];
  mantenimiento_stock_insumo = true;
  mantenimiento_stock_lente = true;
  mantenimiento_otros = true;
  facturacion_consulta = true;
  facturacion_control = true;
  medico_consulta = true;
  medico_control = true;
  quirofano_consulta = true;
  quirofano_control = true;
  asesoramiento_control = true;
  asesoramiento_consulta = true;
  recepcion_consulta = true;
  recepcion_control = true;
  administrador = true;
  estudios_consulta = true;
  estudios_control = true;
  gerencia_control = true;

  public username: string;
  public puesto: string;
  elemento: User = null;
  elementoModulo: [] = null;
  loginForm: FormGroup;
  loading = false;
  loading_mensaje: string;
  loading_error;
  submitted = false;
  returnUrl: string;
  error = '';
  notificaciones: number = 0;
  chats;
  lista_usuarios_chat: any[] = [];
  mensaje = 0;
  public appVersion;
  currentVersion: any;
  currentDate: any;
  constructor(
    private notificacionesService: NotificacionesService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private miServico: UserService,
    private chatService: ChatService,
    public sweetAlertService: SweetAlertService
  ) {
    // Define version and updated Dated
    this.currentVersion = { version: packageInfo.version };
    this.currentDate = { updateddate: packageInfo.updateddate };
  }
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit() {
    /*======== JQUERY DEL LOGUIN =========*/
    $(document).ready(function ($) {
      'use strict';

      /*==================================================================
     [ Focus Contact2 ]*/
      $('.input100').each(function () {
        $(this).on('blur', function () {
          if ($(this).val() != '') {
            $(this).addClass('has-val');
          } else {
            $(this).removeClass('has-val');
          }
        });
      });

      /*==================================================================
     [ Validate ]*/
      var input = $('.validate-input .input100');

      $('.validate-form').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
          if (validate(input[i]) == false) {
            showValidate(input[i]);
            check = false;
          }
        }

        return check;
      });

      $('.validate-form .input100').each(function () {
        $(this).focus(function () {
          hideValidate(this);
        });
      });

      function validate(input) {
        return false;
      }

      function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
      }
    });

    $('.notification-icon').click(function (e) {
      var that = $(this);
      that.toggleClass(
        'active ' + that.attr('data-active-icon') + ' ' + that.attr('data-icon')
      );
    });

    /*======== FIN JQUERY DEL LOGUIN =========*/

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      puesto: ['0'],
    });

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser['access_token'] != '') {
      let userData = JSON.parse(localStorage.getItem('userData'));
      console.log(userData);
      console.log('usuario logueado');
      this.loggedIn = true;
      this.username = userData['username'];
      this.puesto = userData['puesto'];
      console.log(userData['access_list']);
      this.asignarModulos(userData['access_list']);
      //  this.getNotificacionesByUsuario();
      /*** busco notificaciones si esta logueado*/
      // TODO -REFACTOR
      /* let timer = Observable.timer(180000,180000);//180000 -- 3 minutos inicia y en 3 minutos vuelve a llamar
     timer.subscribe(t=> {
       console.log('listando notificaciones');
       this.getNotificacionesByUsuario();
   });*/
      this.menuList();
    } else {
      console.log('sin credenciales');
      this.throwAlert(
        'error',
        'Usuario o contrase??a incorrectos',
        'Verifique el usuario y contrase??a, su sesion puede haber expirado',
        '500'
      );
    }
  }

  accion(evt: any, overlaypanel: OverlayPanel) {
    if (event) {
    }
    console.log(event);

    overlaypanel.toggle(evt);
  }

  ajustes() {
    console.log('ajustes');
  }

  asignarModulos(modulos: any) {
    modulos.forEach((element) => {
      // console.log(element['modulo_nombre']);
      if (element['modulo_nombre'] === 'mantenimiento_stock_insumo') {
        this.mantenimiento_stock_insumo = false;
      }
      if (element['modulo_nombre'] === 'mantenimiento_stock_lente') {
        this.mantenimiento_stock_lente = false;
      }
      if (element['modulo_nombre'] === 'mantenimiento_otros') {
        this.mantenimiento_otros = false;
        console.log(element['modulo_nombre']);
      }
      if (element['modulo_nombre'] === 'facturacion_consulta') {
        this.facturacion_consulta = false;
      }
      if (element['modulo_nombre'] === 'facturacion_control') {
        this.facturacion_control = false;
      }
      if (element['modulo_nombre'] === 'medico_consulta') {
        this.medico_consulta = false;
      }
      if (element['modulo_nombre'] === 'medico_control') {
        this.medico_control = false;
      }
      if (element['modulo_nombre'] === 'quirofano_consulta') {
        this.quirofano_consulta = false;
      }
      if (element['modulo_nombre'] === 'quirofano_control') {
        this.quirofano_control = false;
      }
      if (element['modulo_nombre'] === 'asesoramiento_control') {
        this.asesoramiento_control = false;
      }
      if (element['modulo_nombre'] === 'asesoramiento_consulta') {
        this.asesoramiento_consulta = false;
      }
      if (element['modulo_nombre'] === 'recepcion_consulta') {
        this.recepcion_consulta = false;
      }
      if (element['modulo_nombre'] === 'recepcion_control') {
        this.recepcion_control = false;
      }
      if (element['modulo_nombre'] === 'administrador') {
        this.administrador = false;
      }
      if (element['modulo_nombre'] === 'estudios_control') {
        this.estudios_control = false;
      }
      if (element['modulo_nombre'] === 'estudios_consulta') {
        this.estudios_consulta = false;
      }

      if (element['modulo_nombre'] === 'gerencia_control') {
        this.gerencia_control = false;
      }
    });

    /** DESPUES DE ASIGNAR MODULOS VERIFICO LAS NOTIFICACIONES */
  }

  cargarListaChat() {
    this.loading = true;
    this.loading_mensaje = 'Obteniendo contactos de chat';
    let userData = JSON.parse(localStorage.getItem('userData'));
    try {
      this.chatService.getSesionListByUsuario(userData['id']).subscribe(
        (resp) => {
          this.lista_usuarios_chat = resp;
          console.log(this.lista_usuarios_chat);
          this.loading = false;
        },
        (error) => {
          // error path
          console.log('error', error);
          console.log(error.status);
          /*           this.throwAlert(
            "error",
            "error",
            "Error: " + error.status + "  Error al cargar los registros",
            error.message
          ); */
          //     this.resultSave = false;
          this.loading = false;
        }
      );
    } catch (error) {}
  }

  micuenta() {}

  documentacion(): void {
    let data: any;
    const ref = this.dialogService.open(PopupDocumentacionDetalleComponent, {
      data,
      header: 'Documentaci??n sobre el sistema',
      width: '98%',
      height: '90%',
    });
    ref.onClose.subscribe((PopupDocumentacionDetalleComponent: any) => {});
  }

  cerrarSesion() {
    swal({
      title: 'Cerrando sesi??n',
      text: '??Desea finalizar la sesi??n actual?',
      showCancelButton: true,
      confirmButtonColor: '#E53935',
      cancelButtonColor: '#42A5F5',
      cancelButtonText: 'Permanecer',
      confirmButtonText: 'Cerrar sesi??n',
      imageUrl: 'https://img.icons8.com/clouds/100/000000/imac-exit.png',
      imageHeight: 128,
      imageWidth: 128,
    }).then((result) => {
      if (result.value) {
        console.log('sesion terminada');
        this.authenticationService.logout();
        this.loggedIn = false;
        this.mantenimiento_stock_insumo = true;
        this.mantenimiento_stock_lente = true;
        this.mantenimiento_otros = true;
        this.facturacion_consulta = true;
        this.facturacion_control = true;
        this.medico_consulta = true;
        this.medico_control = true;
        this.quirofano_consulta = true;
        this.quirofano_control = true;
        this.asesoramiento_control = true;
        this.asesoramiento_consulta = true;
        this.recepcion_consulta = true;
        this.recepcion_control = true;
        this.administrador = true;
        this.user = null;
        this.elemento = null;
        this.elementoModulo = [];
        window.location.reload();
      }
    });

    //this.router.navigateByUrl('/');
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loading_mensaje = 'Validando usuario';
    this.authenticationService
      .login(this.f['username'].value, this.f['password'].value)
      // .pipe(first())
      .subscribe(
        (data) => {
          console.log(data);
          this.user = data;
          let us = new User(
            '',
            '',
            '',
            '',
            '',
            this.f['username'].value,
            this.f['password'].value,
            [],
            this.f['puesto'].value
          );
          localStorage.setItem('userData', JSON.stringify(us));
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          //  this.router.navigate([this.returnUrl]);
          this.loadUser();
        },
        (error) => {
          console.log(error);

          if (error === 'The user credentials were incorrect.') {
            this.loading_error = true;
            this.loading = false;
            this.loading_mensaje = '';
          } else {
            this.loading = false;
            this.loading_mensaje = '';
          }
          this.error = error;
        }
      );
  }

  ver() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(currentUser['access_token']);
  }

  loadUser() {
    this.loading = true;
    try {
      this.loading_mensaje = 'Obteniendo modulos del usuario';
      this.miServico.getItemInfoAndMenu(this.f['username'].value).subscribe(
        (resp) => {
          this.elemento = resp;
          // this.elementoModulo = this.elemento['access_list']
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          let userData = JSON.parse(localStorage.getItem('userData'));
          console.log(this.elemento);
          this.elementoModulo = <any>this.elemento;
          this.user = new User(
            this.elemento[0]['id'],
            this.elemento[0]['email'],
            this.elemento[0]['nombreyapellido'],
            this.elemento[0]['name'],
            this.elemento[0]['admin'],
            this.elemento[0]['email'],
            currentUser['access_token'],
            this.elementoModulo,
            this.f['username'].value
          );
          this.username = userData['username'];
          this.puesto = userData['puesto'];
          localStorage.removeItem('userData');
          localStorage.setItem('userData', JSON.stringify(this.user));

          this.asignarModulos(this.elementoModulo);
          // console.log(this.user);
          this.loading = false;
          this.loading_mensaje = '';
          console.log('logueado');
          this.loggedIn = true;
          this.menuList();
        },
        (error) => {
          // error path
          console.log(error.message);
          console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
          this.loading_mensaje = '';
          //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
        }
      );
    } catch (error) {
      //  this.throwAlert('error','Error al cargar los registros',error);
    }
  }

  menuList() {
    this.general = [
      {
        label: 'Recepci??n',
        visible: !this.recepcion_consulta,
        items: [
          {
            label: 'Agenda recepci??n',
            visible: !this.recepcion_consulta,
            routerLink: 'recepcion/agenda',
          },
          {
            label: 'Agenda',
            items: [
              {
                label: 'Agenda Telefonista',
                routerLink: 'recepcion//telefonista/agenda',
              },
              { label: 'Gestion de turnos', routerLink: 'recepcion/turnos' },
            ],
          },

          {
            label: 'Factura electr??nica',
            items: [
              {
                label: 'Realizar factura',
                visible: !this.recepcion_consulta,
                routerLink: 'recepcion/factura/electronica',
              },
              {
                label: 'Otras acciones',
                visible: !this.recepcion_consulta,
                routerLink: 'recepcion/factura/acciones',
              },
            ],
          },

          {
            label: 'Operaci??n de cobro',
            visible: !this.recepcion_consulta,
            routerLink: 'recepcion/operacioncobro',
          },
          // tslint:disable-next-line: max-line-length
          {
            label: 'Detalle de operaciones de cobro',
            visible: !this.recepcion_consulta,
            routerLink: 'liquidacion/operacioncobro/detalle',
          },
          {
            label: 'Historia cl??nica',
            visible: !this.recepcion_consulta,
            routerLink: 'medico/historiaclinica/consulta',
          },
        ],
      },
      {
        label: 'Asesoramiento',
        visible: !this.asesoramiento_control,
        items: [
          { label: 'Atenci??n', routerLink: 'gestion/agenda' },
          { label: 'Gestion de turnos', routerLink: 'recepcion/turnos' },

          {
            label: 'Cobros',
            items: [
              {
                label: 'Operaci??n de cobro',
                visible: !this.asesoramiento_control,
                routerLink: 'asesoramiento/operacioncobro',
              },
              {
                label: 'Rendici??n de caja',
                visible: !this.asesoramiento_control,
                routerLink: 'asesoramiento/facturacion/rendicion',
              },
            ],
          },
          {
            label: 'Asesoramiento',
            visible: !this.asesoramiento_consulta,
            items: [
              {
                label: 'Derivaci??n a cirugias',
                visible: !this.asesoramiento_consulta,
                routerLink: 'asesoramiento/cirugia/listado/cirugia',
              },
              {
                label: 'Listado de cirugias',
                visible: !this.asesoramiento_control,
                routerLink: 'asesoramiento/cirugia/cirugia/listas',
              },
              {
                label: 'Ficha quir??rgica',
                visible: !this.asesoramiento_control,
                routerLink: 'asesoramiento/cirugia/ficha',
              },
              {
                label: 'Historia clinica',
                visible: !this.asesoramiento_control,
                routerLink: 'medico/historiaclinica/consulta',
              },
            ],
          },
        ],
      },
      {
        label: 'Estudios',
        visible: !this.estudios_consulta,
        items: [
          { label: 'Atenci??n', routerLink: 'gestion/agenda' },
          {
            label: 'Realizar estudio',
            visible: !this.estudios_control,
            routerLink: 'estudio/cargar',
          },
          {
            label: 'Historia cl??nica',
            visible: !this.estudios_consulta,
            routerLink: 'medico/historiaclinica/consulta',
          },
        ],
      },

      {
        label: 'Gerencia',
        visible: !this.gerencia_control,
        items: [
          {
            label: 'Agenda consulta',
            visible: !this.gerencia_control,
            routerLink: 'gerencia/agenda/consulta',
          },
          {
            label: 'Operacion cobro consulta',
            visible: !this.gerencia_control,
            routerLink: 'gerencia/operacioncobro/consulta',
          },
          {
            label: 'Detalle de operaciones de cobro',
            visible: !this.gerencia_control,
            routerLink: 'gerencia/operacioncobro/detalle',
          },
          {
            label: 'Movimiento de caja',
            visible: !this.gerencia_control,
            routerLink: 'gerencia/caja/movimiento',
          },
        ],
      },
      {
        label: 'Quir??fano',
        visible: !this.quirofano_consulta,
        items: [
          {
            label: 'Agenda de m??dicos',
            visible: !this.quirofano_control,
            routerLink: 'recepcion/agenda',
          },
          {
            label: 'Quir??fano',
            visible: !this.quirofano_control,
            items: [
              {
                label: 'Agenda de cirugia',
                visible: !this.quirofano_control,
                routerLink: 'gestion/agenda',
              },
              {
                label: 'Listado de cirugia',
                visible: !this.quirofano_control,
                routerLink: 'quirofona/cirugia/listado/cirugia',
              },
              {
                label: 'Control de insumos',
                visible: !this.quirofano_control,
                routerLink: 'recepcion/agenda',
              },
              {
                label: 'Seguimiento paciente',
                visible: !this.quirofano_control,
                routerLink: 'recepcion/agenda',
              },
              {
                label: 'Historia cl??nica',
                visible: !this.quirofano_control,
                routerLink: 'medico/historiaclinica/consulta',
              },
            ],
          },
          {
            label: 'Insumos',
            visible: !this.quirofano_control,
            items: [
              {
                label: 'Ingreso stock',
                visible: !this.quirofano_control,
                routerLink: 'insumo/stock',
              },
              {
                label: 'Movimiento de insumos',
                visible: !this.quirofano_control,
                routerLink: 'insumo/movimiento',
              },
              {
                label: 'Stock consulta',
                visible: !this.quirofano_control,
                routerLink: 'recepcion/agenda',
              },
            ],
          },
        ],
      },
      {
        label: 'M??dico',
        visible: !this.medico_control,
        items: [
          {
            label: 'Gesti??n de agenda',
            visible: !this.medico_control,
            routerLink: 'gestion/agenda',
          },
          {
            label: 'Atenci??n',
            items: [
              {
                label: 'Historia cl??nica',
                visible: !this.medico_control,
                routerLink: 'medico/historiaclinica',
              },
              {
                label: 'Cirugias',
                visible: !this.medico_control,
                routerLink: 'medico/cirugia/listado/cirugia',
              },
            ],
          },
          {
            label: 'Cirugias',
            visible: !this.medico_control,
            routerLink: 'medico/operacioncobro/listado/cirugia',
          },

          {
            label: 'Facturaci??n',
            items: [
              {
                label: 'Detalle de operaci??n de cobro',
                visible: !this.medico_control,
                routerLink: 'medico/operacioncobro/detalle',
              },
              {
                label: 'Liquidacion - no disponible -',
                visible: !this.medico_control,
                routerLink: 'medico/operacioncobro/detalle',
              },
            ],
          },
        ],
      },

      {
        label: 'Facturaci??n',
        visible: !this.facturacion_control,
        items: [
          {
            label: 'Facturaci??n',
            visible: !this.facturacion_consulta,
            items: [
              {
                label: 'Detalle de operaciones de cobro',
                visible: !this.facturacion_consulta,
                routerLink: 'liquidacion/operacioncobro/detalle',
              },
              {
                label: 'Auditar Operacion de cobro',
                visible: !this.facturacion_control,
                routerLink: 'liquidacion/operacioncobro/auditar',
              },
              {
                label: 'Afectar Operacion de cobro',
                visible: !this.facturacion_control,
                routerLink: 'liquidacion/operacioncobro/afectar',
              },
            ],
          },
          {
            label: 'Liquidaci??n',
            visible: !this.facturacion_control,
            items: [
              {
                label: 'Presentaci??n',
                routerLink: 'facturacion/liquidacion/presentacion',
              },

              {
                label: 'Liquidaci??n',
                visible: !this.facturacion_control,
                items: [
                  {
                    label: 'Confeccionar liquidaci??n',
                    routerLink: 'facturacion/liquidacion/confeccion',
                  },
                  {
                    label: 'Liquidar',
                    routerLink: 'facturacion/liquidacion/liquidar',
                  },
                  {
                    label: 'Contabilidad',
                    routerLink: 'facturacion/liquidacion/generada',
                  },
                ],
              },
            ],
          },
          {
            label: 'Historia cl??nica',
            visible: !this.recepcion_consulta,
            routerLink: 'medico/historiaclinica/consulta',
          },
        ],
      },
      {
        label: 'Mantenimiento',

        items: [
          {
            label: 'Gesti??n de agendas',
            visible: !this.recepcion_control,
            items: [
              { label: 'Agenda de medico', routerLink: 'agenda/medico' },
              {
                label: 'Bloquear agenda',
                routerLink: 'agenda/medico/bloquear',
              },
              {
                label: 'Desbloquear agenda',
                routerLink: 'agenda/medico/desbloquear',
              },
            ],
          },
          {
            label: 'Convenios',
            visible: !this.facturacion_control,
            items: [
              { label: 'Convenios', routerLink: 'convenios/convenio' },
              { label: 'Obra social', routerLink: 'convenios/obrasocial' },
              { label: 'Pmo', routerLink: 'convenios/pmo' },
              { label: 'Distribucion de pr??ctica', routerLink: 'distribucion' },
            ],
          },

          {
            label: 'Gesti??n de caja',
            visible: !this.gerencia_control,
            items: [
              { label: 'Cuenta', routerLink: 'movimientos/caja/cuenta' },
              {
                label: 'Concepto de cuenta',
                routerLink: 'movimientos/caja/concepto/cuenta',
              },
              {
                label: 'Tipo de comprobante',
                routerLink: 'movimientos/caja/concepto/comprobante',
              },
              { label: 'Moneda', routerLink: 'movimientos/caja/tipo/moneda' },
            ],
          },
          {
            label: 'Perfiles',
            visible: !this.facturacion_control,
            items: [
              {
                label: 'Paciente',
                visible: !this.facturacion_control,
                routerLink: 'paciente',
              },
              {
                label: 'Proveedor',
                visible: !this.facturacion_control,
                routerLink: 'proveedor',
              },
              {
                label: 'Medicos',
                visible: !this.facturacion_control,
                routerLink: 'medico',
              },
              {
                label: 'Usuario',
                visible: !this.administrador,
                routerLink: 'usuario',
              },
            ],
          },
          {
            label: 'Insumos',
            visible: !this.facturacion_control,
            items: [
              {
                label: 'Insumos',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'insumo/insumo',
              },
              {
                label: 'Lentes',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'insumo/lente',
              },
            ],
          },

          {
            label: 'Facturaci??n articulos',
            visible: !this.administrador,
            routerLink: 'factura/articulo',
          },
          {
            label: 'Stock de lentes',
            visible: !this.mantenimiento_stock_insumo,
            routerLink: 'stock/lente/stock',
          },
          {
            label: 'Parametros',
            visible: !this.facturacion_control,
            items: [
              {
                label: 'M??todos de pago',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'parametros/metodopago',
              },
              {
                label: 'Estudios',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'parametros/estudio',
              },
              {
                label: 'Recetas',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'parametros/receta',
              },
              /*    {
                label: 'Estudios',
                visible: !this.mantenimiento_stock_insumo,
                routerLink: 'parametros/estudio'
              }, */
            ],
          },
        ],
      },
    ];

    this.cargarListaChat();
  }

  throwAlert(
    estado: string,
    mensaje: string,
    motivo: string,
    errorNumero: string
  ) {
    console.log('ON NCve');
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

    if (errorNumero == '99') {
      mensaje = 'Debe seleccionar un paciente antes de cargar las pr??cticas';
      swal({
        type: 'warning',
        title: 'Atenci??n..',
        text: mensaje,
        footer: motivo,
      });
    }

    if (errorNumero == '100') {
      mensaje = 'El paciente posee una obra social que no esta habilitada';
      swal({
        type: 'warning',
        title: 'Atenci??n..',
        text: mensaje,
        footer: motivo,
      });
    }
    if (estado == 'warning') {
      swal({
        type: 'warning',
        title: 'Atenci??n..',
        text: mensaje,
        footer: motivo,
      });
    }

    if (estado == 'error' && errorNumero != '422') {
      if (errorNumero === '422') {
        mensaje =
          'Los datos que esta tratando de guardar son iguales a los que ya poseia';
      }
      if (errorNumero === '400 ') {
        mensaje = 'Bad Request ';
      }
      if (errorNumero === '404') {
        mensaje = 'No encontrado ';
      }
      if (errorNumero === '401') {
        mensaje = 'Sin autorizaci??n';
      }
      if (errorNumero === '403') {
        mensaje =
          ' Prohibido : La consulta fue valida, pero el servidor rechazo la accion. El usuario puede no tener los permisos necesarios, o necesite una cuenta para operar ';
      }
      if (errorNumero === '405') {
        mensaje = 'M??todo no permitido';
      }
      if (errorNumero === '500') {
        mensaje = 'Error interno en el servidor';
      }
      if (errorNumero === '503') {
        mensaje = 'Servidor no disponible';
      }
      if (errorNumero === '502') {
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

  // TODO - REMOVE

  verNotificacion() {
    let data: any;

    const ref = this.dialogService.open(PopupNotificacionComponent, {
      data,
      header: 'Notificaciones',
      width: '98%',
      height: '80%',
    });

    ref.onClose.subscribe((PopupNotificacionComponent: any) => {
      if (PopupNotificacionComponent) {
      }
    });
  }

  verChat() {
    let data: any;

    const ref = this.dialogService.open(PopupChatComponent, {
      data,
      header: 'Chat',
      width: '98%',
      height: '80%',
    });

    ref.onClose.subscribe((PopupChatComponent: any) => {
      if (PopupChatComponent) {
      }
    });
  }

  getNotificacionesByUsuario() {
    let userData = JSON.parse(localStorage.getItem('userData'));
    this.loading = true;

    try {
      this.notificacionesService
        .getNotificacionesByUsuario(userData['id'])
        .subscribe(
          (resp) => {
            if (resp[0]) {
              let i: number = 0;
              let resultado = resp;
              let estado: string;
              let usuario_id: number;
              this.notificaciones = 0;
              resultado.forEach((element) => {
                estado = resp[i]['usuario_estado'];
                usuario_id = resp[i]['usuario_id'];
                if (
                  estado === 'PENDIENTE' &&
                  Number(userData['id']) === usuario_id
                ) {
                  this.notificaciones++;
                  console.log(this.notificaciones);
                }
                i++;
              });
            }
            this.loading = false;
            console.log(resp.length);
          },
          (error) => {
            // error path
            console.log(error);
          }
        );
    } catch (error) {
      // this.throwAlert('error','Error al cargar los registros',error,error.status);
    }
  }
}
