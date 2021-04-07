import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginInfo} from "./login-info";
import {Observable} from "rxjs";
import {JwtResponse} from "./jwt-response";
import {SignupInfo} from "./signup-info";
import {environment} from '../../environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = environment.apiEndpoint + "/api/auth/signin";
  private signupUrl = environment.apiEndpoint + "/api/auth/signup";

  constructor(private http: HttpClient) {
  }

  attemptAuth(loginInfo: LoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, loginInfo, httpOptions);
  };

  signUp(signupInfo: SignupInfo): Observable<String> {
    return this.http.post<string>(this.signupUrl, signupInfo, httpOptions);
  }

}
