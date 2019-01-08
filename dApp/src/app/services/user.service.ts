/**
 * Created by bryan on 5-12-2018.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as options from './http.options';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  constructor(public http: HttpClient){

  }

  public canActivate(url: string): boolean {
    return true;
  }

  isLoggedIn(): boolean {
    return true;
  }


  addUser (firstName: string, lastName: string, email:string, dateOfBirth: Date, password: string, wallet_address: string): Observable<any> {
    let date = Date().toString();
    const body = new HttpParams()
      .set('wallet_address', wallet_address)
      .set('firstname', firstName)
      .set('lastname', lastName)
      .set('email', email)
      .set('date_of_birth', date)
      .set('password', password);
    // We got to build the data we send to the backend.
    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      date_of_birth: dateOfBirth,
      password: password
    };
    return this.http.post(environment.API + 'api/users/register', body.toString() , options.httpOptions)
      .pipe(

    );
  }


}
