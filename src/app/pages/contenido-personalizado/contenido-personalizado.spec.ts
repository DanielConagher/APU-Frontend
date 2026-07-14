import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoPersonalizado } from './contenido-personalizado';

describe('ContenidoPersonalizado', () => {
  let component: ContenidoPersonalizado;
  let fixture: ComponentFixture<ContenidoPersonalizado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContenidoPersonalizado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoPersonalizado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
