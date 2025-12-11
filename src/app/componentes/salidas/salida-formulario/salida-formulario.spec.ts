import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaFormulario } from './salida-formulario';

describe('SalidaFormulario', () => {
  let component: SalidaFormulario;
  let fixture: ComponentFixture<SalidaFormulario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalidaFormulario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalidaFormulario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
