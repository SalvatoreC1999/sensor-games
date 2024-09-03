import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedLightGreenLightComponent } from './red-light-green-light.component';

describe('DodgeTheObstacleComponent', () => {
  let component: RedLightGreenLightComponent;
  let fixture: ComponentFixture<RedLightGreenLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedLightGreenLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedLightGreenLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
