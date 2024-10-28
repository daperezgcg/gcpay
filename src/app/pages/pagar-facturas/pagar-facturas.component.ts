import { Component, inject } from '@angular/core';
import { UserWidgetComponent } from '@templates/user-widget/user-widget.component';
import { toastAlert } from '@utilities/toastAlert.utils';
import { GcPayService } from '../../services/gcpay.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { SeleccionarFacturasComponent } from './seleccionar-facturas/seleccionar-facturas.component';

@Component({
  selector: 'app-pagar-facturas',
  standalone: true,
  imports: [
    SeleccionarFacturasComponent,
    CheckoutComponent,
    UserWidgetComponent,
  ],
  templateUrl: './pagar-facturas.component.html',
  styleUrl: './pagar-facturas.component.scss',
})
export class PagarFacturasComponent {
  private gcPayService: GcPayService = inject(GcPayService);

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
