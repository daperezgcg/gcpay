import { JsonPipe, NgClass, NgSwitch } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { IReceipt } from '@interfaces/pagar-facturas.interface';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayService } from '@services/gcpay.service';
import { LoaderComponent } from '@templates/loader/loader.component';
import { toastAlert } from '@utilities/toastAlert.utils';
import { initFlowbite } from 'flowbite';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-comprobante',
  standalone: true,
  imports: [
    JsonPipe,
    FormatNumberPipe,
    NgSwitch,
    LoaderComponent,
    RouterLink,
    RouterModule,
    NgClass,
  ],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss',
})
export class comprobanteComponent {
  gcPayService: GcPayService = inject(GcPayService);
  id: string = '';
  env: string = '';
  filename: string = '';

  public receipt: IReceipt = {
    tr_id: '',
    tr_wompi: '',
    tr_valor: 0,
    tr_fecha: '',
    estado: '',
    facturas: [
      {
        fac_numero: 0,
        tipo: 0,
        monto: 0,
      },
    ],
  };
  public isLoading: boolean = true;
  public hasError: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    initFlowbite();

    this.route.queryParams.subscribe((params) => {
      this.id = params['id'];

      this.createReceipt(this.id);
      this.filename = this.id;
    });
  }

  createReceipt(id: string) {
    this.gcPayService.getReceiptBill(id).subscribe({
      next: (response) => {
        console.log(response, 'response receipt');

        // Si los datos no son válidos
        if (!response || response.estado === 0) {
          this.handleError('Datos no disponibles.');
          return;
        }

        // Asigna el recibo y desactiva el indicador de carga
        this.receipt = response;
        this.isLoading = false;
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  handleError(message: string) {
    toastAlert.fireAlert('error', message);
    this.isLoading = false;
    this.hasError = true;
  }

  downloadSupport() {
    const data: HTMLElement = document.getElementById(
      'pdfContent'
    ) as HTMLElement;

    const contentHeight = data.offsetHeight / 3.779527559;
    html2canvas(data).then((canvas) => {
      const imgWidth = 150;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');
      // console.log(contentHeight, 'content');
      // console.log(imgHeight, 'img');

      const pdfWidth = 170;
      const pdfHeight = imgHeight + 60;
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      // console.log([pdfWidth, pdfHeight]);

      const positionY = 30;
      const positionX = (pdf.internal.pageSize.getWidth() - imgWidth) / 2;
      pdf.addImage(
        contentDataURL,
        'JPEG',
        positionX,
        positionY,
        imgWidth,
        imgHeight
      );
      pdf.save(this.id);
    });
  }

  printReceipt() {
    const printContent = document.getElementById('pdfContent')!.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();

    // Después de imprimir, recargar la página actual
    window.location.reload();
  }
}
