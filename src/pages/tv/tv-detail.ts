import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { CustomPage } from '../custom-page/';
import { TVService } from '../../models/tv/tv.service';
import { TVPage } from './tv';
import { TVModel } from '../../models/tv/tv.model';

@Component({
  templateUrl: 'tv-detail.html',
  providers: [TVService, CustomPage],
})

export class TVDetailPage implements OnInit{

  public tv:TVModel = {
    backdrop_path: '',
    created_by: [],
    episode_run_time: [],
    first_air_date: '',
    genres: [],
    homepage: '',
    id: 0,
    in_production: false,
    languages: [],
    last_air_date: '',
    name: '',
    networks: [],
    number_of_episodes: 0,
    number_of_seasons: 0,
    origin_country: [],
    original_language: '',
    original_name: '',
    overview: '',
    popularity: 0,
    poster_path: '',
    production_companies: [],
    seasons: [],
    status: '',
    type: '',
    vote_average: 0,
    vote_count: 0,
  };

  constructor(public customPage: CustomPage,
              protected tvsService: TVService,
              public navParams: NavParams) {}

  /**
   * Una vez que la vista ha sido cargada, se procede
   * a ejecutar las acciones que este método describe
   */
  public ngOnInit() {
    (this.navParams.get('id'))
      ? this.getTV(this.navParams.get('id'))
      : this.customPage.goToPage(TVPage, true);
  }

  /**
   * Obtiene el detalle de una tv
   * 
   * @param id - identificador de la tv en la BD
   */
  public getTV(id) {
    if (!isNaN(parseInt(id, 10))) {
      this.customPage.toggleLoading(true);
      this.tvsService
        .getTV({ id })
        .finally(() => {
          this.customPage.toggleLoading(false);
        })
        .subscribe((data) => {
          this.customPage.checkResponse(data);
          this.setResponseTV(data);
        });
    } else {
      this.customPage.goToPage(TVPage, true);
    }
  }

  /**
   * Toma la respuesta y realiza las operaciones necesarias
   * para mostrar los datos en pantalla
   * 
   * @param data - respuesta del servidor
   */
  public setResponseTV(data:any) {
    if((typeof data === 'object')){
      this.tv = data;
    }else{
      this.customPage.goToPage(TVPage, true)
    }
  }

}
