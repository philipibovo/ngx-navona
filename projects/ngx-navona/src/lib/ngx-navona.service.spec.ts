import { TestBed } from '@angular/core/testing';

import { NgxNavonaService } from './ngx-navona.service';

describe('NgxNavonaService', () => {
  let service: NgxNavonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNavonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
