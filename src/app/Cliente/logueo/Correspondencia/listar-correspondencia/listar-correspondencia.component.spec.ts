import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCorrespondenciaComponent } from './listar-correspondencia.component';

describe('ListarCorrespondenciaComponent', () => {
  let component: ListarCorrespondenciaComponent;
  let fixture: ComponentFixture<ListarCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCorrespondenciaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
