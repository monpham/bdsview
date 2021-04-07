import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

const TOKEN_KEY = 'AuthToken';
const NAME_KEY = 'AuthName';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private roles: Array<string> = [];
  _isAccountLoggedin = new BehaviorSubject<boolean>(false);
  _isAdmin = new BehaviorSubject<boolean>(false);

  public isUserLogin(){
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  setIsAccountLoggedin(value) {
    this._isAccountLoggedin.next(value);
  }

  setIsAdmin(value) {
    this._isAdmin.next(value);
  }

  signOut() {
    this.setIsAccountLoggedin(false);
    this.setIsAdmin(false);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveName(token: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, token);
  }

  public getName(): string {
    return window.sessionStorage.getItem(NAME_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];
    if (window.sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(window.sessionStorage.getItem(AUTHORITIES_KEY)).forEach
      (authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }
}
