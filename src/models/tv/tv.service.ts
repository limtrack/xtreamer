import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class TVService{

  constructor(private http: Http) {
    this.http = http;
  }  

  /**
   * Obtiene un listado de las series, según los parámetros por
   * los que se desea filtrar
   * 
   * @param params - parámetros pasados a la consulta
   * @return {Observable}
   */
  public getTVs(params:any):Observable<Response> {
    let url = params.query 
      ? '/discover/tv'
      : '/search/tv';

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
   * Obtiene los detalles de una serie
   * 
   * @param params - parámetros pasados a la consulta
   * @return {Observable}
   */
  public getTV(params:any):Observable<Response> | any {
    let url = '/tv/{tv_id}'
      .replace('{tv_id}', params.id || 0);

    return this.http
      .request(url, {
        method: 'get',
      })
      .map(res => res.json());
  }
}
