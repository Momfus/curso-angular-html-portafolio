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

  constructor( private http: HttpClient ) {

    console.log('Servicio on');

    // Leeer archivo JSON
    this.http.get( 'assets/data/data-pagina.json' )
            .subscribe( (res: InfoPagina) => {

              this.cargada = true;
              this.info = res;

            } )  ;

  }
}
