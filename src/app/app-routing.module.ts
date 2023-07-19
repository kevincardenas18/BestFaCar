import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { CompararComponent } from './comparar/comparar.component';
import { AddVehiculoComponent } from './add-vehiculo/add-vehiculo.component';
import { AddCarouselComponent } from './add-carousel/add-carousel.component';

const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'vehiculos', component: VehiculosComponent },
{ path: 'comparar', component: CompararComponent },
{ path: 'agregarVehiculo', component: AddVehiculoComponent },
{ path: 'agregarCarousel', component: AddCarouselComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
