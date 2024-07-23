import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';

// component
import {HeaderComponent, SidebarComponent, ButtonComponent} from "./components";

const COMPONENTS = [
  HeaderComponent, SidebarComponent, ButtonComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ng-exchange-rate';
  sideBarOpened: boolean = false;

  setSideBarOpened(value: boolean): void {
    console.log('toggleSideBar');
    this.sideBarOpened = value;
  }
}
