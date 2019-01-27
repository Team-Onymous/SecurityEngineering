/**
 * Created by bryan on 5-12-2018.
 */
import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as options from './http.options';
import {environment} from '../../environments/environment';
import {UserService} from './user.service';
import {barConsumable} from './barConsumable';
import * as _ from 'underscore';


@Injectable()
export class BarService {

    constructor(public http: HttpClient) {

    }

    getConsumables(): Observable<any> {
        return this.http.get<any>(environment.API + 'api/consumables', options.httpOptions).pipe(
            map((data: any) => {
                if (_.isNull(data)) {
                    return []; // fallback to an empty result in case of 204
                }
                return data;
            })
        );
    }

    addTransaction(tx: string, amount: string, order: string, user_id: string, incoming: string): Observable<any> {
        const body = new HttpParams()
            .set('tx_id', tx)
            .set('token_amount', amount)
            .set('incoming', incoming)
            .set('order', order)
            .set('user_id', user_id);
        return this.http.post(environment.API + 'api/users/createTransaction', body.toString(), options.httpOptions)
            .pipe(

            );
    }


}

