import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarouselComponent } from './add-carousel.component';

describe('AddCarouselComponent', () => {
  let component: AddCarouselComponent;
  let fixture: ComponentFixture<AddCarouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCarouselComponent]
    });
    fixture = TestBed.createComponent(AddCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
