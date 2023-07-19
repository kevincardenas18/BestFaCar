import { Component } from '@angular/core';
import { SingletonService } from 'src/app/services/singleton.service';

@Component({
  selector: 'app-comparar',
  templateUrl: './comparar.component.html',
  styleUrls: ['./comparar.component.css']
})
export class CompararComponent {

  mostrarComparacion: boolean = false;
  vehiculos: any[] = [];
  calificaciones: any[] = [];

  vehiculo1ID: string = '';
  vehiculo2ID: string = '';
  vehiculo1: any = null;
  vehiculo2: any = null;
  valoracion1: any = {
    calificacionID: '',
    VehiculoID: '',
    proteccionFrontal: '',
    proteccionLateral: '',
    proteccionInfantil: '',
    sistemasSeguridad: '',
    proteccionPeaton: '',
    equipamiento: ''
  };
  valoracion2: any = {
    calificacionID: '',
    VehiculoID: '',
    proteccionFrontal: '',
    proteccionLateral: '',
    proteccionInfantil: '',
    sistemasSeguridad: '',
    proteccionPeaton: '',
    equipamiento: ''
  };
  valor1: number = 0;
  valor2: number = 0;

  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.fetchVehiculos();
    this.getCalificicaciones();
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


  compararVehiculos() {
    this.vehiculo1 = this.vehiculos.find((vehiculo) => vehiculo.VehiculoID === parseInt(this.vehiculo1ID));
    this.vehiculo2 = this.vehiculos.find((vehiculo) => vehiculo.VehiculoID === parseInt(this.vehiculo2ID));
    this.getCalificacionVehiculo(parseInt(this.vehiculo1ID), parseInt(this.vehiculo2ID));
    
    // Cálculo del promedio para el vehículo 1
  const campos1 = [
    this.valoracion1.proteccionFrontal,
    this.valoracion1.proteccionLateral,
    this.valoracion1.proteccionInfantil,
    this.valoracion1.sistemasSeguridad,
    this.valoracion1.proteccionPeaton,
    this.valoracion1.equipamiento
  ];
  const promedio1 = this.calcularPromedio(campos1);
  this.valor1 = promedio1;

  // Cálculo del promedio para el vehículo 2
  const campos2 = [
    this.valoracion2.proteccionFrontal,
    this.valoracion2.proteccionLateral,
    this.valoracion2.proteccionInfantil,
    this.valoracion2.sistemasSeguridad,
    this.valoracion2.proteccionPeaton,
    this.valoracion2.equipamiento
  ];
  const promedio2 = this.calcularPromedio(campos2);
  this.valor2 = promedio2;

  this.mostrarComparacion = true;
    console.log('Vehículo 1:', this.vehiculo1);
    console.log('Vehículo 2:', this.vehiculo2);
    console.log('Vehículo 1:', this.valoracion1);
    console.log('Vehículo 2:', this.valoracion2);
    console.log(this.vehiculo1ID);
    console.log(this.vehiculo2ID);
    console.log(this.valor1);
    console.log(this.valor2);
   }

   getCalificicaciones() {
    this.singletonService.getCalificacion().subscribe(
      data => {
        this.calificaciones = data;
      },
      error => {
        console.log('Error al obtener los datos:', error);
      }
    );
  }

  // getCalificacionVehiculo(vehiculoID: number): string {
  //   const calificacion = this.calificaciones.find(c => c.VehiculoID === vehiculoID);
  //   return calificacion ? calificacion.proteccionFrontal : '';
  // }

  getCalificacionVehiculo(vehiculoID: number, vehiculoID2: number) {
    this.valoracion1 = this.calificaciones.find(c => c.VehiculoID === vehiculoID);
    this.valoracion2 = this.calificaciones.find(c => c.VehiculoID === vehiculoID2);
  }

  calcularPromedio(valores: number[]): number {
    const sum = valores.reduce((total, valor) => total + valor, 0);
    const promedio = sum / valores.length;
    return isNaN(promedio) ? 0 : promedio;
  }

}
