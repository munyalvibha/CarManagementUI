import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getAuthorizationHeader(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.append('Accept', 'application/json');
    const currentUser = this.getToken();
    if (currentUser) {
      const token: string = currentUser;
      if (token !== '') {
        const tokenValue: string = 'Bearer ' + token;
        headers = headers.append('Authorization', tokenValue);
      }
    }
    return headers;
  }

  private getToken() {
    return localStorage.getItem('token');
  }
}
