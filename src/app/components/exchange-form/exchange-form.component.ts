import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

import {CurrencyRate, CurrencyService} from "../../services";

import {InputFieldComponent} from "../input-field/input-field.component";
import {SelectFieldComponent} from "../select-field/select-field.component";

import {FilterPipe} from "../../pipes";

import {get} from "../../libs/helpers";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    SelectFieldComponent,
    ReactiveFormsModule,
    FilterPipe,
  ],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.scss'
})
export class ExchangeFormComponent implements OnInit, OnDestroy {
  @Input('currencies') currencies: Array<Object> = [];
  form: FormGroup = new FormGroup<any>({});
  loading: boolean = false;
  error: string = '';
  private destroyed$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {}

  ngOnInit() {
    this.form = this.getFormGroup();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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

  private makeRequest(value: any, active: 'base' | 'second'): void {
    const secondaryFormNames: Array<string> = Object.keys(value)
      .filter((name: string) => name !== active);
    const currencies: Array<string> = secondaryFormNames
      .map((name: string) => get(value, [name, 'currency'], ''));

    const currency = get(value, [active, 'currency'], '');
    if (!!currency && currencies.length > 0) {
      this.currencyService.getCurrencyRate(currency, currencies)
        .subscribe({
          next: (response: CurrencyRate) => {
            secondaryFormNames
              .forEach((name: string): void => {

                const v: number = get(value, [active, 'value'], null);
                const control: FormControl | null = this.form.get([name, 'value']) as FormControl;
                const code: string = get(value, [name, 'currency'], '');
                const rate: number = get(response, [code, 'value'], null);

                if (control && rate) {
                  control.setValue(v * rate, { onlySelf: true });
                }
              });
          },
          error: (error: HttpErrorResponse) => {
            this.loading = false;
            this.error = get(error, ['error', 'message'], '');


          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }

  private getFormGroup(): FormGroup {
    const baseValueFormControl: FormControl = this.fb.control('', [Validators.required]);
    const secondaryValueFormControl: FormControl = this.fb.control('', [Validators.required]);
    const baseCurrencyFormControl: FormControl = this.fb.control('UAH', []); // can be received from .env
    const secondaryCurrencyFormControl: FormControl = this.fb.control('USD', []); // can be received from .env

    const controls: Array<{ formName: 'second' | 'base'; fieldName: string; control: FormControl; }> = [
      { formName: 'base', fieldName: 'value', control: baseValueFormControl },
      { formName: 'base', fieldName: 'currency', control: baseCurrencyFormControl },

      { formName: 'second', fieldName: 'value', control: secondaryValueFormControl },
      { formName: 'second', fieldName: 'currency', control: secondaryCurrencyFormControl },
    ];

    controls.forEach(({ formName, fieldName, control}) => {
      control.valueChanges
        .pipe(
          debounceTime(500),
          takeUntil(this.destroyed$)
        )
        .subscribe((value: string) => {
          this.makeRequest(this.form.value, formName);
        });
    });
    return this.fb.group({
      base: this.fb.group({
        value: baseValueFormControl,
        currency: baseCurrencyFormControl,
      }),
      second: this.fb.group({
        value: secondaryValueFormControl,
        currency: secondaryCurrencyFormControl
      })
    });

  }
}
