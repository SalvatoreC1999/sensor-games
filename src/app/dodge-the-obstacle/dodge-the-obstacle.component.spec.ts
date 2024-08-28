import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodgeTheObstacleComponent } from './dodge-the-obstacle.component';

describe('DodgeTheObstacleComponent', () => {
  let component: DodgeTheObstacleComponent;
  let fixture: ComponentFixture<DodgeTheObstacleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DodgeTheObstacleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodgeTheObstacleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
