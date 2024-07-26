import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit} from "@angular/core";
import {CommonModule, DOCUMENT} from "@angular/common";
import {delay} from "rxjs";

import {CurrencyWidgetComponent} from "../currency-widget/currency-widget.component";
import {ButtonComponent} from "../button/button.component";

// services
import { CurrencyService, CurrencyType } from "../../services";

import { environment } from "../../../environments/environments";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyWidgetComponent,
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public loading: boolean = false;
  public basicCur: CurrencyType = environment.mainCurrency;
  public mainCurrencies: Array<CurrencyType> = ['EUR', 'USD'];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.writeElementHeightInStyles();
  }

  constructor(
    private currency: CurrencyService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.writeElementHeightInStyles();
  }


  private writeElementHeightInStyles(): void {
    const height: number = this.elementRef.nativeElement.offsetHeight;
    const rootElement: HTMLElement = this.document.documentElement;

    rootElement.style.setProperty('--header-height', `${height}px`);
  }
}
