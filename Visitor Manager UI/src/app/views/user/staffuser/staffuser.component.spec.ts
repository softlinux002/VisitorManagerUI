import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffuserComponent } from './staffuser.component';

describe('StaffuserComponent', () => {
  let component: StaffuserComponent;
  let fixture: ComponentFixture<StaffuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
