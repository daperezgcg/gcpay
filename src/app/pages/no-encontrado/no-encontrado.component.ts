import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.scss',
})
export class NoEncontradoComponent {
  constructor(private location: Location) {}

  back() {
    this.location.back();
  }
}
