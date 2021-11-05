import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCustomTourComponent } from './ngx-custom-tour.component';

describe('NgxCustomTourComponent', () => {
  let component: NgxCustomTourComponent;
  let fixture: ComponentFixture<NgxCustomTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxCustomTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCustomTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
