import { Component, OnInit } from '@angular/core';

@Component({
   selector: 'app-user-widget',
   standalone: true,
   imports: [],
   templateUrl: './user-widget.component.html',
   styleUrl: './user-widget.component.scss',
})
export class UserWidgetComponent implements OnInit {
   public name?: string;
   public date?: string;

   ngOnInit(): void {
      const name = localStorage.getItem('nombre');
      if (name) this.name = name;
      const date = localStorage.getItem('fecha');
      if (date) this.date = date;
   }
}
