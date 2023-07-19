import { Component } from '@angular/core';
import { SingletonService } from 'src/app/services/singleton.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  carroselData: any[] = [];
  vehiculos: any[] = [];
  caracteristicas: any[] =[];

  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.getCarroselData();
    this.fetchVehiculos();
    this.getCaracteristicas();
  }

  getCarroselData() {
    this.singletonService.getCarrosel().subscribe(
      data => {
        this.carroselData = data;
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
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
