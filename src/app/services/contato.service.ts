import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Contato } from '../models/contato.model';
import { DateTime } from 'luxon';


interface ApiResponse {
  content: Contato[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private apiUrl = 'http://localhost:8080/api/v1/contatos';

  constructor(private http: HttpClient) { }

  listarContatos(pagina = 0, tamanho = 20): Observable<Contato[]> {
    const params = new HttpParams()
      .set("page", String(pagina))
      .set("size", String(tamanho));

    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
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
