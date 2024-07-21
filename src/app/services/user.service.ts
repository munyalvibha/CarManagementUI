import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface userModel {
  username?: string;
  passowrd?: string;
  role?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userRole: string | null = null;
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
    this.userRole = JSON.parse(localStorage.getItem("current_user")).role;
  }

  isUser(): boolean {
    return this.userRole === 'user';
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

  login(user): Observable<userModel[]> {
    return this.http.post<userModel[]>(this.baseUrl + '/Account/login', user);
  }

  register(user): Observable<userModel[]> {
    return this.http.post<userModel[]>(this.baseUrl + '/Account/register', user);
  }
}
