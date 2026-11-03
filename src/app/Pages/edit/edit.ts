import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateForm } from '../../Components/create-form/create-form'; 
import { Noticia } from '../../Models/noticia';
import { NoticiaService } from '../../Services/noticia.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    CreateForm, 
    RouterLink
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private noticiaService = inject(NoticiaService);

  noticiaAEditar?: Noticia;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.noticiaAEditar = this.noticiaService.obtenerPorId(id);
    }
  }

  
  handleEditarNoticia(noticia: any): void {
    this.noticiaService.actualizarNoticia(noticia as Noticia);
    this.router.navigate(['/']);
  }
}