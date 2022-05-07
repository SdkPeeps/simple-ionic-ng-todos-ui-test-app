import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TodosDataBrokerServiceToken } from 'todos-lib';
import { LocalTodosDataBrokerService } from './services/local-todos-data-broker/local-todos-data-broker.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // provide the data-broker implementation
    {provide:TodosDataBrokerServiceToken , useClass:LocalTodosDataBrokerService},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
