import { Component, Input } from '@angular/core';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { IBill } from '@interfaces/pagar-facturas.interface';

@Component({
   selector: 'app-modal-impuesto',
   standalone: true,
   imports: [FormatNumberPipe],
   templateUrl: './modal-impuesto.component.html',
   styleUrl: './modal-impuesto.component.scss',
})
export class ModalImpuestoComponent {
   @Input()
   public bill?: IBill;
}
