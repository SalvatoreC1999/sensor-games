import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";
import {Button} from "primeng/button";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,Button
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {
  }
  goHome() {
    this.router.navigateByUrl('');
  }
}
