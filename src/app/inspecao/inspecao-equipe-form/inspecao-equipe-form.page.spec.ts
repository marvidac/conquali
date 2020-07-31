import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoEquipeFormPage } from './inspecao-equipe-form.page';

describe('InspecaoEquipeFormPage', () => {
  let component: InspecaoEquipeFormPage;
  let fixture: ComponentFixture<InspecaoEquipeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoEquipeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoEquipeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
