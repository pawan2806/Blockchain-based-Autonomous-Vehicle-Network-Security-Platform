import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:8081/input/vehicles';
@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url:String): Observable<any> {
    return this.http.get(API_URL  + url).pipe(map(res => res));
  }
}
// /api/users