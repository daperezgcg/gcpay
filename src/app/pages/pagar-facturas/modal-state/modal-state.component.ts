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
            'https://lottie.host/embed/2bc92237-c527-484c-948e-dbb8d31ad496/Okh35utZSr.json',
         ),
         title: 'fin tiempo espera',
         description:
            'Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu ',
      },
      '1': {
         src: this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://lottie.host/embed/2bc92237-c527-484c-948e-dbb8d31ad496/Okh35utZSr.json',
         ),
         title: 'Aprobado',
         description:
            'Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu ',
      },
      '2': {
         src: this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://lottie.host/embed/2bc92237-c527-484c-948e-dbb8d31ad496/Okh35utZSr.json',
         ),
         title: 'Rechazado',
         description:
            'Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu ',
      },
      '3': {
         src: this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://lottie.host/embed/2bc92237-c527-484c-948e-dbb8d31ad496/Okh35utZSr.json',
         ),
         title: 'Anulado',
         description:
            'Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu ',
      },
      '4': {
         src: this.sanitizer.bypassSecurityTrustResourceUrl(
            'https://lottie.host/embed/2bc92237-c527-484c-948e-dbb8d31ad496/Okh35utZSr.json',
         ),
         title: 'Error',
         description:
            'Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu Lrem impsu ',
      },
   };

   constructor(private sanitizer: DomSanitizer) {}
}
