import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CustomPage } from '../custom-page/';
import { FilmService } from '../../models/film/film.service';
import { FilmPage } from './film';
import { FilmModel } from '../../models/film/film.model';

@Component({
  templateUrl: 'film-detail.html',
  providers: [FilmService, CustomPage],
})

export class FilmDetailPage implements OnInit{

  public film:FilmModel = {
    adult: false,
    backdrop_path: '',
    belongs_to_collection: {},
    budget: 0,
    genres: [],
    homepage: '',
    id: 0,
    imdb_id: '',
    original_language: '',
    original_title: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    production_countries: [],
    release_date: '',
    revenue: 0,
    runtime: 0,
    spoken_languages: [],
    status: '',
    tagline: '',
    title: '',
    video: false,
    vote_average: 0,
    vote_count: 0,
  };

  constructor(public customPage: CustomPage,
              protected filmsService: FilmService,
              public navParams: NavParams) {}

  /**
   * Una vez que la vista ha sido cargada, se procede
   * a ejecutar las acciones que este método describe
   */
  public ngOnInit() {
    (this.navParams.get('id'))
      ? this.getFilm(this.navParams.get('id'))
      : this.customPage.goToPage(FilmPage, true);
  }

  /**
   * Obtiene el detalle de una film
   * 
   * @param id - identificador de la film en la BD
   */
  public getFilm(id) {
    if (!isNaN(parseInt(id, 10))) {
      this.customPage.toggleLoading(true);
      this.filmsService
        .getFilm({ id })
        .finally(() => {
          this.customPage.toggleLoading(false);
        })
        .subscribe((data) => {
          this.customPage.checkResponse(data);
          this.setResponseFilm(data);
        });
    } else {
      this.customPage.goToPage(FilmPage, true);
    }
  }

  /**
   * Toma la respuesta y realiza las operaciones necesarias
   * para mostrar los datos en pantalla
   * 
   * @param data - respuesta del servidor
   */
  public setResponseFilm(data:any) {
    if((typeof data === 'object')){
      this.film = data;
    }else{
      this.customPage.goToPage(FilmPage, true)
    }    
  }

}
