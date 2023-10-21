import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Contato } from '../models/contato.model';
import { DateTime } from 'luxon';


interface ApiResponse {
  content: Contato[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'https://bookish-umbrella-5r7xv46p575cx5r-8080.app.github.dev/api/v1/contatos';

  constructor(private http: HttpClient) { }

  listarContatos(): Observable<Contato[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => {
        response.content.forEach(contato => {
          const utcDate = DateTime.fromISO(contato.dataNascimento, { zone: 'utc' });
          contato.dataNascimento = utcDate.toLocal().toISO() ?? '';
        });
        return response.content;
      })
    );
  }  
 
  obterContatoPorId(id: number): Observable<Contato> {
      return this.http.get<Contato>(`${this.apiUrl}/${id}`).pipe(
        map(contato => {
          const utcDate = DateTime.fromISO(contato.dataNascimento, { zone: 'utc' });
          contato.dataNascimento = utcDate.toLocal().toISO() ?? '';
          return contato;
        })
      );
  }
  
  criarContato(contato: Contato): Observable<Contato> {
    console.log(contato);
    return this.http.post<Contato>(this.apiUrl, contato);
  }

  editarContato(id: number, contato: Contato): Observable<Contato> {
    const formattedDate = DateTime.fromISO(contato.dataNascimento, { zone: 'utc' }).toFormat('yyyy-MM-dd');
    contato.dataNascimento = formattedDate;
    return this.http.put<Contato>(`${this.apiUrl}/${id}`, contato);
  }

  deletarContato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
