import {Component} from '@angular/core';
import {UserService} from './services/user.service'
import {Web3Service} from "./services/web3.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(private userService: UserService,
              private web3Service: Web3Service) {
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
