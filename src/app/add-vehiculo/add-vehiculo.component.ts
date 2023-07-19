import { Component } from '@angular/core';
import { SingletonService } from 'src/app/services/singleton.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
  styleUrls: ['./add-vehiculo.component.css']
})
export class AddVehiculoComponent {

  vehiculos: any[] = [];

  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.fetchVehiculos();
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


  //CRUD Vehiculo
  insertarVehiculo() {
    Swal.fire({
      title: 'Nuevo Vehiculo',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Marca">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Modelo">'+
        '<input id="swal-input3" class="swal2-input" placeholder="Versión">'+
        '<input id="swal-input4" class="swal2-input" placeholder="Año">'+
        '<input id="swal-input5" class="swal2-input" placeholder="Categoria">'+
        '<input id="swal-input6" class="swal2-input" placeholder="Nombre Imagen">'+
        '<input id="swal-input7" class="swal2-input" placeholder="Url Imagen">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;

        const input3 = document.getElementById('swal-input3') as HTMLInputElement;
        
        const input4 = document.getElementById('swal-input4') as HTMLInputElement;
        
        const input5 = document.getElementById('swal-input5') as HTMLInputElement;
        
        const input6 = document.getElementById('swal-input6') as HTMLInputElement;
        
        const input7 = document.getElementById('swal-input7') as HTMLInputElement;
        
      },
      preConfirm: () => {
        const marca = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const modelo = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const version = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const anio = (document.getElementById('swal-input4') as HTMLInputElement).value.toString();
        const categoria = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const nombreImagen = (document.getElementById('swal-input6') as HTMLInputElement).value;
        const urlImagen = (document.getElementById('swal-input7') as HTMLInputElement).value;
        
        this.guardarVehiculo(marca, modelo, version, anio, categoria, nombreImagen, urlImagen);
        return true; // Agregar esta línea
      }       
    });
  } 
  
  guardarVehiculo(marca: string, modelo: string, version: string, anio: string, categoria: string, nombreImagen: string, urlImagen: string) {
    const vehiculo = {
      // Aquí define las propiedades del nuevo vehículo que deseas insertar
      Marca: marca,
      Modelo: modelo,
      Version: version,
      Anio: anio,
      Categoria: categoria,
      NombreImagen: nombreImagen,
      UrlImage: urlImagen,
    };

    this.singletonService.insertVehiculo(vehiculo).subscribe(
      (response) => {
        console.log('Vehículo insertado:', response);
        Swal.fire({
          title: 'Se ha ingresado exitosamente',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          // Actualizar la tabla sin recargar la página
          this.fetchVehiculos();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire('¡Error!');
      }
    );
  }

  editarVehiculo(id: number) {
    const vehiculo = this.vehiculos.find(cc => cc.VehiculoID === id);
    Swal.fire({
      title: 'Editar Vehículo',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Marca" value="' + vehiculo.Marca + '">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Modelo" value="' + vehiculo.Modelo + '">' +
        '<input id="swal-input3" class="swal2-input" placeholder="Versión" value="' + vehiculo.Version + '">' +
        '<input id="swal-input4" class="swal2-input" placeholder="Año" value="' + vehiculo.Anio + '">' +
        '<input id="swal-input5" class="swal2-input" placeholder="Categoría" value="' + vehiculo.Categoria + '">' +
        '<input id="swal-input6" class="swal2-input" placeholder="Nombre Imagen" value="' + vehiculo.NombreImagen + '">' +
        '<input id="swal-input7" class="swal2-input" placeholder="URL Imagen" value="' + vehiculo.UrlImage + '">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => {
        const marca = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const modelo = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const version = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const anio = (document.getElementById('swal-input4') as HTMLInputElement).value.toString();
        const categoria = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const nombreImagen = (document.getElementById('swal-input6') as HTMLInputElement).value;
        const urlImage = (document.getElementById('swal-input7') as HTMLInputElement).value;
  
        const vehiculoActualizado = {
          VehiculoID: vehiculo.VehiculoID,
          Marca: marca,
          Modelo: modelo,
          Version: version,
          Anio: anio,
          Categoria: categoria,
          NombreImagen: nombreImagen,
          UrlImage: urlImage,
        };
  
        this.guardarCambios(vehiculoActualizado);
      }
    });
  }
  
  guardarCambios(vehiculoActualizado: any) {
    this.singletonService.actualizarVehiculo(vehiculoActualizado).subscribe(
      (response) => {
        console.log('Vehículo actualizado:', response);
        Swal.fire({
          title: '¡Éxito!',
          text: 'El vehículo se ha actualizado correctamente.',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.fetchVehiculos();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar el vehículo.',
          icon: 'error',
          showCancelButton: false,
        });
      }
    );
  }

  eliminarVehiculo(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el vehiculo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.singletonService.eliminarVehiculo(id).subscribe(
          result => {
            // Eliminación exitosa, realiza cualquier acción adicional
            console.log(result);
            // Vuelve a cargar los vehículos después de eliminar uno
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              this.fetchVehiculos();
            });   
          },
          error => {
            console.error('Error al eliminar el vehículo:', error);
            Swal.fire('Ocurrió un error al eliminar el vehículo', '', 'error');
          }
        );
      }
    });
  }

}
