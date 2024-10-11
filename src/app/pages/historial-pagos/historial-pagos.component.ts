import { JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IReceipt } from '@interfaces/pagar-facturas.interface';
import { GcPayService } from '@services/gcpay.service';
import { LoaderComponent } from '@templates/loader/loader.component';
import { SearchBarComponent } from '@templates/search-bar/search-bar.component';
import { UserWidgetComponent } from '@templates/user-widget/user-widget.component';
import { initFlowbite } from 'flowbite';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';

@Component({
  selector: 'app-historial-pagos',
  standalone: true,
  imports: [
    FormatNumberPipe,
    UserWidgetComponent,
    LoaderComponent,
    NgClass,
    JsonPipe,
    SearchBarComponent,
  ],
  templateUrl: './historial-pagos.component.html',
  styleUrl: './historial-pagos.component.scss',
})
export class HistorialPagosComponent implements OnInit {
  isLoading = true;
  // private gcPayService: GcPayService = inject(GcPayService);
  gcPayService: GcPayService = inject(GcPayService);

  public payments: IReceipt[] = [];

  paymentsToFilter: IReceipt[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    initFlowbite();
    this.gcPayService.getHistory().subscribe((data) => {
      this.payments = data.datos;
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/comprobante'], { queryParams: { id } });
  }

  filterBy(searchInput: HTMLInputElement) {
    this.cleanFilter();

    const cleanValue = searchInput.value.trim().toLocaleLowerCase();

    if (cleanValue) {
      this.payments = this.paymentsToFilter.filter((p) =>
        p.tr_wompi.toLowerCase().includes(cleanValue)
      );
    } else {
      this.payments = this.paymentsToFilter;
      this.paymentsToFilter = [];
    }
  }

  filterByState(state: string) {
    this.cleanFilter();

    if (state) {
      this.payments = this.paymentsToFilter.filter((p) =>
        p.estado.toLowerCase().includes(state)
      );
    }
  }

  cleanFilter() {
    this.paymentsToFilter.length
      ? null
      : (this.paymentsToFilter = [...this.payments]);
  }
}
