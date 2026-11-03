import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { NoticiaService } from '../../Services/noticia.service'; 

@Component({
  selector: 'app-json-view',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './json-view.html',
  styleUrl: './json-view.css'
})
export class JsonView {
  private noticiaService = inject(NoticiaService);

  noticias = this.noticiaService.noticias;
}