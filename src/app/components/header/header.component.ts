import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
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
export class HeaderComponent implements OnInit {
  public loading: boolean = false;
  public rate: number = NaN;
  public currencies: Array<string> = environment.mainCurrencies;

  public basicCur: CurrencyType = 'UAH';
  public mainCurrencies: Array<CurrencyType> = ['EUR', 'USD'];

  constructor(
    private currency: CurrencyService
  ) {
  }

  ngOnInit() {

  }

}
