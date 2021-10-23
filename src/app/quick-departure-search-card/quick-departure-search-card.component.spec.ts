import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuickDepartureSearchCardComponent } from './quick-departure-search-card.component';

describe('QuickDepartureSearchCardComponent', () => {
  let component: QuickDepartureSearchCardComponent;
  let fixture: ComponentFixture<QuickDepartureSearchCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickDepartureSearchCardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuickDepartureSearchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
