import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistanceMatchComponent } from './distance-match.component';

describe('SensorDataComponent', () => {
  let component: DistanceMatchComponent;
  let fixture: ComponentFixture<DistanceMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistanceMatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistanceMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
