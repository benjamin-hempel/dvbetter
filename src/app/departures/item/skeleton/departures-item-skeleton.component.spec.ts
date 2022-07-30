import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeparturesItemSkeletonComponent } from './departures-item-skeleton.component';

describe('DeparturesItemSkeletonComponent', () => {
  let component: DeparturesItemSkeletonComponent;
  let fixture: ComponentFixture<DeparturesItemSkeletonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturesItemSkeletonComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturesItemSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
