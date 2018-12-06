/**
 * Created by bryan on 5-12-2018.
 */
import { Component, HostListener} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rg-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})



export class LoginComponent{
  visible: boolean = true;
  breakpoint: number = 520;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const w = event.target.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
      console.log('true');
    } else {
      // whenever the window is less than 768, hide this component.
      this.visible = false;
      console.log('false');
    }
  }

  goToRegister(){}

}
