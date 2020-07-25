import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalListPage } from './local-list.page';

describe('LocalListPage', () => {
  let component: LocalListPage;
  let fixture: ComponentFixture<LocalListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
