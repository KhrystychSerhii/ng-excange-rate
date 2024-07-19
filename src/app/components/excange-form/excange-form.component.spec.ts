import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcangeFormComponent } from './excange-form.component';

describe('ExcangeFormComponent', () => {
  let component: ExcangeFormComponent;
  let fixture: ComponentFixture<ExcangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcangeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
