import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit{

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
    ) { }

ngOnInit(): void {
}

loginUser(): void {
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    //Logic for a successful user login
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
    this.dialogRef.close(); // Will close modal on success
    this.snackBar.open('User login successful', 'OK', {
      duration: 2000
    });
    this.router.navigate(['movies'])
  }, (result) => {
    console.log(result)
    this.snackBar.open('User login failed', 'OK', {
      duration: 2000
    });
  });
}

}

