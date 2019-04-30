import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertButtonsComponent } from './insert-buttons.component';

describe('InsertButtonsComponent', () => {
  let component: InsertButtonsComponent;
  let fixture: ComponentFixture<InsertButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
