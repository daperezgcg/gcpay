import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'formatNumber',
   standalone: true,
})
export class FormatNumberPipe implements PipeTransform {
   transform(value: number | string): unknown {
      if (typeof value === 'string') {
         value = parseFloat(value);
      }
      let formattedAmount = value.toFixed(2);

      // Reemplazar el punto decimal por una coma
      formattedAmount = formattedAmount.replace('.', ',');

      // Añadir puntos para los miles
      formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      // Dividir en parte entera y parte decimal
      const [integerPart, decimalPart] = formattedAmount.split(',');

      // Retornar con la parte decimal en un span para aplicar estilos
      return `$${integerPart},<span class="small-decimal">${decimalPart}</span>`;
   }
}

// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//     name: 'formatNumber',
//     standalone: true,
// })
// export class FormatNumberPipe implements PipeTransform {
//     transform(value: number | string): unknown {
//         if (typeof value === 'string') {
//             value = parseFloat(value);
//         }
//         let formattedAmount = value.toFixed(2);

//         formattedAmount = formattedAmount.replace('.', ',');
//         formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

//         return '$' + formattedAmount;
//     }
// }
