/**
 * Created by bryan on 4-12-2018.
 */
import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";


@Component({
    moduleId: module.id,
    selector: 'rg-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
})

export class NavbarComponent {

    constructor(private userService: UserService,
                private router: Router) {

    }

    public logout() {
        this.userService.logout().subscribe(response => {
            console.log(response);
            this.router.navigate(['/login'])
        }, err => console.log(err));
    }
}
