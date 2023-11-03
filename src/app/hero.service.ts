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

/**
 * This service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
 * This marks the class as one that participates in the dependency injection system.
 * The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
 * It doesn't have any dependencies yet.
 *
 * The @Injectable() decorator accepts a metadata object for the service, the same way the @Component() decorator did
 * for your component classes.
 */
@Injectable({
    providedIn: 'root',
})
export class HeroService {
    constructor() {}

    /**
     * The HeroService could get hero data from anywhere such as a web service, local storage, or a mock data source.
     *
     * Removing data access from components means you can change your mind about the implementation anytime,
     * without touching any components.
     *
     * The implementation in this tutorial continues to deliver mock heroes.
     */
    getHeores(): Hero[] {
        return HEROES;
    }
}
