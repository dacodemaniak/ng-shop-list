import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluralize'
})
export class PluralizePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value > 1) {
     return `${value} produits dans la liste`;
    } else if (value === 1) {
      return `${value} produit dans la liste`;
    }
    return 'Aucun produit dans la liste';
  }

}
