import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  // tslint:disable: no-inferrable-types

  info: InfoPagina = {};
  cargada: boolean = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {

    console.log('Servicio on');

    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {

     // Leeer archivo JSON
     this.http.get( 'assets/data/data-pagina.json' )
             .subscribe( (res: InfoPagina) => {

               this.cargada = true;
               this.info = res;

             })  ;

  }


  private cargarEquipo() {

    this.http.get('https://angular-html-curso-f22bc.firebaseio.com/equipo.json')
            .subscribe( (res: any[] ) => {

              this.equipo = res;
              console.log(res);


            });

  }

}
