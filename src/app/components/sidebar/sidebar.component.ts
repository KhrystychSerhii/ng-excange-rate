import {Component, Output, OnInit, Input, HostBinding, EventEmitter} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavigationEnd, Router, RouterModule} from "@angular/router";
import {filter} from "rxjs";


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input('is-opened') isOpened: boolean = false;
  @Output('close') close: EventEmitter<any> = new EventEmitter<void>();
  @HostBinding('class.opened') get opened(): boolean {
    return this.isOpened;
  }
  @HostBinding('class.closed') get closed(): boolean {
    return !this.isOpened;
  }
  routes: Array<{ path: string; label: string }> = [];

  constructor(
    private router: Router,
  ) {


  }


  ngOnInit() {
    this.routes = this.getRoutes();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.close.emit();
      });
  }

  private getRoutes(): Array<{ path: string, label: string }> {
    return [
      { path: '/exchange', label: 'Exchange' },
      { path: '/about', label: 'About' },
    ];
  }
}
