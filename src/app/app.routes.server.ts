import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: 'Edit/:id',
    renderMode: RenderMode.Client 
  },
  {
    
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
