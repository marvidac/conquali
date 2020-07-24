import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EquipeFormPage } from './equipe-form.page';

describe('EquipeFormPage', () => {
  let component: EquipeFormPage;
  let fixture: ComponentFixture<EquipeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EquipeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
