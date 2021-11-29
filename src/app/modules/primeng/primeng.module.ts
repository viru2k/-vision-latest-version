import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng-lts/dynamicdialog';
import { ListboxModule } from 'primeng-lts/listbox';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { ScrollPanelModule } from 'primeng-lts/scrollpanel';
import { PanelModule } from 'primeng-lts/panel';
import { AutoCompleteModule } from 'primeng-lts/autocomplete';
import { InputSwitchModule } from 'primeng-lts/inputswitch';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GalleriaModule,
    FileUploadModule,
    CardModule,
    MultiSelectModule,
    OrderListModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    OverlayPanelModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    MenubarModule,
    MenuModule,
    SpinnerModule,
    ToastModule,
    DynamicDialogModule,
    ListboxModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    ScrollPanelModule,
    PanelModule,
    AutoCompleteModule,
    InputSwitchModule,
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
  ],
  exports: [
    CommonModule,
    GalleriaModule,
    FileUploadModule,
    CardModule,
    MultiSelectModule,
    OrderListModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    OverlayPanelModule,
    DialogModule,
    RadioButtonModule,
    CalendarModule,
    InputMaskModule,
    MenubarModule,
    MenuModule,
    SpinnerModule,
    ToastModule,
    DynamicDialogModule,
    ListboxModule,
    ProgressSpinnerModule,
    InputTextareaModule,
    ScrollPanelModule,
    PanelModule,
    AutoCompleteModule,
    InputSwitchModule,
  ],
})
export class PrimengModule {}
