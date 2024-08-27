import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SensorDataComponent} from "./sensor-data/sensor-data.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SensorDataComponent, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-mbed-app';
}
