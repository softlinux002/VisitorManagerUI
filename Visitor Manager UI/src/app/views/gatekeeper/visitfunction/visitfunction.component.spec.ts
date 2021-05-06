import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitfunctionComponent } from './visitfunction.component';

describe('VisitfunctionComponent', () => {
  let component: VisitfunctionComponent;
  let fixture: ComponentFixture<VisitfunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitfunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitfunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
