import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { IonicApp, IonicModule } from 'ionic-angular';
// Servicios
import { CustomHttp } from '../services/custom-http/';
// Páginas (componentes)
import { FilmPage } from '../pages/film/film';
import { TVPage } from '../pages/tv/tv';
import { FilmDetailPage } from '../pages/film/film-detail';
import { TVDetailPage } from '../pages/tv/tv-detail';
// Pipes
import { AssetsPipe } from '../pipes/assets/';
// App
import { MyApp } from './app.component';

@NgModule({
  // Todas las "cosas" que vamos a usar en nuestros templates,
  // principalmente componentes, pero tambien "pipes" y "directives".
  // Poseen un caracter o alcance "local"
  declarations: [
    MyApp,
    FilmPage,
    TVPage,
    FilmDetailPage,
    TVDetailPage,
    AssetsPipe,
  ],
  // Igual que los "import" que poseen los componentes, pero estos se realizarán
  // de modo global y solo se cargarán una vez
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  // (entry)Componente lanzado en el inicio de la aplicación
  bootstrap: [IonicApp],
  // Componentes lanzados en algún momento de la aplicación
  // principalmente llamados por medio del "routing"
  entryComponents: [
    MyApp,
    FilmPage,
    TVPage,
    FilmDetailPage,
    TVDetailPage,
  ],
  // "provider" es cualquier cosa que puede crear o devolver un servicio (servicios en general).
  // Aquí deben cargarse los "servicios" que se van a usar de un modo general, para los servicios
  // "particulares" es preferible cargarlos en la etiqueta "providers" de cada componente.
  // Poseen un caracter o alcance "global"
  providers: [{
    provide: Http,
    useFactory: (
      backend: XHRBackend,
      defaultOptions: RequestOptions,
    ) => new CustomHttp(backend, defaultOptions),
    deps: [XHRBackend, RequestOptions],
  }],
})
export class AppModule {}