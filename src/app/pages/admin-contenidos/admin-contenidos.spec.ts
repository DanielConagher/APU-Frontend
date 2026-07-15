import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContenidos } from './admin-contenidos';

describe('AdminContenidos', () => {
  let component: AdminContenidos;
  let fixture: ComponentFixture<AdminContenidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContenidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContenidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
