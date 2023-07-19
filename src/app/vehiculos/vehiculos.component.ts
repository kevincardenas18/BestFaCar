import { Component } from '@angular/core';
import { SingletonService } from 'src/app/services/singleton.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {

  vehiculos: any[] = [];
  caracteristicas: any[] =[];

  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.fetchVehiculos();
    this.getCaracteristicas();
  }

  fetchVehiculos() {
    this.singletonService.getVehiculos().subscribe(
      (data) => {
      this.vehiculos = data;
      },
      (error) => {
        console.error('Error al obtener los vehículos:', error);
      }
    );
  }

  getCaracteristicas() {
    this.singletonService.getCaracteristica().subscribe(
      data => {
        this.caracteristicas = data;
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }

  getCaracteristicaDescripcion(vehiculoID: number): string {
    const caracteristica = this.caracteristicas.find(c => c.VehiculoID === vehiculoID);
    return caracteristica ? caracteristica.descripcion : '';
  }
  
}
