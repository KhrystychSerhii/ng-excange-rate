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
    {code: 'UAH', name: 'Hryvna'}
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
    this.currency.getList().subscribe((response) => {
      this.currencies = Object.values(response);
    });
  }

  onSubmit() {
    this.form.get('firstCurrency')?.disable();
  }
}
