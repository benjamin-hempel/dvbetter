import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeparturesCardQuickSearchComponent } from './departures-card-quick-search.component';

describe('DeparturesCardQuickSearchComponent', () => {
  let component: DeparturesCardQuickSearchComponent;
  let fixture: ComponentFixture<DeparturesCardQuickSearchComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeparturesCardQuickSearchComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeparturesCardQuickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
