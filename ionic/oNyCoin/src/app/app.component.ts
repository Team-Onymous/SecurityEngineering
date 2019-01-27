import {Component, OnInit} from '@angular/core';
import {UserService} from './services/user.service'
import {Web3Service} from "./util/web3.service";
import {EncrDecrService} from "./services/EncrDecr.service";
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  role: number = 1;

  constructor(private userService: UserService,
              private web3Service: Web3Service,
              private EncrDecr: EncrDecrService) {
  }
  ngOnInit() {
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  getRole(): boolean {
    return this.userService.isLoggedInAsBar();
  }
}
