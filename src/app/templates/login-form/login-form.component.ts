import { Component } from '@angular/core';

@Component({
   selector: 'app-login-form',
   standalone: true,
   imports: [],
   templateUrl: './login-form.component.html',
   styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
   passwordToggle(input: HTMLInputElement, eyeIcon: HTMLElement) {
      input.type = input.type === 'text' ? 'password' : 'text';

      if (eyeIcon.classList.contains('fa-eye')) {
         eyeIcon.classList.remove('fa-eye');
         eyeIcon.classList.add('fa-eye-slash');
      } else {
         eyeIcon.classList.remove('fa-eye-slash');
         eyeIcon.classList.add('fa-eye');
      }
   }
}
