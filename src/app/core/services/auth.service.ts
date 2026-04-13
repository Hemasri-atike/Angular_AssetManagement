import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || '');
  userRole$ = this.roleSubject.asObservable();

  setRole(role: string) {
    localStorage.setItem('userRole', role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  logout() {
    localStorage.removeItem('userRole');
    this.roleSubject.next('');
  }
}
