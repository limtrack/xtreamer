import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class FilmService{

  constructor(private http: Http) {
    this.http = http;
  }  

  /**
   * Obtiene un listado de películas, según los parámetros por
   * los que se desea filtrar
   * 
   * @param params - parámetros pasados a la consulta
   * @return {Observable}
   */
  public getFilms(params:any):Observable<Response> {
    let url = params.query 
      ? '/search/movie'
      : '/discover/movie';
    let _params = [];

    if(typeof params === 'object'){
      Object.keys(params).forEach(function(key) {
        _params.push(key + '=' + params[key]);
      });
    }
    url = url + '?' + _params.join('&');    

    return this.http.
      request(url, {
        method: 'get',
      })
      .map(res => res.json());
  }

  /**
   * Obtiene los detalles de una película
   * 
   * @param params - parámetros pasados a la consulta
   * @return {Observable}
   */
  public getFilm(params:any):Observable<Response> | any {
    let url = '/movie/{movie_id}'
      .replace('{movie_id}', params.id || 0);

    return this.http
      .request(url, {
        method: 'get',
      })
      .map(res => res.json());
  }
}
