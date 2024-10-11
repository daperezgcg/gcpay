import { JsonPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toastAlert } from '@utilities/toastAlert.utils';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-soporte',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, JsonPipe],
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.scss',
})
export class SoporteComponent implements OnInit {
  contactForm: FormGroup;
  selectedFiles: File[] | null = null;

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      terminos: [false, Validators.requiredTrue],
      adjunto: ['', Validators.required],
    });
  }

  subirArchivo(input: HTMLInputElement): void {
    const files = input.files;

    if (files) {
      const validFiles: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Verificar el tipo de archivo
        if (file.type === 'image/jpeg' || file.type === 'application/pdf') {
          // Verificar el tamaño del archivo (máximo 2 MB)
          if (file.size <= 2 * 1024 * 1024) {
            validFiles.push(file);
          } else {
            toastAlert.fireAlert(
              'error',
              `El archivo ${file.name} supera el tamaño máximo de 2MB`
            );
          }
        } else {
          toastAlert.fireAlert(
            'error',
            `El archivo ${file.name} no es de un tipo permitido (solo JPG o PDF)`
          );
        }
      }

      this.selectedFiles = validFiles.length > 0 ? validFiles : null;
    }
  }

  removeFile(index: number) {
    this.selectedFiles!.splice(index, 1);
    console.log('archivo eliminado', this.selectedFiles);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value); // Muestra el valor del formulario si es válido
      toastAlert.fireAlert(
        'success',
        'Tu mensaje ha sido enviado correctamente'
      );
    } else {
      toastAlert.fireAlert(
        'error',
        'For favor diligencia el formulario correctamente'
      );
    }
  }
}
