import { Modal, ModalInterface } from 'flowbite';

export class flowbiteUtilities {
   static openModal(id: string) {
      const modal: ModalInterface = new Modal(
         document.querySelector(id)! as HTMLElement,
      );
      modal.show();
   }

   static closeModal(id: string) {
      const modal: ModalInterface = new Modal(
         document.querySelector(id)! as HTMLElement,
      );
      modal.hide();
   }
}
