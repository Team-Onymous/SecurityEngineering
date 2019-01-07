/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";


@Component({
  moduleId: module.id,
  selector: 'rg-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  providers: [Web3Service]
})

export class BalanceComponent implements OnInit {

  public balance;

  constructor(private Web3Service: Web3Service) {

  }

  ngOnInit() {

    this.balance = this.Web3Service.balance
  }

  private createWallet() {

    this.Web3Service.createWallet()
  }


}
