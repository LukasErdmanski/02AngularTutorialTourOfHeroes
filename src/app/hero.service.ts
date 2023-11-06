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
import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
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
        // Between <> of the get() method, you specify the type of data received in the http response.
        return this.http.get<Hero[]>(this.heroesUrl);
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
     * Like getHeroes(), getHero() has an asynchronous signature. It returns a mock hero as an Observable,
     * using the RxJS of() function.
     *
     * You can rewrite getHero() as a real Http request without having to change the HeroDetailComponent that calls it.
     */
    getHero(id: Number): Observable<Hero> {
        // For now, assume that a hero with the specified `id` always exists.
        // Error handling will be added in the next step of the tutorial.
        const hero = HEROES.find((h) => h.id === id)!;
        // The backtick ( ` ) characters define a JavaScript template literal for embedding the id.
        this.messageService.add(`HeroService: fetched hero id=${id}}`);
        return of(hero);
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }
}
