import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InspecaoLocalFormPage } from './inspecao-local-form.page';

describe('InspecaoLocalFormPage', () => {
  let component: InspecaoLocalFormPage;
  let fixture: ComponentFixture<InspecaoLocalFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspecaoLocalFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InspecaoLocalFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
