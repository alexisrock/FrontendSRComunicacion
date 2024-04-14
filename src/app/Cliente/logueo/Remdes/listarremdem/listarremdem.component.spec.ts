import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarremdemComponent } from './listarremdem.component';

describe('ListarremdemComponent', () => {
  let component: ListarremdemComponent;
  let fixture: ComponentFixture<ListarremdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarremdemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarremdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
