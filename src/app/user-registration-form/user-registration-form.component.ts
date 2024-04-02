import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

/**
* @description Component representing the user registration form.
* @selector: 'app-user-registration-form'
* @templateUrl: './user-registration-form.component.html'
* @styleUrls: ['./user-registration-form.component.scss']
*/

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
/** Input for user data including username, password, email, and birthday. */
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

     /**
    * @constructor
    * @param {UserRegistrationService} userRegistrationAPI - Service for user registration API calls.
    * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the dialog for closing.
    * @param {MatSnackBar} snackBar - Angular Material's MatSnackBar service for notifications.
    */

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

   /**
    * @description Sends user registration form information to the backend.
    * Closes the dialog on success and displays a success message. Shows an error message on failure.
    */
   
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     console.log(result);
     this.dialogRef.close(); // This will close the modal on success!
     this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open('User registration successful', 'OK', {
        duration: 2000
      });
    });
  }

  }

