import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _registeredUsers: any[];

  constructor() { 
    this._registeredUsers = new Array<any>();
    this._registeredUsers.push(
      {
        login: 'jlaubert',
        password: 'totototo'
      }
    );
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
      return true;
    }
    return false;
  }
}
