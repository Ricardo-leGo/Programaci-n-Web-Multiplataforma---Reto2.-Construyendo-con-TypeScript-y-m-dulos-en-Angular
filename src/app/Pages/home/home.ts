import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListForm } from '../../Components/list-form/list-form';
import { JsonView } from '../../Components/json-view/json-view';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ListForm
    ,RouterLink 
    ,JsonView
],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}