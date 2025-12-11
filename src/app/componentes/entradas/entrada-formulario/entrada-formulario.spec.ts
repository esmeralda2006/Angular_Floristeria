import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaFormulario } from './entrada-formulario';

describe('EntradaFormulario', () => {
  let component: EntradaFormulario;
  let fixture: ComponentFixture<EntradaFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntradaFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
