import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { GenreComponent } from './genre/genre.component';
import { DirectorComponent } from './director/director.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

/**
 * @module AppModule
 * @description Root module of the Angular application.
 */
@NgModule({
  declarations: [
     /** @component AppComponent */
    AppComponent,

    /** @component UserRegistrationFormComponent */
    UserRegistrationFormComponent,

    /** @component UserLoginFormComponent */
    UserLoginFormComponent,

    /** @component MovieCardComponent */
    MovieCardComponent,

    /** @component  WelcomePageComponent */
    WelcomePageComponent,

    /** @component ProfileViewComponent */
    ProfileViewComponent,

    /** @component GenreComponent */
    GenreComponent,

    /** @component DirectorComponent */
    DirectorComponent,

    /** @component MovieDetailsComponent */
    MovieDetailsComponent,

    /** @component NavbarComponent */
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
