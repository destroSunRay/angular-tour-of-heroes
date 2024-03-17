import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private URL = 'http://127.0.0.1:5000';

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.URL}/heroes`).pipe(
      tap((_) => this.log('fetched hero service')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.URL}/hero/${id}`).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  updateHero(hero: Hero): Observable<any> {
    return this.http
      .put(`${this.URL}/hero/${hero.id}`, hero, this.httpOptions)
      .pipe(
        tap((_) => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http
      .post<Hero>(`${this.URL}/hero`, hero, this.httpOptions)
      .pipe(
        tap((_) => this.log(`created new with hero name: ${hero.name}`)),
        catchError(this.handleError<Hero>(`addHero name=${hero.name}`))
      );
  }

  deleteHero(hero: Hero): Observable<any> {
    return this.http.delete(`${this.URL}/hero/${hero.id}`).pipe(
      tap((_) => this.log(`deleted hero with id=${hero.id}`)),
      catchError(this.handleError(`deleteHero id=${hero.id}`))
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.URL}/heroes?name=${term}`).pipe(
      tap((x) => {
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`);
      }),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
