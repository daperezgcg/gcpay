import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-state',
  standalone: true,
  imports: [],
  templateUrl: './modal-state.component.html',
  styleUrl: './modal-state.component.scss',
})
export class ModalStateComponent {
  @Input()
  public state: string = '0';

  public configs: Record<
    string,
    {
      src: SafeResourceUrl;
      title: string;
      description: string;
    }
  > = {
    '0': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/clock.gif'
      ),
      title: 'Tiempo de espera finalizado',
      description:
        'El tiempo de espera para procesar el pago ha expirado. Por favor, intente nuevamente.',
    },

    '1': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/check.gif'
      ),
      title: '¡Pago aprobado!',
      description:
        'Monto: [monto_pagado], Fecha: [fecha_pago], ID de transacción: [id_transaccion].',
    },

    '2': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/warning.gif'
      ),
      title: 'Rechazado',
      description:
        'Tu pago ha sido rechazado. Verifica los detalles de la tarjeta y vuelve a intentarlo.',
    },

    '3': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/warning.gif'
      ),
      title: 'Anulado',
      description:
        'El pago ha sido anulado. Si tienes alguna duda, contáctanos.',
    },

    '4': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/warning.gif'
      ),
      title: 'Error',
      description:
        'Ha ocurrido un error al procesar el pago. Por favor, intenta nuevamente más tarde.',
    },
  };

  constructor(private sanitizer: DomSanitizer) {}
}
