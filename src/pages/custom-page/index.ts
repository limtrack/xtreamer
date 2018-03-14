import { Injectable } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';

@Injectable()

/**
 * Componente encargado con todos los eventos y acciones
 * comunes de todas las vistas de la aplicación
 */
export class CustomPage{

  // Loading
  public loadingLayer;
  
  /**
   * Método constructor, requiere de Controlador de navegación de
   * capa de "cargando" para la transicción entre páginas
   * 
   * @param navCtrl
   * @param loadingCtrl 
   */
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl?: LoadingController) {}

  /**
   * Si la petición obtenida al servidor no es correcta
   * se muestra una capa de error de aplicación
   * 
   * @param data - Datos recibidos en las respuestas del servidor
   * @param params - Personalizar mensaje de error
   */
  public checkResponse(data: any, params?: any): any | void {
    if (typeof data === 'object') {
      return data;
    }
    this.showAlert(params);
  }
  
  /**
   * Navegación entre "páginas" de la aplicación
   * @param page - Pagina a donde se desea ir
   * @param root - Indica si se desea reiniciar la navegación desde la página que indicamos
   * @param parameters - Parámetros pasados a la página
   */
  public goToPage(page: any, root?:boolean, parameters?: any): void {
    const params = typeof parameters !== 'undefined'
      ? parameters
      : {};
    
    if (root) {
      this.navCtrl.setRoot(page);
    } else {
      this.navCtrl.push(page, params);
    }
  }

  /**
   * Muestra una alerta en pantalla
   * 
   * @param parameters {object} - Opciones para mostrar la alerta
   */
  public showAlert(parameters?:any): void {
    const defaultParams = {
      title: 'Aviso del sistema',
      subTitle: 'Hubo un error al procesar la petición, pulse OK para reintentar',
      buttons: [
        { 
          text:'OK',
          handler: () => {
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
          },
        },
      ],
    };
    const params = typeof parameters !== 'undefined'
      ? Object.assign(defaultParams, parameters)
      : defaultParams;
    const alert = this.alertCtrl.create(params);
    
    alert.present();
  }

  /**
   * Muestra / Oculta la capa de carga
   * 
   * @param show {boolean} - Mostramos u ocultamos la capa
   * @param show {string} - Mensaje a mostrar
   */
  public toggleLoading(show:boolean, msg?:string): void {
    if (typeof this.loadingCtrl !== 'undefined') {
      const contentLoading = typeof msg !== 'undefined'
        ? msg
        : 'Espere por favor...';

      if (show) {
        this.loadingLayer = this.loadingCtrl.create({ content: contentLoading });
        this.loadingLayer.present();
      }else {
        this.loadingLayer.dismiss();
      }
    }
  }

}
