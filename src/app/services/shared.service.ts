import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root' //pode ser injetado em qualquer lugar da aplicação
})
export class SharedService {

  private refreshContatos = new Subject<Contato>(); //quem quiser receber o contato precisa se inscrever
  refreshContatosObservable$ = this.refreshContatos.asObservable(); //o observable é o que vai ser retornado para quem se inscrever

  constructor() { }

  triggerRefreshContatos(contato: Contato) {
    this.refreshContatos.next(contato); //todo mundo que estiver inscrito recebe o contato
  }
}
