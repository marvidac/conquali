import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipeListPage } from './equipe-list.page';

describe('EquipeListPage', () => {
  let component: EquipeListPage;
  let fixture: ComponentFixture<EquipeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
