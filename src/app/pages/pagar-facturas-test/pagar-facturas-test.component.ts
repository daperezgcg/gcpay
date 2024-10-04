import { Component, inject } from '@angular/core';
import { UserWidgetComponent } from '@templates/user-widget/user-widget.component';
import { toastAlert } from '@utilities/toastAlert.utils';
import { GcPayServiceTest } from '../../services/gcpay-test.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { SeleccionarFacturasComponent } from './seleccionar-facturas/seleccionar-facturas.component';

@Component({
  selector: 'app-pagar-facturas-test',
  standalone: true,
  imports: [
    SeleccionarFacturasComponent,
    CheckoutComponent,
    UserWidgetComponent,
  ],
  templateUrl: './pagar-facturas-test.component.html',
  styleUrl: './pagar-facturas-test.component.scss',
})
export class PagarFacturasTestComponent {
  gcPayService: GcPayServiceTest = inject(GcPayServiceTest);

  showCheckout: boolean = false;

  constructor() {
    if (this.gcPayService.billsSelected.length === 0) {
      this.showCheckout = false;
    }
  }

  goToChekout() {
    if (this.gcPayService.billsSelected.length !== 0) {
      this.showCheckout = true;
    } else {
      toastAlert.fireAlert(
        'error',
        'Selecciona una o más facturas para continuar'
      );
    }
  }
}
