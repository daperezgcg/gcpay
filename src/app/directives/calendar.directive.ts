import VanillaCalendar from 'vanilla-calendar-pro';
import { IOptions } from 'vanilla-calendar-pro/types';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
   selector: '[appCalendar]',
   standalone: true,
})
export class CalendarDirective implements OnInit {
   constructor(private el: ElementRef) {}

   ngOnInit(): void {
      const options: IOptions = {
         input: true,
         type: 'multiple',
         settings: {
            lang: 'es',
            range: {
               disablePast: true,
            },
            selection: {
               day: 'multiple-ranged',
            },
            visibility: {
               daysOutside: false,
            },
         },
         actions: {
            changeToInput(e, self) {
               if (!self.HTMLInputElement) return;
               if (self.selectedDates[1]) {
                  self.selectedDates.sort(
                     (a, b) => +new Date(a) - +new Date(b),
                  );
                  self.HTMLInputElement.value = `${self.selectedDates[0]} — ${
                     self.selectedDates[self.selectedDates.length - 1]
                  }`;
               } else if (self.selectedDates[0]) {
                  self.HTMLInputElement.value = self.selectedDates[0];
               } else {
                  self.HTMLInputElement.value = '';
               }
            },
         },
      };

      const calendarInput = new VanillaCalendar(this.el.nativeElement, options);
      calendarInput.init();
   }
}
