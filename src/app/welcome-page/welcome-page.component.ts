import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * @description Component representing the welcome page of the application.
 * @selector: 'app-welcome-page'
 * @templateUrl: './welcome-page.component.html'
 * @styleUrls: ['./welcome-page.component.scss']
 */

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

export class WelcomePageComponent implements OnInit {
      /**
    * @constructor
    * @param {MatDialog} dialog - Angular Material's MatDialog service for opening dialogs.
    */
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
    * @description Opens the user registration dialog when called.
    */

openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
// Assigning the dialog a width
    width: '280px'
    });
  }

     /**
    * @description Opens the login dialog when called.
    */
   
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
