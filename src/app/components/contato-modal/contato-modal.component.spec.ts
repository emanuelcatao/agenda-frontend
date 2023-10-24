import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoModalComponent } from './contato-modal.component';

//melhorar o teste
//criar teste para as funções
describe('ContatoModalComponent', () => {
  let component: ContatoModalComponent;
  let fixture: ComponentFixture<ContatoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContatoModalComponent]
    });
    fixture = TestBed.createComponent(ContatoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
