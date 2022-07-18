import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsRoadmapPackagePage } from './details-roadmap-package.page';

describe('DetailsRoadmapPackagePage', () => {
  let component: DetailsRoadmapPackagePage;
  let fixture: ComponentFixture<DetailsRoadmapPackagePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsRoadmapPackagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsRoadmapPackagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
