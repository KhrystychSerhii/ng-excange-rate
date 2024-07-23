import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

import {InputFieldComponent} from "../../components";

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      customInput: ['asd']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
