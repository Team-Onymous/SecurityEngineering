/**
 * Created by bryan on 6-12-2018.
 */
import { Component, HostListener, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import {Router} from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'rg-add.card',
  templateUrl: 'add.card.component.html',
  styleUrls: ['add.card.component.css'],
})



export class AddCardComponent{
  visible: boolean = true;
  breakpoint: number = 520;
  StreetNameInput: string;
  HouseNumberInput: string;
  PostalCodeInput: string;
  CityRepeatInput: string;
  public CityInput;

  constructor(private userService: UserService, private router: Router){}

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

  addCard(street, houseNumber, postalCode, city) {

    let userId = JSON.parse(localStorage.getItem('user')).id;

    this.userService.addCard(street, houseNumber, postalCode, city, userId).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      err => console.log(err)
    );
  }

}
