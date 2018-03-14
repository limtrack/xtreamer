import { Menu, Nav } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppSettings } from './app.settings';

@Component({
  templateUrl: './app.html',
})

export class MyApp implements OnInit{

  @ViewChild('mainNav') nav:Nav;
  @ViewChild('mainMenu') menu:Menu;

  private rootPage:any;
  private pages:Array<any> = AppSettings.MENU_PAGES;

  constructor() {}  

  ngOnInit() {
    this.rootPage = this.getInitPathApp();
  }

  /**
   * Ruta inicial de la aplicación, dependiendo si el usuario
   * se ha "logado" o no en la aplicación
   * 
   * @return void
   */
  getInitPathApp():any {
    return AppSettings.FILM_PAGE;
  }

  /**
   * Metodo para navegar desde el menu principal
   * a algunas de las secciones de la aplicación
   * 
   * @param page - página a la que se desea ir
   * @return void
   */
  goPageInNav(page:any):void {
    this.goPage(page);
    // set class 'active'
    for (const p of this.pages) {
      p.active = (page.id === p.id);
    }
  }

  /**
   * Ir a una de las secciones de la aplicación
   * 
   * @param page - página a la que se desea ir
   * @return void
   */
  goPage(page:any):void {
    this.nav.setRoot(page.component);
    this.menu.close();
  }

}