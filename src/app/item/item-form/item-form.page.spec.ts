import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemFormPage } from './item-form.page';

describe('ItemFormPage', () => {
  let component: ItemFormPage;
  let fixture: ComponentFixture<ItemFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
