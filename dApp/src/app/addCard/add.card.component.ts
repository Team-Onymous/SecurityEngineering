/**
 * Created by bryan on 6-12-2018.
 */
import { Component, HostListener, OnInit} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rg-add.card',
  templateUrl: 'add.card.component.html',
  styleUrls: ['add.card.component.css'],
})



export class AddCardComponent{
  visible: boolean = true;
  breakpoint: number = 520;

  ngOnInit() {
    const w = window.innerWidth;
    if (w >= this.breakpoint) {
      this.visible = true;
      console.log('true');
    } else {
      // whenever the window is less than 520, hide this component.
      this.visible = false;
      console.log('false');
    }
  }

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
