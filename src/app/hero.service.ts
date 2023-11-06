/**
 * Generated with 'ng generate service hero'
 *
 * Components shouldn't fetch or save data directly, and they certainly shouldn't knowingly present fake data.
 * They should focus on presenting data and delegate data access to a service.
 *
 * All application classes can use the HeroService to get heroes. Instead of creating that service with the
 * new keyword, use the dependency injection that Angular supports to inject it into the HeroesComponent constructor.
 * Services are a great way to share information among classes that don't know each other.
 */
import { ErrorHandler, Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, catchError, of, pipe, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * This service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
 * This marks the class as one that participates in the dependency injection system.
 * The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
 *
 * The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did
 * for your component classes.
 *
 * You must make the HeroService available to the dependency injection system before Angular can inject it into
 * the HeroesComponent by registering a provider. A provider is something that can create or deliver a service.
 * In this case, it instantiates the HeroService class to provide the service.
 *
 * To make sure that the HeroService can provide this service, register it with the injector. The injector is
 * the object that chooses and injects the provider where the application requires it.
 *
 * By default, ng generate service registers a provider with the root injector for your service by including
 * provider metadata, that's providedIn: 'root' in the @Injectable() decorator.
 *
 * When you provide the service at the root level, Angular creates a single, shared instance of HeroService and
 * injects into any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular
 * to optimize an application by removing the service if it isn't used.
 */
@Injectable({
    /**
     * By default, this decorator has a providedIn property, which creates a provider for the service. In this case,
     * providedIn: 'root' specifies that Angular should provide the service in the root injector.
     */
    providedIn: 'root',
})
export class HeroService {
    /**
     * The heroesUrl of the form :base/:collectionName with the address of the heroes resource on the server. Here base
     * is the resource to which requests are made, and collectionName is the heroes data object in the in-memory-data-service.ts
     */
    private heroesUrl = 'api/heroes'; // URL to web ap

    /**
     * A parameter declares a private messageService property. Angular injects the singleton MessageService into
     * that property when it creates the HeroService.
     *
     * This is an example of a typical service-in-service scenario in which you inject the MessageService into
     * the HeroService which is injected into the HeroesComponent.
     *
     * HttpClient is injected in constructor to add HeroService the ability to create Http request and get Http respones.
     */
    constructor(private http: HttpClient, private messageService: MessageService) {}

    /**
     * The HeroService could get hero data from anywhere such as a web service, local storage, or a mock data source.
     *
     * Removing data access from components means you can change your mind about the implementation anytime,
     * without touching any components.
     *
     * of() has beed swapped for http.get() and the application keeps working without any other changes because both
     * functions return an Observable<Hero[]>.
     *
     * GET heroes from the server
     */
    getHeroes(): Observable<Hero[]> {
        /**
         * HttpClient methods return one value. All HttpClient methods return an RxJS Observable of something.
         *
         * HTTP is a request/response protocol. You make a request, it returns a single response.
         *
         * In general, an observable can return more than one value over time. An observable from HttpClient always
         * emits a single value and then completes, never to emit again.
         *
         * This particular call to HttpClient.get() returns an Observable<Hero[]>, which is an observable of hero
         * arrays. In practice, it only returns a single hero array.
         *
         * HttpClient.get() returns the body of the response as an untyped JSON object by default. Applying
         * the optional type specifier, <Hero[]> , adds TypeScript capabilities, which reduce errors during compile
         * time.
         *
         * The server's data API determines the shape of the JSON data. The Tour of Heroes data API returns the hero
         * data as an array.
         *
         * Other APIs may bury the data that you want within an object. You might have to dig that data out
         * by processing the Observable result with the RxJS map() operator.
         * Although not discussed here, there's an example of map() in the getHeroNo404() method included in
         * the sample source code.
         */
        return (
            this.http
                .get<Hero[]>(this.heroesUrl)
                /**
                 * Things go wrong, especially when you're getting data from a remote server. The HeroService.getHeroes()
                 * method should catch errors and do something appropriate.
                 * To catch errors, you "pipe" the observable result from http.get() through an RxJS catchError() operator.
                 */
                .pipe(
                    /**
                     * The getHeroes() method taps into the flow of observable values and sends a message, using the log()
                     * method, to the message area at the bottom of the page.
                     *
                     * The RxJS tap() operator enables this ability by looking at the observable values, doing something
                     * with those values, and passing them along. The tap() callback doesn't access the values themselves.
                     *
                     * The usage of _ as an argument ( _ ) => ... is a convention indicating that the parameter exists
                     * but is not used, often seen where a syntactical placeholder is required but not actively employed
                     * in the function body.
                     * The _ in ( _ ) => ... denotes an unused parameter, required here by tap() operator for it ssyntax
                     * but not for the logging side-effect we aim to achieve with it.
                     * */
                    tap((_) => this.log('fetched hereos')),
                    /**
                     * The catchError() operator intercepts an Observable that failed. The operator then passes the error
                     * to the error handling function.
                     * The following handleError() method reports the error and then returns an innocuous result so that
                     * the application keeps working.
                     */
                    catchError(this.handleError<Hero[]>('getHeroes', []))
                )
        );
    }

    // The old implementation in this tutorial with delivering mock heroes.
    // getHeroes(): Observable<Hero[]> {
    //     /**
    //      * This tutorial simulates getting data from the server with the RxJS of() function
    //      * of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
    //      *
    //      * https://rxjs.dev/api/index/function/of
    //      */
    //     const heroes: Observable<Hero[]> = of(HEROES);
    //     // Send a message when the heroes are fetched.
    //     this.messageService.add('HeroService: fetched heroes');
    //     return heroes;
    // }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - Name of the operation that failed.
     * @param result - Optional value to return as the observable result, which can be T or undefined.
     *
     * The `handleError` function can be shared by many service methods, making it a general
     * utility for error handling. Rather than handling errors directly, it returns a function
     * that is suited for use with the `catchError` operator. This function is configured with
     * the name of the operation that failed and a safe return value.
     *
     * After reporting the error to the console, the handler constructs a friendly message and
     * returns a safe value to ensure the application continues to run. If no `result` is provided,
     * the value defaults to `undefined`, and the `as T` cast instructs TypeScript to treat this
     * `undefined` as type `T`, which maintains the return type as `Observable<T>`.
     *
     * Without the `as T` cast, if `result` is not provided, TypeScript would raise an error that
     * `Observable<undefined>` is not assignable to `Observable<T>`. Casting with `as T` avoids
     * this error by asserting that `result` (even if `undefined`) should be considered of type `T`
     * for the `Observable`.
     *
     * Each service method returns a different kind of Observable result, so `handleError` accepts
     * a type parameter to return the expected safe value type.
     *
     * @return A function that takes an error of any type and returns an `Observable` of type `T`.
     *         This returned function is suitable as an argument for the `catchError` operator used
     *         in RxJS observables, providing a way to handle errors and return a safe default value.
     */
    private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead;

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T); // Cast `result` to `T` to maintain the Observable<T> type.
        };
    }

    /**
     * GET hero by id. Will 404 if id not found
     *
     * Most web APIs support a get by id request in the form :baseURL/:id.
     * Here, the base URL is the heroesURL,i.e. 'api/heroes', and id is the number of the hero that you want to retrieve.
     * For example, api/heroes/11.
     *
     * getHero() has three significant differences from getHeroes():
     * - getHero() constructs a request URL with the desired hero's id
     * - The server should respond with a single hero rather than an array of heroes
     * - getHero() returns an Observable<Hero>, which is an observable of Hero objects rather than an observable of Hero arrays.
     */
    getHero(id: number): Observable<Hero> {
        const url = `${this.heroesUrl}/${id}}`;
        return this.http.get<Hero>(url).pipe(
            tap((_) => this.log(`fetche hero id`)),
            // The optonal parameter result of the handleError() method is undefined in this case.
            catchError(this.handleError<Hero>(`getHero id=${id}`))
        );
    }

    // The old implementation in this tutorial with delivering the hero by id via the mock heroes.
    // /**
    //  * Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable,
    //  * using the RxJS of() function.
    //  *
    //  * You can rewrite getHero() as a real Http request without having to change the HeroDetailComponent that calls it.
    //  * */
    // getHero(id: Number): Observable<Hero> {
    //     // For now, assume that a hero with the specified `id` always exists.
    //     // Error handling will be added in the next step of the tutorial.
    //     const hero = HEROES.find((h) => h.id === id)!;
    //     // The backtick ( ` ) characters define a JavaScript template literal for embedding the id.
    //     this.messageService.add(`HeroService: fetched hero id=${id}}`);
    //     return of(hero);
    // }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
