import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input, OnDestroy,
  Renderer2,
  ViewChild
} from "@angular/core";
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {InputFieldComponent} from "../input-field/input-field.component";

import {FilterPipe} from "../../pipes";

import {get} from "../../libs/helpers";


@Component({
  selector: 'app-select-field',
  standalone: true,
  imports: [
    InputFieldComponent,
    CommonModule,
    FormsModule,
    FilterPipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFieldComponent),
      multi: true
    }
  ],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss'
})
export class SelectFieldComponent implements ControlValueAccessor, AfterViewInit, OnDestroy  {
  @Input('id') id: string = '';
  @Input('label') label: string = '';
  @Input('value-key') valueKey: string = '';
  @Input('label-key') labelKey: string = '';
  @Input('items') items: Array<Object> = [];
  disabled: boolean = false;
  inputModel: string = '';
  listOpened: boolean = false;
  focused: boolean = false;

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target) && this.listOpened) {
      this.setValue(this.value);
    }
  }

  @ViewChild('listElement') listElement!: ElementRef;
  private observer!: MutationObserver;

  value: any = null;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  ngAfterViewInit() {
    this.observer = new MutationObserver(() => {
      if (this.listElement) {
        const value: number = get(this.listElement, ['nativeElement', 'children', '0', 'offsetHeight'], null);
        if (!!value) {
          this.elementRef.nativeElement.style.setProperty('--list-item-height', `${(value + 2) * 4}px`);
        }
        if (this.listOpened) {
          const element = this.elementRef.nativeElement.querySelector(`.selected`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });

    this.observer.observe(this.listElement.nativeElement, {
      attributes: true,
      childList: true,
      subtree: true
    });
  }

  setValue(event: any) {
    if (!event) {
      return;
    }
    const item: any = this.items.find((i: any) => i[this.valueKey].toLowerCase() === event.toLowerCase());
    if (!!item) {
      this.value = item[this.valueKey].toLowerCase();
      const value = get(item, [this.valueKey], '');
      const label = get(item, [this.labelKey], '');
      if (!!value) {
        this.onChange(value.toLowerCase());
        this.onTouched();
        this.toggleList(true, true);
      }

      if (!!label) {
        this.inputModel = label;
      }
    }

  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  writeValue(value: string): void {
    if (!value) {
      return;
    }
    const item = this.items.find((i: any) => i[this.valueKey].toLowerCase() === value.toLowerCase());
    if (!!item) {
      this.inputModel = get(item, [this.labelKey], '');
      this.value = get(item, [this.valueKey], '');
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleList(currentPos: boolean, skipUpdate: boolean = false): void {
    if (this.disabled) {
      return;
    }
    this.listOpened = !currentPos;
    if (this.listOpened) {
      this.inputModel = '';
    } else {
      if (!skipUpdate) {
        this.setValue(this.value);
      }
    }
  }

  focusIn(event: any) {
    this.focused = true;
    this.toggleList(!this.focused);
  }

  isSameKey(itemValue: string, value: string): boolean {
    if (!value) {
      return false;
    }
    return itemValue.toLowerCase() === value.toLowerCase();
  }
}
