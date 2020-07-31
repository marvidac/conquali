import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoItemFormPage } from './inspecao-item-form.page';

describe('InspecaoItemFormPage', () => {
  let component: InspecaoItemFormPage;
  let fixture: ComponentFixture<InspecaoItemFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoItemFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoItemFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
