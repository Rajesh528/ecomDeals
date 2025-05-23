// auth.service.ts
import { Injectable } from '@angular/core';
import { of, delay } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string) {
    const mockUser: any = { id: '1', email, token: 'mock-token' };
    return of(mockUser).pipe(delay(1000));
  }

  signup(email: string, password: string) {
    const mockUser: any = { id: '2', email, token: 'new-token' };
    return of(mockUser).pipe(delay(1000));
  }
}
