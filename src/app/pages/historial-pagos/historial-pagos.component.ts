import { JsonPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private gcPayService: GcPayService = inject(GcPayService);
  public payments: any[] = [];
  public classStatus: Record<string, string> = {
    Rechazado: 'bg-red-500/25 text-red-500',
    Anulado: 'bg-red-500/25 text-red-500',
    Aprobado: 'bg-green-500/25 text-green-500',
    'En espera': 'bg-blue-500/25 text-blue-500',
  };
  constructor(private router: Router) {}

  ngOnInit() {
    initFlowbite();
    this.gcPayService.getHistory().subscribe((data) => {
      this.payments = data.datos;
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/soporte'], { queryParams: { id } });
  }
}
