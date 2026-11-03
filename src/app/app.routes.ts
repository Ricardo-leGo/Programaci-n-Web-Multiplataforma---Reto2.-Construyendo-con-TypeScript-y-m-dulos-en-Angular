import { Routes } from '@angular/router'
import { Create } from './Pages/create/create'
import { Home } from './Pages/home/home';
import { Error404 } from './Pages/error404/error404';
import { Edit } from './Pages/edit/edit';


const urls:Routes = [
 {path:'', loadComponent:() => Home  }
,{path:'Create', loadComponent: () => Create}
,{path:'Edit/:id', loadComponent: () => Edit}
,{path:'**', loadComponent: () => Error404 }

]

export const routes: Routes = urls;
