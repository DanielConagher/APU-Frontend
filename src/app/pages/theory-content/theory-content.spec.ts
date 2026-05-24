import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheoryContentComponent } from './theory-content';

describe('TheoryContent', () => {
  let component: TheoryContentComponent;
  let fixture: ComponentFixture<TheoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
