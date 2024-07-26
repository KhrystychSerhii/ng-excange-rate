import {AfterViewInit, Component, HostListener, Inject} from "@angular/core";
import { RouterOutlet } from '@angular/router';
import {DOCUMENT} from "@angular/common";

// component
import {CurrencyWidgetComponent, HeaderComponent, SidebarComponent, ButtonComponent} from "./components";

const COMPONENTS = [
  CurrencyWidgetComponent,
  HeaderComponent,
  SidebarComponent,
  ButtonComponent
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ...COMPONENTS],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title = 'ng-exchange-rate';
  sideBarOpened: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.writeElementHeightInStyles();
  }
  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngAfterViewInit() {
    this.writeElementHeightInStyles();
  }

  setSideBarOpened(value: boolean): void {
    this.sideBarOpened = value;
  }

  private writeElementHeightInStyles(): void {
    const viewportHeight: number = this.document.documentElement.clientHeight;
    const vh = viewportHeight / 100;
    const rootElement: HTMLElement = this.document.documentElement;
    rootElement.style.setProperty('--vh', `${vh}px`);
  }
}
