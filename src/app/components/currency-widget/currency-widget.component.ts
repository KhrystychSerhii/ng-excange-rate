import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

import {CurrencyType} from "../../services/currency/currency.types";


@Component({
  selector: 'app-currency-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-widget.component.html',
  styleUrl: './currency-widget.component.scss'
})
export class CurrencyWidgetComponent {
  @Input('value') value: number = NaN;
  @Input('type') type: CurrencyType = 'UAH'; // todo: get this value from env

}
