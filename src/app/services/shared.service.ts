import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private refreshContatos = new Subject<void>();
  refreshContatosObservable$ = this.refreshContatos.asObservable();

  constructor() { }

  triggerRefreshContatos() {
    this.refreshContatos.next();
  }
}
