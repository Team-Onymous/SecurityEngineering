/**
 * Created by bryan on 6-12-2018.
 */
import { UserService } from '../services/user.service';
import { Component, HostListener, OnInit} from '@angular/core';
import {Web3Service} from "../util/web3.service";


@Component({
  moduleId: module.id,
  selector: 'rg-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})


export class RegisterComponent{
  visible: boolean = true;
  breakpoint: number = 520;
  date: Date;

  constructor(public userService: UserService,
              private Web3Service:Web3Service){

  }

  ngOnInit() {
    const w = window.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
    } else {
      // whenever the window is less than 520, hide this component.
      this.visible = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const w = event.target.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
    } else {
      // whenever the window is less than 520, hide this component.
      this.visible = false;
    }
  }

  goToRegister(){
    // this.Web3Service.createWallet();
    console.log(this.Web3Service.createWallet());
    let wallet_address = this.Web3Service.createWallet().address;
    // console.log(this.Web3Service.createWallet().privateKey);
    // console.log(this.Web3Service.createWallet().newAccount);

    this.userService.addUser('Bryan', 'ronde', 'bryan@testrtrt.nl', this.date ,'test', wallet_address).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }
}
