import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InserisciComponent } from './inserisci.component';

describe('InserisciComponent', () => {
  let component: InserisciComponent;
  let fixture: ComponentFixture<InserisciComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InserisciComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InserisciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
