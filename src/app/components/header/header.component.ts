import {Component, OnInit} from "@angular/core";
import {delay} from "rxjs";

// services
import { CurrencyService } from "../../services";

import { environment } from "../../../environments/environments";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public loading: boolean = false;
  public rate: number = NaN;
  public currencies: Array<string> = environment.mainCurrencies;

  constructor(
    private currency: CurrencyService
  ) {
  }

  ngOnInit() {
    this.updateRate();
  console.log('init header')
    this.currency.getList().subscribe((response) => {
      console.log('response', response);
    });
  }

  private updateRate(): void {
    this.loading = true;
    this.currency.getCurrentRate()
      .pipe(delay(150))
      .subscribe({
        next: (rate: number) => {
          this.rate = rate;
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
}
