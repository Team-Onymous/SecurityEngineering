/**
 * Created by bryan on 5-12-2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as options from './http.options';
import {environment} from '../../environments/environment';
import * as _ from 'underscore';


@Injectable()
export class UserService {

    constructor(public http: HttpClient) {

    }

    public canActivate(url: string): boolean {
        return true;
    }

    isLoggedIn(): boolean {
        return true;
    }


    addUser(firstName: string, lastName: string, email: string, dateOfBirth: Date, password: string, wallet_address: string): Observable<any> {
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
        return this.http.post(environment.API + 'api/users/register', body.toString(), options.httpOptions)
            .pipe(

            );
    }

    addCard(street: string, houseNumber: string, postalCode: string, city: string, userId): Observable<any> {
        let date = Date().toString();
        const body = new HttpParams()
            .set('street', street)
            .set('house_number', houseNumber)
            .set('postal_code', postalCode)
            .set('city', city);
        // We got to build the data we send to the backend.

        return this.http.put(environment.API + 'api/users/orderCard/' + userId, body.toString(), options.httpOptions)
            .pipe(

            );
    }

    login(email: string, password: string) {
        const body = new HttpParams()
            .set('email', email)
            .set('password', password);
        return this.http.post(environment.API + 'api/users/login', body.toString(), options.httpOptions).pipe(
            map((response: any) => {
                localStorage.setItem('user', JSON.stringify(response));
            }));
    }

    logout(): Observable<any> {
        return this.http.get(environment.API + 'logout', options.httpOptions);
    }

    getUser(id): Observable<any> {
        return this.http.get<any>(environment.API + 'api/users/' + id, options.httpOptions).pipe(
            map((data: any) => {
                if (_.isNull(data)) {
                    return []; // fallback to an empty result in case of 204
                } else {

                    // this updates the username in the HTML card when it is loaded. Dirty fuckin' hack though, should be refactored.
                    let divs = document.getElementsByClassName('name');
                    for (let i = 0; i < divs.length; i++) {
                        document.getElementsByClassName('name')[i].innerHTML = data.firstname;
                    }
                    return data;
                }
            })
        );
    }
}
