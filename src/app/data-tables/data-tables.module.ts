import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module'
import { MatDialogModule } from '@angular/material/dialog';
import { DataTablesRoutingModule } from './data-tables-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent, AddTableDialog } from './list/list.component';

@NgModule({
  declarations: [ListComponent, AddTableDialog],
  entryComponents: [
    AddTableDialog
  ],
  imports: [
    ShareModule,
    DataTablesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class DataTablesModule { }
