import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: number[], searchText: string): number[] {
    if (!items) return [];
    if (!searchText) return items;

    // Convertimos el texto de búsqueda a número
    const searchNumber = parseFloat(searchText);

    // Si searchNumber no es un número válido, devolvemos la lista completa
    if (isNaN(searchNumber)) return items;

    // Filtramos los elementos que coincidan con el número de búsqueda
    return items.filter((item) => item.toString().includes(searchText));
  }
}
