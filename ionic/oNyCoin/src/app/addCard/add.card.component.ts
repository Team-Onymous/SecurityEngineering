/**
 * Created by bryan on 6-12-2018.
 */
import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {EncrDecrService} from "../services/EncrDecr.service";
import {RespondService} from "../services/respond.service";


@Component({
    moduleId: module.id,
    selector: 'rg-add.card',
    templateUrl: 'add.card.component.html',
    styleUrls: ['add.card.component.css'],
    providers: [RespondService]
})


export class AddCardComponent {
    visible: boolean = true;
    breakpoint: number = 520;
    StreetNameInput: string;
    HouseNumberInput: string;
    PostalCodeInput: string;
    CityRepeatInput: string;
    public CityInput;
    private pass_id;

    constructor(private userService: UserService, private router: Router,
                private EncrDecr: EncrDecrService,
                private respondService: RespondService) {
    }

    ngOnInit() {
        const w = window.innerWidth;
        if (w >= this.breakpoint) {
            this.visible = true;
        } else {
            // whenever the window is less than 520, hide this component.
            this.visible = false;
        }

        // this receives the information from the card.
        this.respondService.messages.subscribe(msg => {
            console.log(msg);
            this.pass_id = msg
        });
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

        let userAccount = localStorage.getItem('user');
        let decryptedUserAccount = JSON.parse(this.EncrDecr.get(environment.secret, userAccount));

        console.log(this.pass_id);

        this.userService.addCard(this.pass_id, street, houseNumber, postalCode, city, decryptedUserAccount.id).subscribe(
            response => {
                console.log(response);
                this.router.navigate(['/home']);
            },
            err => console.log(err)
        );
    }

}
