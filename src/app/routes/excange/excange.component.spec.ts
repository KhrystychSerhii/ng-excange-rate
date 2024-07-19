import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcangeComponent } from './excange.component';

describe('ExcangeComponent', () => {
  let component: ExcangeComponent;
  let fixture: ComponentFixture<ExcangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
