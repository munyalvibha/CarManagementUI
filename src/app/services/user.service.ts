import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRole: string | null = null;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("current_user")) {
      this.userRole = JSON.parse(localStorage.getItem("current_user")).role;
    }
  }

  isUser(): boolean {
    return this.userRole === 'User';
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  setCurrentUser(currentUser) {
    this.userRole = currentUser.role;
    localStorage.setItem('current_user', JSON.stringify(currentUser));
    return this.userRole;
  }

  logout() {
    this.userRole = null;
    localStorage.removeItem('current_user');
  }

  login(user) {
    return this.http.post(this.baseUrl + '/api/Account/login', user);
  }

  register(user) {
    return this.http.post(this.baseUrl + '/api/Account/register', user);
  }
}
