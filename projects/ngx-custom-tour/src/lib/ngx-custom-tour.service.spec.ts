import { TestBed } from '@angular/core/testing';

import { NgxCustomTourService } from './ngx-custom-tour.service';

describe('NgxCustomTourService', () => {
  let service: NgxCustomTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCustomTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
