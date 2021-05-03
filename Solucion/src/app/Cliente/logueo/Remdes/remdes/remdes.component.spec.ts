import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemdesComponent } from './remdes.component';

describe('RemdesComponent', () => {
  let component: RemdesComponent;
  let fixture: ComponentFixture<RemdesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemdesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemdesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
