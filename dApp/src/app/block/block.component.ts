/**
 * Created by bryan on 4-12-2018.
 */
import { Component, HostListener, OnInit} from '@angular/core';

export interface Option {
  value: string;
  viewValue: string;
}


@Component({
  moduleId: module.id,
  selector: 'rg-block',
  templateUrl: 'block.component.html',
  styleUrls: ['block.component.css'],
})

export class BlockComponent{
  visible: boolean = true;
  checked = false;
  breakpoint: number = 520;
  selectedOption : string;


  options: Option[] = [
    {value: 'lost', viewValue: 'Lost'},
    {value: 'stolen', viewValue: 'Stolen'},
    {value: 'dontused', viewValue: 'Dont Used'}
  ];

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
