import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNavonaComponent } from './ngx-navona.component';

describe('NgxNavonaComponent', () => {
  let component: NgxNavonaComponent;
  let fixture: ComponentFixture<NgxNavonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNavonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNavonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
