/**
 * Created by bryan on 4-12-2018.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";


@Component({
  moduleId: module.id,
  selector: 'rg-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [Web3Service]
})

export class HomeComponent implements OnInit {

  public balance;

  constructor(private Web3Service: Web3Service) {

  }

  ngOnInit() {

    this.balance = this.Web3Service.balance
  }
}
