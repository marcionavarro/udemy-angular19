import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lugar} from './lugar';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private http: HttpClient) {
  }

  urlBase: string = 'http://localhost:3000/lugares';

  salvar(lugar: Lugar): Observable<Lugar> {
    return this.http.post<Lugar>(this.urlBase, lugar);
  }

  obterLugares(): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.urlBase);
  }

}

