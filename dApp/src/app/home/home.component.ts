/**
 * Created by bryan on 4-12-2018.
 */
import {Component} from '@angular/core';
import {Web3Service} from "../util/web3.service";



@Component({
  moduleId: module.id,
  selector: 'rg-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent {



  constructor(private Web3Service: Web3Service) {

  }

  private transferTokens() {
    this.Web3Service.transferTokens("0x24e77503d2C5D7f7f28E05E20fD57bE7957bE968", 10000);
  }
}
