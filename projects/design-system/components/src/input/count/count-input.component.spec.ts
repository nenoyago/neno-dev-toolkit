import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountInputComponent } from './count-input.component';

describe('CountInputComponent', () => {
  let component: CountInputComponent;
  let fixture: ComponentFixture<CountInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CountInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
