import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(public route: ActivatedRoute) {}

  menu: Array<Menu> = [
    {
      icon: 'fa-solid fa-house',
      title: 'Facturas',
      id: 1,
      url: '/pagar-facturasss',
      parent_menu: 1,
    },
    {
      icon: 'fa-solid fa-clock-rotate-left',
      title: 'Historial',
      id: 2,
      url: '/historial-pagos',
      parent_menu: 1,
    },
  ];
}

type typesIcon = 'solid';
type Icon = `fa-${typesIcon} fa-${string}`;

interface Menu {
  id: number;
  title: string;
  url: string;
  icon?: Icon;
  parent_menu: Menu['id'] | null;
}
