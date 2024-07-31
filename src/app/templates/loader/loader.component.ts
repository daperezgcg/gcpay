import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-loader',
   standalone: true,
   imports: [NgClass],
   templateUrl: './loader.component.html',
   styleUrl: './loader.component.scss',
})
export class LoaderComponent {
   @Input() theme: 'light' | 'dark' | '' = 'light';
}
