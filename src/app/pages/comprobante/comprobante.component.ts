import { JsonPipe, NgSwitch } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { IReceipt } from '@interfaces/pagar-facturas.interface';
import { FormatNumberPipe } from '@pipes/format-number.pipe';
import { GcPayServiceTest } from '@services/gcpay-test.service';
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
  ],
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss',
})
export class comprobanteComponent {
  gcPayService: GcPayServiceTest = inject(GcPayServiceTest);
  id: string = '';
  env: string = '';
  filename: string = '';

  public paymentHistory: IReceipt[] = [
    {
      tr_id: '121',
      tr_wompi: '44545452121',
      tr_valor: 13123123,
      tr_fecha: '12/31/24',
      estado: 'En espera',
      facturas: [
        {
          numeroFactura: 123123,
          tipoFactura: 1231231,
          monto: 1231321,
        },
        {
          numeroFactura: 654321,
          tipoFactura: 7890,
          monto: 2312311,
        },
        {
          numeroFactura: 987654,
          tipoFactura: 2345678,
          monto: 812312,
        },
      ],
    },
    {
      tr_id: '122',
      tr_wompi: '13123154sd',
      tr_valor: 54353453,
      tr_fecha: '32/14/54',
      estado: 'Exito',
      facturas: [
        {
          numeroFactura: 987654,
          tipoFactura: 4321,
          monto: 876543,
        },
        {
          numeroFactura: 567890,
          tipoFactura: 7654,
          monto: 1234567,
        },
        {
          numeroFactura: 234567,
          tipoFactura: 8765,
          monto: 345678,
        },
      ],
    },
    {
      tr_id: '122',
      tr_wompi: '87845121264',
      tr_valor: 54353453,
      tr_fecha: '32/14/54',
      estado: 'Error',
      facturas: [
        {
          numeroFactura: 555555,
          tipoFactura: 1111,
          monto: 654321,
        },
        {
          numeroFactura: 111222,
          tipoFactura: 333444,
          monto: 456789,
        },
        {
          numeroFactura: 987654,
          tipoFactura: 654321,
          monto: 321123,
        },
      ],
    },
    {
      tr_id: '123',
      tr_wompi: '1100614-1727794694-24235',
      tr_valor: 1124487,
      tr_fecha: '12/54/69',
      estado: 'En espera',
      facturas: [
        {
          numeroFactura: 123456,
          tipoFactura: 7890,
          monto: 987654,
        },
        {
          numeroFactura: 987321,
          tipoFactura: 654987,
          monto: 456123,
        },
        {
          numeroFactura: 654987,
          tipoFactura: 123987,
          monto: 234567,
        },
        {
          numeroFactura: 987321,
          tipoFactura: 654987,
          monto: 456123,
        },
        {
          numeroFactura: 123456,
          tipoFactura: 7890,
          monto: 987654,
        },
      ],
    },
  ];

  public receipt: IReceipt = {
    tr_id: '121',

    tr_wompi: '',
    tr_valor: 0,
    tr_fecha: '',
    estado: '',
    facturas: [
      {
        numeroFactura: 0,
        tipoFactura: 0,
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

  findIndex(id: string): any {
    const index = this.paymentHistory.findIndex(
      (payment) => payment.tr_id === id
    );

    return index;
  }

  // createReceipt(id: string) {
  //   this.gcPayService.getReceiptBill(id).subscribe({
  //     next: (data) => {
  //       console.log(data);

  //       const index = this.findIndex(id);

  //       if (index === -1 || index === null) {
  //         this.isLoading = false;
  //         this.hasError = true;
  //         return;
  //       } else {
  //         if (data && data.datos) {
  //           this.receipt = this.paymentHistory[index];
  //           console.log(this.receipt);
  //         } else {
  //           toastAlert.fireAlert('error', 'Datos no disponibles.');
  //           this.hasError = true;
  //         }
  //         this.isLoading = false;
  //       }
  //     },
  //     error: (err) => {
  //       toastAlert.fireAlert('error', err);

  //       this.isLoading = false;
  //       this.hasError = true;
  //     },
  //   });
  // }

  createReceipt(id: string) {
    this.gcPayService.getReceiptBill(id).subscribe({
      next: (data) => {
        console.log(data);

        console.log(id);

        const index = this.findIndex(id);
        console.log(index);

        // Si no encuentra el índice, maneja el error de inmediato
        if (index === -1 || index === null) {
          this.handleError('Factura no encontrada.');
          return;
        }

        // Si los datos no son válidos
        if (!data?.datos) {
          this.handleError('Datos no disponibles.');
          return;
        }

        // Asigna el recibo y desactiva el indicador de carga
        this.receipt = this.paymentHistory[index];
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
      console.log(contentHeight, 'content');
      console.log(imgHeight, 'img');

      const pdfWidth = 170;
      const pdfHeight = imgHeight + 60;
      const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
      console.log([pdfWidth, pdfHeight]);

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
}
