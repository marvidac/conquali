import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FuncionarioFormPage } from './funcionario-form.page';

describe('FuncionarioFormPage', () => {
  let component: FuncionarioFormPage;
  let fixture: ComponentFixture<FuncionarioFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionarioFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FuncionarioFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
