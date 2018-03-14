import { FilmPage } from '../pages/film/film';
import { TVPage } from '../pages/tv/tv';

export class AppSettings {
  // Servidor REMOTO
  public static API_ENDPOINT = 'https://api.themoviedb.org/3';
  public static API_KEY = 'c5e4a1733c2995102fafe209c014e4c0';
  public static URL_SERVER = 'https://image.tmdb.org/t/p/w500/';
  // "Paginas" de la aplicación
  public static FILM_PAGE  = FilmPage;
  public static TV_PAGE  = TVPage;
  // Idioma por defecto
  public static DEFAULT_LANGUAGE  = 'en-EN';
  // Menu de navegación principal
  public static MENU_PAGES = [
    { 
      id:'films',
      title: 'Films', 
      component: AppSettings.FILM_PAGE, 
      icon: 'bulb',
    },
    { 
      id:'tv',
      title: 'TVs', 
      component: AppSettings.TV_PAGE, 
      icon: 'bulb',
    }    
  ];
}
