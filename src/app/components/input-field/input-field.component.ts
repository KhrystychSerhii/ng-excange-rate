import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  forwardRef,
  HostBinding,
  Input, QueryList, ViewChild
} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';


import {get} from "../../libs/helpers";

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
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
export class InputFieldComponent implements ControlValueAccessor, AfterViewInit {
  @Input('id') id: string = '';
  @Input('label') label: string = '';
  @Input('error') error: string = '';

  @ViewChild('prefixWrapper') prefixWrapper: ElementRef = new ElementRef(null);
  @ViewChild('suffixWrapper') suffixWrapper: ElementRef = new ElementRef(null);

  @ContentChildren('[prefix-icon]', { descendants: true }) prefixIcon1: QueryList<ElementRef> = new QueryList(false);
  @ContentChild('prefixIcon', { static: false }) prefixIcon: ElementRef = new ElementRef(null);
  @ContentChild('suffixIcon', { static: false }) suffixIcon: ElementRef = new ElementRef(null);

  @HostBinding('class.has-prefix') hasPrefixIcon = false;
  @HostBinding('class.has-suffix') hasSuffixIcon = false;
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  ngAfterViewInit() {
    console.log('Prefix Icon1:', this.prefixIcon1);
    console.log('Prefix Icon:', !!this.prefixIcon);
    console.log('Suffix Icon:', this.suffixIcon);
    this.hasPrefixIcon = !!this.prefixIcon;
    this.hasSuffixIcon = !!this.suffixIcon;
    console.log('this.prefixWrapper', this.isEmpty(this.prefixWrapper));
    console.log('this.suffixWrapper', this.isEmpty(this.suffixWrapper));
  }

  setValue(event: any) {
    const value = get(event, ['target', 'value'], '');
    console.log("!!!", value)
    if (value || value == 0) {
      this.value = value;
      this.onChange(value);
      this.onTouched();
    }
  }

  writeValue(value: string): void {
    console.log('write value', value);
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Дополнительный метод для обработки состояния disabled
  }

  private isEmpty(element: ElementRef): boolean {
    console.log('element.nativeElement.children.length', element.nativeElement.children.length)
    return false;
  }
}
