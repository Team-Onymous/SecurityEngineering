/**
 * Created by bryan on 4-12-2018.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit, OnDestroy} from '@angular/core';
import {Web3Service} from "../util/web3.service";
import {TransactionService} from "../services/transaction.service";
import {observable} from "rxjs/index";
import {transaction} from "../services/transaction";
import { Observable } from 'rxjs';
import * as moment from 'moment';
import {MatTableDataSource} from '@angular/material';

export class TransactionData {
    coins: string;
    order: string;
    date: string;
}

const data: TransactionData[] = [
    {coins: '20', order:'beer', date: '20/09'},
    {coins: '20', order:'beer', date: '20/09'},
    {coins: '20', order:'beer', date: '20/09'},
    {coins: '20', order:'beer', date: '20/09'},
] ;

@Component({
    moduleId: module.id,
    selector: 'rg-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css'],
    providers: [Web3Service]
})

export class HomeComponent implements OnInit {

    public balance;
    public loadedTransactions$: Observable<transaction[]>;
    private transactions: TransactionData[] = [];
    displayedColumns: string[] = ['coins', 'order', 'date'];
    dataSource : MatTableDataSource<TransactionData> = new MatTableDataSource([]);

    constructor(private Web3Service: Web3Service, private transactionService: TransactionService) {

    }

    ngOnInit() {


    }
    ngAfterViewInit () {
        let userId = JSON.parse(localStorage.getItem('user')).id;

        this.loadedTransactions$ = this.transactionService.getTransactions(userId);
        this.loadedTransactions$.subscribe(
          (transactions: transaction[]) => {
              if (transactions.length >= 1) {
                  for (const transactionData of transactions) {
                      let coins;
                      let date = this.formatDateTime(transactionData.createdAt);
                      if(transactionData.incoming){
                          coins = '+ ' + transactionData.token_amount;
                      }else{
                          coins = '- ' + transactionData.token_amount;
                      }
                      this.transactions.push({coins: coins, order: transactionData.order, date: date})
                  }
              }
          });
        this.dataSource.data = this.transactions;
    }


    formatDateTime(date): string {
        if (!date) {
            return '';
        }
        return moment(date).format('MM/DD/YYYY hh:mm A');
    }



}
