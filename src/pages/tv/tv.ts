import { Component, OnInit } from '@angular/core';
import { CustomPage } from '../custom-page/';
import { TVService } from '../../models/tv/tv.service';
import { AppSettings } from '../../app/app.settings';
import { TVDetailPage } from './tv-detail';

@Component({
  templateUrl: 'tv.html',
  providers: [TVService, CustomPage],
})

export class TVPage implements OnInit{

  protected tvs: Array<any> = [];
  protected currentPage: number = 0;

  // Barra de búsqueda
  public querySearch: String = '';
  public showSearchbar: Boolean = false;  

  constructor(public customPage: CustomPage,
              protected tvService: TVService) {}

  /**
   * Una vez que la vista ha sido cargada, se procede
   * a ejecutar las acciones que este método describe
   */
  public ngOnInit() {
    this.getTVs();
  }

  /**
   * Obtiene películas por genero
   */
  public getTVs() {

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
    this.tvService
      .getTVs(params)
      .finally(() => {
        this.customPage.toggleLoading(false);
      })
      .subscribe((data) => {
        this.customPage.checkResponse(data);
        this.setResponseTVs(data);
      });
  }

  /**
   * Trata la respuesta del servidor que obtiene las películas
   * 
   * @param data - respuesta del servidor
   */
  public setResponseTVs(data:any) {
    let currentTVs = (data.results && data.results.length > 0)
      ? data.results
      : [];
    
    this.currentPage = data.page;
    if (this.currentPage > 1) {
      for (let i = 0; i < currentTVs.length; i++) {
        this.tvs.push(currentTVs[i]);
      }  
    }else{
      this.tvs = data.results;
    }
  }

  /**
   * Navega hacia la vista detalle
   * 
   * @param id - identificador de película
   */
  public goToTV(id:number) {
    this.customPage.goToPage(TVDetailPage, false, {
      id: id,
    });
  }

  /**
   * Pagina a la siguiente página de resultados
   */
  public nextPage(event:any) {
    this.getTVs();
  }

  /**
   * Realiza una búsqueda por nombre de película
   * 
   * @param event - evento lanzado
   */
  public searchTVs(event) {
    if (this.querySearch.length > 2 || this.querySearch.length === 0) {
      this.getTVs();
    }
  }

  /**
   * Muestra/ocluta barra de búsqueda
   */
  public toggleSearchBar() {
    this.showSearchbar = !this.showSearchbar;
  }  
  

}
