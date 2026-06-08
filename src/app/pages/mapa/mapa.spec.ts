import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAprendizajeComponent } from './mapa';

describe('Mapa', () => {
  let component: MapaAprendizajeComponent;
  let fixture: ComponentFixture<MapaAprendizajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaAprendizajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAprendizajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
