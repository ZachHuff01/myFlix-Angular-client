import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, of  } from 'rxjs';
// import { map } from 'rxjs/operators';

const apiUrl = 'https://huff-movies-7ddaf8be7bf2.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {

  private userData = new BehaviorSubject<Object>({ Username: '', Password: '', Email: '', Birth: ''});
  currentUser = this.userData.asObservable();

  private movies = new BehaviorSubject<Object>({});
  moviesList = this.movies.asObservable(); 
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }
  //Making API call for user login endpoint 
    public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  //Making API call for Get All Movies endpoint
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
// Non-typed response extraction

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  //Making API call for to Get One Movie endpoint
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

  //Making API call for Get Directors endpoint
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //Making API call for Get Genres endpoint
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders(
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
  
  //Making API call for Get Favorite Movies endpoint
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

  //Making API call for Add Favorite Movies endpoint
  addFavoriteMovies( movie: any ): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    console.log('in fetch api service: ', movie);
    console.log('in fetch api service_id: ', movie._id);
    return this.http.post(apiUrl + 'users/' + user.Username + '/movies/' + movie, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  //Making API call to Edit User Info endpoint
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

  //Making API call to Delete User endpoint
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

  //Making API call to Delete Favorite Movies endpoint
  deleteFavoriteMovies(movie: any): Observable<any> {
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

  //Making API call for Get All Movies endpoint
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

