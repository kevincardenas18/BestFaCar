import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { SingletonService } from './services/singleton.service';
import { CompararComponent } from './comparar/comparar.component';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';
import { AddCarouselComponent } from './add-carousel/add-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VehiculosComponent,
    CompararComponent,
    AddVehiculoComponent,
    AddCarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    SingletonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
