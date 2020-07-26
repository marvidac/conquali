import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoListPage } from './inspecao-list.page';

describe('InspecaoListPage', () => {
  let component: InspecaoListPage;
  let fixture: ComponentFixture<InspecaoListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
