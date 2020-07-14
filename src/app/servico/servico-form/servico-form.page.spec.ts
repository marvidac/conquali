import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ServicoFormPage } from './servico-form.page';

describe('ServicoFormPage', () => {
  let component: ServicoFormPage;
  let fixture: ComponentFixture<ServicoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ServicoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
