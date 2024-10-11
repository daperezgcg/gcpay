import { Component, Input, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GcPayService } from '@services/gcpay.service';
import { flowbiteUtilities } from '@utilities/flowbite.utils';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-modal-state',
  standalone: true,
  imports: [],
  templateUrl: './modal-state.component.html',
  styleUrl: './modal-state.component.scss',
})
export class ModalStateComponent {
  private interval?: any;

  ngOnInit(): void {
    initFlowbite();
  }

  @Input()
  public state: string = '0';
  public id: any = 0;
  gcPayService: GcPayService = inject(GcPayService);

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
      title: 'Esperando confirmación del pago',
      description: 'Lorem ipsum sit ai met',
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
    '5': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/clock.gif'
      ),
      title: 'Se ha agotado el tiempo',
      description:
        'Si ya realizaste el pago en verificalo nuevamente para obtener el detalle, o puedes consultarlo en el historial de pagos',
    },
    '6': {
      src: this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/looties/clock.gif'
      ),
      title: 'No se ha podido verificar tu pago',
      description:
        'Si ya realizaste el pago en verificalo nuevamente para obtener el detalle, o puedes consultarlo en el historial de pagos',
    },
  };

  tryAgain() {
    this.state = '0';
    let limit = 3;
    this.gcPayService.isPaying = true;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.gcPayService.consultState(this.id).subscribe((data) => {
        if (data != '0') {
          this.state = data;
          this.gcPayService.getBills();
          clearInterval(this.interval);
          this.gcPayService.isPaying = false;
        } else {
          this.state = '6';
          clearInterval(this.interval);
        }
      });

      limit--;
    }, 3000);
  }

  moveToHistory() {
    this.gcPayService.isPaying = false;
    flowbiteUtilities.closeModal('#state-modal');
    this.router.navigate(['/historial-pagos']);
  }

  constructor(private sanitizer: DomSanitizer, private router: Router) {}
}
