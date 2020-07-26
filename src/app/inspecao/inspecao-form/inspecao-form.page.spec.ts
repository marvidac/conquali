import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoFormPage } from './inspecao-form.page';

describe('InspecaoFormPage', () => {
  let component: InspecaoFormPage;
  let fixture: ComponentFixture<InspecaoFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
