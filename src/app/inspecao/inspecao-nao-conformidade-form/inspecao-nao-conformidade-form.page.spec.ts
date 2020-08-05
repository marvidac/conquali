import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoNaoConformidadeFormPage } from './inspecao-nao-conformidade-form.page';

describe('InspecaoNaoConformidadeFormPage', () => {
  let component: InspecaoNaoConformidadeFormPage;
  let fixture: ComponentFixture<InspecaoNaoConformidadeFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoNaoConformidadeFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoNaoConformidadeFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
