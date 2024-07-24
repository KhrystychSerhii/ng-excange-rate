import {Component, Input} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {CurrencyRate, CurrencyService} from "../../services";

import {InputFieldComponent} from "../input-field/input-field.component";
import {SelectFieldComponent} from "../select-field/select-field.component";

import {FilterPipe} from "../../pipes";

import {get} from "../../libs/helpers";


@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [
    InputFieldComponent,
    SelectFieldComponent,
    ReactiveFormsModule,
    FilterPipe,
  ],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.scss'
})
export class ExchangeFormComponent {
  @Input('currencies') currencies: Array<Object> = [];
  form: FormGroup;

  lastChangedField: string = '';

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.form = this.getFormGroup();

    this.form.valueChanges.subscribe(value => {
      console.log('this.lastChangedField', this.lastChangedField);
      console.log('value', value);
      this.onFieldChange(this.lastChangedField, value);
    });
  }

  ngOnInit() {
    this.subscribeToFieldChanges(this.form);
  }

  test(form: FormGroup) {
    console.log('form', form);
  }

  subscribeToFieldChanges(form: FormGroup) {
    Object.keys(form.controls).forEach((controlName: string) => {
      const control = form.get(controlName) as AbstractControl;
      control.valueChanges.subscribe(() => {
        this.lastChangedField = controlName;

      });
    });
  }


  onFieldChange(fieldName: string, values: Object) {

    const activeValue: number = get(values, [fieldName, 'value'], null);
    const activeCurrency: string = get(values, [fieldName, 'currency'], null);
    const secondaryFormGroupNames: Array<string> = Object
      .keys(this.form.value) // ['one', 'two']
      .filter((name: string) => name !== fieldName); // ['one']
    this.makeRequest(activeValue, activeCurrency, secondaryFormGroupNames);
  }

  filtered(currencies: Array<Object>, code?: string): Array<Object> {
    if (!code) {
      return currencies;
    }
    return currencies.filter((item: any) => {
      const itemCode: string = get(item, ['code'], '');
      return itemCode.toLowerCase() !== code.toLowerCase();
    })
  }

  private makeRequest(value: number, currency: string, secondaryFormGroupNames: Array<string>) {
    const currencies: Array<string> = secondaryFormGroupNames
      .map((name: string) => get(this.form, ['value', name, 'currency'], ''))
      .filter((name: string) => !!name);

    this.currencyService.getCurrencyRate(currency, currencies)
      .subscribe((response: CurrencyRate) => {
        secondaryFormGroupNames
          .forEach((name: string): void => {


            const control: AbstractControl | null = this.form.get([name, 'value']) as AbstractControl;
            const code: string = get(this.form, ['value', name, 'currency'], '');
            const rate: number = get(response, [code, 'value'], null);
            if (control) {
              control.setValue(value * rate, { onlySelf: true });
            }
          });
      });
  }

  private getFormGroup(): FormGroup {
    return this.fb.group({
      base: this.fb.group({
        value: this.fb.control('', [Validators.required]),
        currency: ['UAH'],
      }),
      second: this.fb.group({
        value: this.fb.control('', [Validators.required]),
        currency: ['USD']
      })
    });

  }
}
