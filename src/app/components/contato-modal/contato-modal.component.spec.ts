import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContatoModalComponent } from './contato-modal.component';

describe('EditarContatoModalComponent', () => {
  let component: EditarContatoModalComponent;
  let fixture: ComponentFixture<EditarContatoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarContatoModalComponent]
    });
    fixture = TestBed.createComponent(EditarContatoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
