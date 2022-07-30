import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeparturesCardFavoriteComponent } from './departures-card-favorite.component';

describe('DeparturesCardFavoriteComponent', () => {
  let component: DeparturesCardFavoriteComponent;
  let fixture: ComponentFixture<DeparturesCardFavoriteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturesCardFavoriteComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturesCardFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
