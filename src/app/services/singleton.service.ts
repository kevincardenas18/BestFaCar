import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  constructor(private http: HttpClient) { }

  getVehiculos() {
    return this.http.get<any[]>('/api/vehiculos');
  }

  insertVehiculo(vehiculo: any) {
    return this.http.post<any>('/api/Vehiculos', vehiculo);
  }

  actualizarVehiculo(vehiculo: any) {
    return this.http.put<any>(`/api/Vehiculos/${vehiculo.VehiculoID}`, vehiculo);
  }

  eliminarVehiculo(id: number) {
    return this.http.delete<any>(`/api/Vehiculos/${id}`);
  }

  getCarrosel() {
    return this.http.get<any[]>('/api/CarroselApi');
  }

  insertCarrosel(carrosel: any) {
    return this.http.post<any>('/api/CarroselApi', carrosel);
  }

  actualizarCarrosel(carrosel: any) {
    return this.http.put<any>(`/api/CarroselApi/${carrosel.carroselID}`, carrosel);
  }

  eliminarCarrosel(id: number) {
    return this.http.delete<any>(`/api/CarroselApi/${id}`);
  }

  getCaracteristica() {
    return this.http.get<any[]>('/api/CaracteristicasApi');
  }

  getCalificacion() {
    return this.http.get<any[]>('/api/CalificacionApi');
  }

}
