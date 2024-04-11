import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  OnChanges,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user = '';
  constructor() {}
  // ngOnInit(): void {
  //   const data = localStorage.getItem('user_info') as string;
  //   this.user = data ? JSON.parse(data).username : null;
  // }
  logout() {
    localStorage.removeItem('user_info');
    window.location.reload();
  }
  ngOnInit(): void {
    const data = localStorage.getItem('user_info');
    this.user = data ? JSON.parse(data).username : null;
  }
}
