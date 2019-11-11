import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  // tslint:disable: no-inferrable-types

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }


  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-curso-f22bc.firebaseio.com/productos_idx.json')
          .subscribe( (res: Producto[]) => {

            this.productos = res;
            this.cargando = false;
            resolve();

      } );

    });



  }


  getProducto( id: string ): Observable<any> {

    return this.http.get(`https://angular-html-curso-f22bc.firebaseio.com/productos/${id}.json`);

  }

  buscarProductor( termino: string ) {

    if( this.productos.length === 0 ) {

      // Cargar productos
      this.cargarProductos().then( () => {

        // El then ejecuta luego de obtener los productos
        // Se aplica el filtro
        this.filtrarProductos( termino )

      });

    } else {

      // aplicar filtro
      this.filtrarProductos( termino );

    }


  }

  private filtrarProductos( termino: string ) {

    // console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      // Si lo que la persona escribio coincide con algo del elemento del prod (o con el titulo)
      if ( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino) >= 0 ) {

        this.productosFiltrado.push( prod );

      }

    });

  }

}
