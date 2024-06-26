import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favorites: any[] = [];

  user = JSON.parse(localStorage.getItem('user') || '');

  constructor(public fetchApiData: FetchApiDataService,  
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

ngOnInit(): void {
  this.getMovies();
}

getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getOneUser().subscribe(
      (resp: any) => {
        if (resp.user && resp.user.FavoriteMovies) {
          this.favorites = resp.user.FavoriteMovies;
        } else {
          this.favorites = []; // Set an empty array if data is not available
        }
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
        this.favorites = []; // Set an empty array on error as well
      }
    );
  }


  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  //chatgpt fix 
  public addToFavorites(id: any): void {
    if (this.isFavoriteMovie(id)) {
      // Movie is already a favorite, so remove it
      this.removeFavoriteMovie(id);
    } else {
      // Movie is not a favorite, so add it
      this.fetchApiData.addFavoriteMovies(id).subscribe({
        next: () => {
          this.snackBar.open('Movie added to favorites', 'OK', {
            duration: 2000,
          });
        },
        error: (err) => {
          // Handle error if needed
          console.error('Error:', err);
        },
        complete: () => {
          // Handle completion if needed
          console.log('Subscription completed.');
        }
    
      });
    }
          
    // Assuming getUser() is needed to refresh user data after adding the movie
    this.fetchApiData.getUser().subscribe({
    next: () => {
    // Handle user data if needed
    // Assuming getFavorites() is called to update the favorites list after adding the movie
    this.getFavorites();
    },
    error: (error) => {
    console.error('Error fetching user data:', error);
    // Handle error if needed
    }
  });
}

      public removeFavoriteMovie(id: any): void {
        this.fetchApiData.deleteFavoriteMovies(id).subscribe(() => {
          this.snackBar.open('removed from favorites', 'OK', {
            duration: 2000
          })
        });
      }

      public getGenre(genre: any){
        this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {genre: genre}});
      }

      public getOneDirector(director: any){
        this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {director: director}});
      }  

      public openMovieDetails(details: string){
        this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {details: details}});
      }


}
 
 
 
 
 
 
 
 
 
 
  // public addToFavorites(movie: any): void {
  //   if (this.isFavoriteMovie(movie._id)) {
  //     // Movie is already a favorite, so remove it
  //     this.removeFavoriteMovie(movie._id);
  //   } else {
  //     // Movie is not a favorite, so add it
  //     this.fetchApiData.addFavoriteMovies(movie).subscribe(() => {
  //       this.snackBar.open('Movie added to favorites', 'OK', {
  //         duration: 2000,
  //       });
  //       this.getFavorites();
  //     });
  //   }
  // }
