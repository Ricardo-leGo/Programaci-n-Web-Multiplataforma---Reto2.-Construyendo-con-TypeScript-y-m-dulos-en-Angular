import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Noticia } from '../../Models/noticia';

@Component({
  selector: 'app-create-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-form.html',
  styleUrl: './create-form.css'
})
export class CreateForm implements OnInit, OnChanges {
  @Input() noticiaAEditar?: Noticia;
  @Output() onSubmitNoticia = new EventEmitter<Omit<Noticia, 'id'> | Noticia>();

  noticiaForm: FormGroup;

  private urlImagenRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?.*$/i;

  constructor(private fb: FormBuilder) {
    this.noticiaForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      contenido: ['', [Validators.required, Validators.minLength(10)]],
      imagenUrl: ['', [Validators.required, Validators.pattern(this.urlImagenRegex)]],
      autor: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)]]
    });
  }

  ngOnInit(): void {
    if (this.noticiaAEditar) {
      this.cargarDatosSiExiste();
    } else {
      this.generarImagenAleatoria();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noticiaAEditar'] && this.noticiaAEditar) {
      this.cargarDatosSiExiste();
    }
  }

  private cargarDatosSiExiste(): void {
    if (this.noticiaAEditar) {
      this.noticiaForm.patchValue(this.noticiaAEditar);
    }
  }

  generarImagenAleatoria(): void {
    const randomId = Math.floor(Math.random() * 1000);
    const urlAleatoria = `https://picsum.photos/id/${randomId}/600/400.jpg`;
    
    this.noticiaForm.patchValue({
      imagenUrl: urlAleatoria
    });
    this.noticiaForm.get('imagenUrl')?.markAsTouched();
  }

  guardarNoticia(): void {
    if (this.noticiaForm.valid) {
      const datos = this.noticiaAEditar 
        ? { ...this.noticiaForm.value, id: this.noticiaAEditar.id }
        : this.noticiaForm.value;

      this.onSubmitNoticia.emit(datos);
    } else {
      this.noticiaForm.markAllAsTouched();
    }
  }
}