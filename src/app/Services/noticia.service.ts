import { Injectable, signal, inject, PLATFORM_ID, afterNextRender } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Noticia } from '../Models/noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  
  private generarImagenAleatoriaUrl(): string {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/600/400.jpg`;
  }

  private noticiasSignal = signal<Noticia[]>([
    {
      id: 1,
      titulo: 'Noticia de Prueba',
      autor: 'Admin',
      imagenUrl: this.generarImagenAleatoriaUrl(), 
      contenido: 'Esta es una noticia de ejemplo inicial.'
    }
  ]);

  noticias = this.noticiasSignal.asReadonly();

  constructor() {
    afterNextRender(() => {
      const guardadas = localStorage.getItem('noticias');
      if (guardadas) {
        try {
          this.noticiasSignal.set(JSON.parse(guardadas));
        } catch (e) {
          console.error('Error al parsear localStorage', e);
        }
      }
    });
  }

  agregarNoticia(nuevaNoticia: Omit<Noticia, 'id'>): void {
    const noticiaCompleta: Noticia = {
      ...nuevaNoticia,
      id: Date.now()
    };
    
    this.noticiasSignal.update(lista => {
      const nuevaLista = [...lista, noticiaCompleta];
      if (this.isBrowser) {
        localStorage.setItem('noticias', JSON.stringify(nuevaLista));
      }
      return nuevaLista;
    });
  }

  eliminarNoticia(id: number): void {
    this.noticiasSignal.update(lista => {
      const nuevaLista = lista.filter(n => n.id !== id);
      if (this.isBrowser) {
        localStorage.setItem('noticias', JSON.stringify(nuevaLista));
      }
      return nuevaLista;
    });
  }

  obtenerPorId(id: number): Noticia | undefined {
    return this.noticiasSignal().find(n => n.id === id);
  }

  actualizarNoticia(noticiaActualizada: Noticia): void {
    this.noticiasSignal.update(lista =>
      lista.map(n => n.id === noticiaActualizada.id ? noticiaActualizada : n)
    );
    if (this.isBrowser && typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('noticias', JSON.stringify(this.noticiasSignal()));
    }
  }
}