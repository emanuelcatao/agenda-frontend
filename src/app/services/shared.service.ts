import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshContatos = new Subject<Contato>();
  refreshContatosObservable$ = this.refreshContatos.asObservable();

  constructor() { }

  triggerRefreshContatos(contato: Contato) {
    this.refreshContatos.next(contato);
  }
}
