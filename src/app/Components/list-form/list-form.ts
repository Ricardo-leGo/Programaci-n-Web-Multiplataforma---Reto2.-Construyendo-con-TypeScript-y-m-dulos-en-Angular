import { Component, inject } from '@angular/core';
import {  RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoticiaService } from '../../Services/noticia.service';

@Component({
  selector: 'app-list-form',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrl: './list-form.css',
  templateUrl: './list-form.html',
})
export class ListForm {
  private noticiaService = inject(NoticiaService);

  noticias = this.noticiaService.noticias;

  eliminar(id: number): void {
    this.noticiaService.eliminarNoticia(id);
  }
}