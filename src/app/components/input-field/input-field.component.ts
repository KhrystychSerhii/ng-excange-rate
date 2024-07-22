import {
  AfterContentInit, AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostBinding,
  Input, QueryList, ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';


import {get} from "../../libs/helpers";


@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss'
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input('id') id: string = '';
  @Input('label') label: string = '';
  @Input('error') error: string = '';

  @ViewChild('prefixWrapper') prefixWrapper: ElementRef = new ElementRef(null);
  @ViewChild('suffixWrapper') suffixWrapper: ElementRef = new ElementRef(null);

  @HostBinding('class.has-prefix') get hasPrefixIcon() {
    this.cdr.detectChanges();
    return !this.isEmpty(this.prefixWrapper);
  };
  @HostBinding('class.has-suffix') get hasSuffixIcon() {
    this.cdr.detectChanges();
    return !this.isEmpty(this.suffixWrapper);
  };
  value: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  setValue(event: any) {
    const value = get(event, ['target', 'value'], '');
    if (value || value == 0) {
      this.value = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  private isEmpty(element: ElementRef): boolean {
    const length: number = get(element, ['nativeElement', 'children', 'length'], 0);
    return length === 0;
  }
}
