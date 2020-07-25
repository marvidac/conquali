import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocalFormPage } from './local-form.page';

describe('LocalFormPage', () => {
  let component: LocalFormPage;
  let fixture: ComponentFixture<LocalFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocalFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
