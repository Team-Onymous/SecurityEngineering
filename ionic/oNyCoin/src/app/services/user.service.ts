/**
 * Created by bryan on 5-12-2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as options from './http.options';
import {environment} from '../../environments/environment';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as _ from 'underscore';
import {EncrDecrService} from "./EncrDecr.service";


@Injectable()
export class UserService {

    constructor(public http: HttpClient, private EncrDecr: EncrDecrService, private router: Router) {

    }

    public canActivate(url: string): boolean {
        const resourceId = this.getResourceIdByURL(url);
        if ('' === resourceId) {
            return true; // allow access to resource if it's not registered for 'protection'
        }
        return this.hasPermission(resourceId);
    }

    public hasPermission(resourceId: string): boolean {
        if (this.isLoggedIn()) {
            let userAccount = localStorage.getItem('user');
            let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));
            if(resourceId == 'barPage'){
                if(decryptedUserAccount.role === 1){
                    return true;
                }else{
                    this.router.navigate(['home']);
                }
            }
            else if(resourceId == 'homePage' || 'refundPage' || 'addcoinsPage' || 'blockPage'){
                if(decryptedUserAccount.role === 0){
                    return true;
                }else{
                    this.router.navigate(['bar']);
                }
            }
            else {
                return false;
            }
            return true;
        }
        return false;
    }

    isLoggedIn(): boolean {

        let userAccount = localStorage.getItem('user');
        if (userAccount) {
            let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));

            return !!decryptedUserAccount;
        } else return false
    }

    isLoggedInAsBar() : boolean {
        if(this.isLoggedIn()) {
            let userAccount = localStorage.getItem('user');
            if (userAccount) {
                let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));
                if(decryptedUserAccount.role === 1){
                    return true;
                }else return false;
            }
        }else return false;
    }

    private getResourceIdByURL(url: string): string {
        switch (url) {
            case '/home':
                return 'homePage';
            case '/bar':
                return 'barPage';
            case '/refund':
                return 'refundPage';
            case '/addcoins':
                return 'addcoinsPage';
            case '/block':
                return 'blockPage';
            default:
                return '';
        }
    }


    addUser(firstName: string, lastName: string, email: string, dateOfBirth: Date, password: string, wallet_address: string, wallet_key: string,): Observable<any> {
        let date = Date().toString();
        console.log(wallet_key);
        const body = new HttpParams()
            .set('wallet_address', wallet_address)
            .set('wallet_key', wallet_key)
            .set('firstname', firstName)
            .set('lastname', lastName)
            .set('email', email)
            .set('date_of_birth', date)
            .set('password', password);

        return this.http.post(environment.API + 'api/users/register', body.toString(), options.httpOptions)
            .pipe(

            );
    }

    addCard(pass_id: string, street: string, houseNumber: string, postalCode: string, city: string, userId): Observable<any> {
        let date = Date().toString();
        const body = new HttpParams()
            .set('pass_id', pass_id)
            .set('street', street)
            .set('house_number', houseNumber)
            .set('postal_code', postalCode)
            .set('city', city);
        // We got to build the data we send to the backend.

        return this.http.put(environment.API + 'api/users/orderCard/' + userId, body.toString(), options.httpOptions)
            .pipe(

            );
    }
    removeCard(pass_id: string, street: string, houseNumber: string, postalCode: string, city: string, userId): Observable<any> {
        let date = Date().toString();
        const body = new HttpParams()
          .set('pass_id', pass_id)
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
                // this.user = this.encrDecrService.set(environment.secret, JSON.stringify(user));

                localStorage.setItem('user', this.EncrDecr.set(environment.secret, JSON.stringify(response)));
            }));
    }

    logout(): Observable<any> {
        localStorage.removeItem('user');
        localStorage.removeItem('customer');
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

    getBarUser(pass_id): Observable<any> {
        return this.http.get<any>(environment.API + 'api/users/pass/' + pass_id, options.httpOptions).pipe(
            map((data: any) => {

                if (_.isNull(data)) {
                    return []; // fallback to an empty result in case of 204
                } else {
                    return data;
                }
            })
        );
    }

}
