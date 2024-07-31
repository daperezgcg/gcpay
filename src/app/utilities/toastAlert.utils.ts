import Swal, { SweetAlertIcon } from 'sweetalert2';

export class toastAlert {
   static fireAlert(type: SweetAlertIcon, message: string) {
      const Toast = Swal.mixin({
         toast: true,
         position: 'bottom-end',
         showConfirmButton: false,
         timer: 3000,
         timerProgressBar: true,

         didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
         },
      });

      Toast.fire({
         icon: type,
         title: message,
      });
   }
}
