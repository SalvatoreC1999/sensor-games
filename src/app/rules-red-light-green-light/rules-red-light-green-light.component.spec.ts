import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesRedLightGreenLightComponent } from './rules-red-light-green-light.component';

describe('RulesComponent', () => {
  let component: RulesRedLightGreenLightComponent;
  let fixture: ComponentFixture<RulesRedLightGreenLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesRedLightGreenLightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesRedLightGreenLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
