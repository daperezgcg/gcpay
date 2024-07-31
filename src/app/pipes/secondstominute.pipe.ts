import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'secondsToTime',
   standalone: true,
})
export class SecondsToMinutePipe implements PipeTransform {
   transform(seconds: number): string {
      if (isNaN(seconds) || seconds < 0 || seconds === 0) {
         return '00:00'; // Manejo de errores básicos
      }

      const m = Math.floor((seconds % 3600) / 60);
      const s = Math.floor(seconds % 60);

      const mm = m.toString().padStart(2, '0');
      const ss = s.toString().padStart(2, '0');

      return `${mm}:${ss}`;
   }
}
