import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'limitTo' })
export class limitToPipe implements PipeTransform {
  public transform(value: string, chars: number): string {
    const numChars = (chars > 0)
      ? chars
      : 150;

    return (value.length <= numChars)
      ? value
      : value.substr(0, numChars) + '...';
  }
}
