import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { IBill } from '@interfaces/pagar-facturas.interface';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayService } from '@services/gcpay.service';
import { flowbiteUtilities } from '@utilities/flowbite.utils';
import { toastAlert } from '@utilities/toastAlert.utils';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-modal-pay',
  standalone: true,
  imports: [FormatNumberPipe],
  templateUrl: './modal-pay.component.html',
  styleUrl: './modal-pay.component.scss',
})
export class ModalPayComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
  @Input()
  public bills: IBill[] = [];
  @Input()
  public discounts: IBill[] = [];
  @Input()
  public total: number = 0;

  private gcPayService: GcPayService = inject(GcPayService);
  @Output()
  private emitFn: EventEmitter<string> = new EventEmitter();

  payBills() {
    if (this.bills.length) {
      if (!this.total) return;

      const bills = [...this.bills, ...this.discounts].map((data) => {
        return data.nro_factura + '-' + data.tipo_documento;
      });

      this.gcPayService.payBills(this.total, bills).subscribe((data) => {
        window.open(data.enlace);
        // window.location.href = data.enlace;

        this.emitFn.emit(data.id);
      });

      flowbiteUtilities.closeModal('#pay-modal');

      flowbiteUtilities.openModal('#loading-modal');
    } else {
      toastAlert.fireAlert(
        'error',
        'Por favor, selecciona una o más facturas para continuar'
      );
      flowbiteUtilities.closeModal('#pay-modal');
    }
  }

  closePayModal() {
    flowbiteUtilities.closeModal('#pay-modal');
  }
}
