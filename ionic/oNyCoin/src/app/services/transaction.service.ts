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
import {transaction} from './transaction';
import * as _ from 'underscore';


@Injectable()
export class TransactionService {


  constructor(public http: HttpClient) {

  }

  getTransactions(id): Observable<any> {
    return this.http.get<any>(environment.API + 'api/transactions/' + id, options.httpOptions).pipe(
      map((data: any) => {
        if (_.isNull(data)) {
          return []; // fallback to an empty result in case of 204
        }
        return data;
      })
    );
  }


}


