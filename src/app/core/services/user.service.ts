import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: any[];
  
  public isAuthenticated: boolean = false;

  constructor() { 
    this._registeredUsers = new Array<any>();
    this._registeredUsers.push(
      {
        login: 'jlaubert',
        password: 'totototo'
      }
    );
    const userAsString: string = localStorage.getItem('user');
    if (userAsString !== null) {
      this.isAuthenticated = true;
    }
  }

  public authenticate(user: any): boolean {
    const registeredUser: any = this._registeredUsers.find(
      (obj: any) => obj.login == user.login && obj.password == user.password
    );
    if (registeredUser !== undefined) {
      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
  }
}
