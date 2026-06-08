import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MochilaEmergencia } from './mochila-emergencia';

describe('MochilaEmergencia', () => {
  let component: MochilaEmergencia;
  let fixture: ComponentFixture<MochilaEmergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MochilaEmergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MochilaEmergencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
