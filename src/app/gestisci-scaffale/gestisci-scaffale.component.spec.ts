import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestisciScaffaleComponent } from './gestisci-scaffale.component';

describe('GestisciScaffaleComponent', () => {
  let component: GestisciScaffaleComponent;
  let fixture: ComponentFixture<GestisciScaffaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestisciScaffaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestisciScaffaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
