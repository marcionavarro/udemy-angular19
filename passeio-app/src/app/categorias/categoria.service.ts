import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Categoria} from './categoria';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  urlBase: string = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {
  }

  salvar(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>('http://localhost:3000/categorias', categoria);
  }

  obterTodas(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.urlBase);
  }
}
