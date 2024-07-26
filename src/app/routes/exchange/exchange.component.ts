import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {ExchangeFormComponent, InputFieldComponent, SelectFieldComponent} from "../../components";

import {CurrencyService} from "../../services";

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, SelectFieldComponent, ExchangeFormComponent],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent implements OnInit {
  form: FormGroup;
  currencies: Array<Object> = [
    {code: 'EUR', name: 'Euro'},
    {code: 'USD', name: 'Dollar'},

    {code: 'GBP', name: 'Pound Sterling'},
    {code: 'JPY', name: 'Yen'},
    {code: 'AUD', name: 'Australian Dollar'},
    {code: 'CAD', name: 'Canadian Dollar'},
    {code: 'CHF', name: 'Swiss Franc'},
    {code: 'CNY', name: 'Yuan'},
    {code: 'SEK', name: 'Swedish Krona'},
    {code: 'NZD', name: 'New Zealand Dollar'},
    {code: 'MXN', name: 'Mexican Peso'},
    {code: 'SGD', name: 'Singapore Dollar'},
    {code: 'HKD', name: 'Hong Kong Dollar'},
    {code: 'NOK', name: 'Norwegian Krone'},
    {code: 'UAH', name: 'Hryvna'},
    {code: 'KRW', name: 'Won'},
    {code: 'TRY', name: 'Turkish Lira'},
    {code: 'INR', name: 'Indian Rupee'},
    {code: 'RUB', name: 'Russian Ruble'},
    {code: 'BRL', name: 'Brazilian Real'}
  ]; // main currencies

  constructor(
    private fb: FormBuilder,
    private currency: CurrencyService,
  ) {
    this.form = this.fb.group({
      firstValue: [],
      firstCurrency: ['uah']
    });
  }

  ngOnInit() {
   /* this.currency.getList().subscribe((response) => {
      this.currencies = Object.values(response);
      console.log('this.currencies', this.currencies)
    });*/
  }

  onSubmit() {
    this.form.get('firstCurrency')?.disable();
  }
}
