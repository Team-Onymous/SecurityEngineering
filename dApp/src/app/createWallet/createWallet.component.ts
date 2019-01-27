/**
 * Created by Cas on 7-01-2019.
 */
import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";


@Component({
  moduleId: module.id,
  selector: 'rg-createWallet',
  templateUrl: 'createWallet.component.html',
  styleUrls: ['createWallet.component.css'],
  providers: [Web3Service]
})

export class CreateWalletComponent implements OnInit {

  constructor(private Web3Service: Web3Service) {

  }

  ngOnInit() {

  }

  private createWallet() {

    this.Web3Service.createWallet();

  }
}
