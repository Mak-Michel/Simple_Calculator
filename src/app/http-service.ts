import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  public send(expression: string): Observable <string>
  {
    return this.http.post<string>(`${this.url}/Operate`, expression);
  }

}
