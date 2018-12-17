/**
 * Created by bryan on 5-12-2018.
 */
import { Component, HostListener, OnInit} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rg-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})



export class LoginComponent{
  visible: boolean = true;
  breakpoint: number = 520;

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

  goToRegister(){}

}
