import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaricaComponent } from './scarica.component';

describe('ScaricaComponent', () => {
  let component: ScaricaComponent;
  let fixture: ComponentFixture<ScaricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScaricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScaricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
