/**
 * Created by bryan on 6-12-2018.
 */
import { UserService } from '../services/user.service';
import { Component, HostListener, OnInit} from '@angular/core';


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

  constructor(public userService: UserService){

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
    this.userService.addUser('Bryan', 'ronde', 'bryan@testrtrt.nl', this.date ,'test').subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
