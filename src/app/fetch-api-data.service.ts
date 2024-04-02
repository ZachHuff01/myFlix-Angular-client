import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of  } from 'rxjs';
// import { map } from 'rxjs/operators';

const apiUrl = 'https://huff-movies-7ddaf8be7bf2.herokuapp.com/';

/**
 * @description Service for user registration operations.
 * @injectable
 */
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  private userData = new BehaviorSubject<Object>({ Username: '', Password: '', Email: '', Birth: ''});
  currentUser = this.userData.asObservable();

  private movies = new BehaviorSubject<Object>({});
  moviesList = this.movies.asObservable(); 

   /**
    * @constructor
    * @param {HttpClient} http - Angular's HttpClient module for making HTTP requests.
    */

  constructor(private http: HttpClient) {
  }
 
    /**
    * @description Make an API call for user registration.
    * @param {any} userDetails - User details for registration.
    * @returns {Observable<any>} - Observable for the API response.
    */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

     /**
    * @description Make an API call for user login.
    * @param {any} userDetails - User details for login.
    * @returns {Observable<string>} - Observable for the API response containing the user token.
    */

    public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

     /**
    * @description Make an API call to retrieve all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
    */

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any[]>(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(

      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
    * @description Extract non-typed response data from the API response.
    * @param {any} res - API response.
    * @returns {any} - Extracted response data.
    * @private
    */

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

     /**
    * @description Make an API call to retrieve a single movie.
    * @param {string} title - ID of the movie to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested movie.
    */
  getOneMovies(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

      /**
    * @description Make an API call to retrieve a director by name.
    * @param {string} directorName - Name of the director to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested director.
    */

  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

     /**
    * @description Make an API call to retrieve a genre by name.
    * @param {string} genreName - Name of the genre to be retrieved.
    * @returns {Observable<any>} - Observable for the API response containing the requested genre.
    */

  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making API call for Get User endpoint
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return of(user); //chatgpt fix 
  }

  //chatgpt fix 
  public getOneUser(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user') || '');
    return new Observable((observer) => {
      this.getUser().subscribe((response) => {
        if (Array.isArray(response)) { // Check if response is an array
          user = response.find((item: any) => item.Username === user.Username);
        }
        this.userData.next(user); // Emit user data through the subject
        observer.next(user); // Emit user data through the observable
        observer.complete(); // Complete the observable
      });
    });
  }
  // public getOneUser() {
  //   let user = JSON.parse(localStorage.getItem('user') || '');
  //   this.getUser().subscribe((response) => {
  //     user = response.filter((item: any) => item.Username == user.Username);
  //   })
  //   this.userData.next(user);
  //   return user;
  // }
  
   /**
    * @description Make an API call to retrieve all movies.
    * @returns {Observable<any>} - Observable for the API response containing all movies.
    */

  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      //map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

     /**
    * @description Make an API call to add a favorite movie for a user.
    * @param {string} user.Username - ID of the user.
    * @param {string} movie - ID of the movie to be added to favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */

  addFavoriteMovies( movie: string ): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie);
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  isFavoriteMovie(movie: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movie) >= 0;
  }

    /**
    * @description Make an API call to update user information.
    * @param {string} userDetails - ID of the user to be updated.
    * @param {any} userDetails - New user information.
    * @returns {Observable<any>} - Observable for the API response.
    */

  editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + userDetails.Username, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

      /**
    * @description Make an API call to delete a user.
    * @param {string} user.Username - ID of the user to be deleted.
    * @returns {Observable<any>} - Observable for the API response.
    */

  deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + user.Username, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
    * @description Make an API call to delete a favorite movie for a user.
    * @param {string} user.Username - ID of the user.
    * @param {string} movie - ID of the movie to be removed from favorites.
    * @returns {Observable<any>} - Observable for the API response.
    */

  deleteFavoriteMovies(movie: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + movie, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

   /**
    * @description Handle HTTP errors and log them.
    * @param {HttpErrorResponse} error - HTTP error response.
    * @returns {any} - Error details.
    * @private
    */

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

