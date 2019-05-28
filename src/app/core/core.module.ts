import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module'
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    ShareModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent
  ]
})
export class CoreModule { }
