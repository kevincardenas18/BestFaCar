import { Component } from '@angular/core';
import { SingletonService } from 'src/app/services/singleton.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-carousel',
  templateUrl: './add-carousel.component.html',
  styleUrls: ['./add-carousel.component.css']
})
export class AddCarouselComponent {

  carroselData: any[] = [];

  constructor(private singletonService: SingletonService) {}

  ngOnInit() {
    this.getCarroselData();
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

  //CRUD Carousel
  insertarCarousel() {
    Swal.fire({
      title: 'Nuevo Carousel',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Url">'+
        '<input id="swal-input3" class="swal2-input" placeholder="ImagePath">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Crear',
      allowOutsideClick: () => !Swal.isLoading(),
      didOpen: () => {
        const input1 = document.getElementById('swal-input1') as HTMLInputElement;
        
        const input2 = document.getElementById('swal-input2') as HTMLInputElement;

        const input3 = document.getElementById('swal-input3') as HTMLInputElement;
      },
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const url = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const imagePath = (document.getElementById('swal-input3') as HTMLInputElement).value;
        
        this.guardarCarousel(nombre, url, imagePath);
        return true; // Agregar esta línea
      }       
    });
  } 
  
  guardarCarousel(nombre: string, url: string, imagePath: string) {
    const carousel = {
      // Aquí define las propiedades del nuevo vehículo que deseas insertar
      Nombre: nombre,
      Url: url,
      ImagePath: imagePath,
    };

    this.singletonService.insertCarrosel(carousel).subscribe(
      (response) => {
        console.log('Carousel insertado:', response);
        Swal.fire({
          title: 'Se ha ingresado exitosamente',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          // Actualizar la tabla sin recargar la página
          this.getCarroselData();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire('¡Error!');
      }
    );
  }

  editarCarousel(id: number) {
    const carousel = this.carroselData.find(cc => cc.carroselID === id);
    Swal.fire({
      title: 'Editar Carousel',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre" value="' + carousel.Nombre + '">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Url" value="' + carousel.Url + '">'+
        '<input id="swal-input3" class="swal2-input" placeholder="ImagePath" value="' + carousel.ImagePath + '">',
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: () => {
        const nombre = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const url = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const imagePath = (document.getElementById('swal-input2') as HTMLInputElement).value;
  
        const carouselActualizado = {
          carroselID: carousel.carroselID,
          Nombre: nombre,
          Url: url,
          ImagePath: imagePath,
        };
  
        this.guardarCambios(carouselActualizado);
      }
    });
  }
  
  guardarCambios(carouselActualizado: any) {
    this.singletonService.actualizarCarrosel(carouselActualizado).subscribe(
      (response) => {
        console.log('Carousel actualizado:', response);
        Swal.fire({
          title: '¡Éxito!',
          text: 'El Carousel se ha actualizado correctamente.',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.getCarroselData();
        });
      },
      (error) => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al actualizar el Carousel.',
          icon: 'error',
          showCancelButton: false,
        });
      }
    );
  }

  eliminarCarousel(id: number) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el carousel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.singletonService.eliminarCarrosel(id).subscribe(
          result => {
            // Eliminación exitosa, realiza cualquier acción adicional
            console.log(result);
            // Vuelve a cargar los vehículos después de eliminar uno
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              this.getCarroselData();
            });   
          },
          error => {
            console.error('Error al eliminar el carousel:', error);
            Swal.fire('Ocurrió un error al eliminar el carousel', '', 'error');
          }
        );
      }
    });
  }
}
