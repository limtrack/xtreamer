import { Component, OnInit } from '@angular/core';
import { CustomPage } from '../custom-page/';
import { FilmService } from '../../models/film/film.service';
import { AppSettings } from '../../app/app.settings';
import { FilmDetailPage } from './film-detail';

@Component({
  templateUrl: 'film.html',
  providers: [FilmService, CustomPage],
})

export class FilmPage implements OnInit{

  protected films: Array<any> = [];
  protected currentPage: number = 0;

  // Barra de búsqueda
  public querySearch: String = '';
  public showSearchbar: Boolean = false;

  constructor(public customPage: CustomPage,
              protected filmService: FilmService) {}

  /**
   * Una vez que la vista ha sido cargada, se procede
   * a ejecutar las acciones que este método describe
   */
  public ngOnInit() {
    this.getFilms();
  }

  /**
   * Obtiene películas por genero
   */
  public getFilms() {

    if(this.querySearch !== ''){
      this.currentPage = 0;
    }

    const params = {
      page: this.currentPage + 1,
      language: AppSettings.DEFAULT_LANGUAGE,
      include_adult: false,
      sort_by: 'vote_average.asc',
      query: this.querySearch
    }    

    this.customPage.toggleLoading(true);
    this.filmService
      .getFilms(params)
      .finally(() => {
        this.customPage.toggleLoading(false);
      })
      .subscribe((data) => {
        this.customPage.checkResponse(data);
        this.setResponseFilms(data);
      });
  }

  /**
   * Trata la respuesta del servidor que obtiene las películas
   * 
   * @param data - respuesta del servidor
   */
  public setResponseFilms(data:any) {
    let currentFilms = (data.results && data.results.length > 0)
      ? data.results
      : [];

    this.currentPage = data.page;
    if (this.currentPage > 1) {
      for (let i = 0; i < currentFilms.length; i++) {
        this.films.push(currentFilms[i]);
      }  
    }else{
      this.films = data.results;
    }

  }

  /**
   * Navega hacia la vista detalle
   * 
   * @param id - identificador de película
   */
  public goToFilm(id:number) {
    this.customPage.goToPage(FilmDetailPage, false, {
      id: id,
    });
  }

  /**
   * Pagina a la siguiente página de resultados
   */
  public nextPage(event:any) {
    this.getFilms();
  }

  /**
   * Realiza una búsqueda por nombre de película
   * 
   * @param event - evento lanzado
   */
  public searchFilms(event) {
    if (this.querySearch.length > 2 || this.querySearch.length === 0) {
      this.getFilms();
    }
  }

  /**
   * Muestra/ocluta barra de búsqueda
   */
  public toggleSearchBar() {
    this.showSearchbar = !this.showSearchbar;
  }  

}
