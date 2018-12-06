/**
 * Created by bryan on 6-12-2018.
 */
import { Component, HostListener} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rg-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})



export class RegisterComponent{
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
