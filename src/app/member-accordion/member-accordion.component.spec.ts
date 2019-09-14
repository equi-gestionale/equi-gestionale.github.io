import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAccordionComponent } from './member-accordion.component';

describe('MemberAccordionComponent', () => {
  let component: MemberAccordionComponent;
  let fixture: ComponentFixture<MemberAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
