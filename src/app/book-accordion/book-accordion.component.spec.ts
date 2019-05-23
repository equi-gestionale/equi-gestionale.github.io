import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAccordionComponent } from './book-accordion.component';

describe('BookAccordionComponent', () => {
  let component: BookAccordionComponent;
  let fixture: ComponentFixture<BookAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
