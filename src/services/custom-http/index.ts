import { Injectable } from '@angular/core';
import { Http, Request, Response, Headers, RequestOptions, 
  RequestOptionsArgs, XHRBackend } from '@angular/http';
import { AppSettings } from '../../app/app.settings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()

export class CustomHttp extends Http {
  
  private apiEndPoint = AppSettings.API_ENDPOINT;
  private apiKey = AppSettings.API_KEY;

  constructor(backend: XHRBackend, defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }
  /**
   * Reescribe el método de la clase base, ejecutando acciones para cada petición
   * La petición en curso puede llegar como una ruta o una clase request
   * Si viene sólo la cadena, debería traer las opciones aparte
   * 
   * @param  {string | Request}     request [description]
   * @param  {new Headers()}        options [description]
   * @return {Observable<Response>}         [description]
   */
  public request(request: string | Request, options: RequestOptionsArgs = { 
    headers: new Headers(),
  }) : Observable<Response> {
    const requestOptions = this.setupRequest(request, options);

    return this.onResponse(requestOptions.request, requestOptions.options);
  }
  /**
   * Interceptor de la respuesta generada de la petición que 
   * incluye otras llamadas personalizadas que la tratan
   * 
   * @param  {string | Request}     request [description]
   * @param  {RequestOptionsArgs}   options [description]
   * @return {Observable<Response>}         [description]
   */
  private onResponse(request: string | Request, options: RequestOptionsArgs) 
    : Observable<Response> {
    const observableRequest = super
      .request(request, options)
      .catch(this.onCatch());

    return observableRequest;
  }

  /**
   * Interceptor para capturar genérica de errores http
   * 
   * @param request - petición que falló y que se volverá a
   *                  lanzar tras recuperar el nuevo token
   */
  private onCatch() {
    return (res: Response) => {
      // TODO Errores
      return Observable.throw(res);
    };
  }

  /**
   * Devuelve la URL final del servicio
   */
  private prepareUrl(currentUrl) {
    const partsUrl = currentUrl.split('?');
    const url = partsUrl[0];
    const params = partsUrl[1]
      ? '&' + partsUrl[1]
      : '';

    return this.apiEndPoint + url + '?api_key=' + this.apiKey + params;
  }

  /**
   * [setupRequest description]
   * @param {string | Request} request [description]
   * @param {RequestOptionsArgs} options [description]
   */
  private setupRequest(request: string | Request, options: RequestOptionsArgs) {
    let parseRequest = request;
    let parseOptions = options;

    if (typeof request === 'string') {
      parseRequest = this.prepareUrl(parseRequest);
      parseOptions = this.setHeaders(parseOptions);
    } else {
      parseRequest['url'] = this.prepareUrl(parseRequest['url']);
      parseRequest = Object.assign(this.setHeaders(parseRequest));
    }

    return {
      request: parseRequest,
      options: parseOptions,
    };
  }

  /**
  * Interceptor para componer las cabeceras en cada petición
  * @param {Request | RequestOptionsArgs} objectToSetHeadersTo [description]
  */
  private setHeaders(objectToSetHeadersTo: Request | RequestOptionsArgs) {
    const headers = (objectToSetHeadersTo.hasOwnProperty('headers'))
      ? objectToSetHeadersTo.headers
      : new Headers();

    headers.set('Content-Type', 'application/json');
    objectToSetHeadersTo.headers = headers;
    return objectToSetHeadersTo;
  }  
}
