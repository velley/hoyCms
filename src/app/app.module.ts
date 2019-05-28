import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module'
import { DataTablesModule} from './data-tables/data-tables.module'
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    DataTablesModule,
    MatSidenavModule,    
  ],
  providers: [
    {
      provide:'BASE_CONFIG',
      useValue: {
        apiPath:'http://localhost:3000'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
