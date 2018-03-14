import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from '../../app/app.settings';

@Pipe({ name: 'assets' })
export class AssetsPipe implements PipeTransform {
  public transform(value: string): string {
  	return (value === '') ? value : AppSettings.URL_SERVER.concat(value);
  }
}
