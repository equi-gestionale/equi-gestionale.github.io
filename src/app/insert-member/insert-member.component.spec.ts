import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMemberComponent } from './insert-member.component';

describe('InsertMemberComponent', () => {
  let component: InsertMemberComponent;
  let fixture: ComponentFixture<InsertMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
