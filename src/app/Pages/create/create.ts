import { Component, inject } from '@angular/core';
import { CreateForm } from '../../Components/create-form/create-form';
import { ListForm } from '../../Components/list-form/list-form';
import { Noticia } from '../../Models/noticia';
import { NoticiaService } from '../../Services/noticia.service';
import { RouterLink } from '@angular/router';
import { JsonView } from '../../Components/json-view/json-view';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CreateForm,
    ListForm,
    RouterLink,
    JsonView
],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  private noticiaService = inject(NoticiaService);

  handleCreateNoticia(nuevaNoticia: Omit<Noticia, 'id'>): void {
    this.noticiaService.agregarNoticia(nuevaNoticia);
  }
}