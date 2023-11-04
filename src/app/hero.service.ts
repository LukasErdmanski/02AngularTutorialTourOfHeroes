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

/**
 * This service imports the Angular Injectable symbol and annotates the class with the @Injectable() decorator.
 * This marks the class as one that participates in the dependency injection system.
 * The HeroService class is going to provide an injectable service, and it can also have its own injected dependencies.
 * It doesn't have any dependencies yet.
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
 * injectsinto any class that asks for it. Registering the provider in the @Injectable metadata also allows Angular
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
     * A parameter declares a private messageService property. Angular injects the singleton MessageService into
     * that property when it creates the HeroService.
     * 
     * This is an example of a typical service-in-service scenario in which you inject the MessageService into 
     * the HeroService which is injected into the HeroesComponent.
     */
    constructor(private messageService: MessageService) {}

    /**
     * The HeroService could get hero data from anywhere such as a web service, local storage, or a mock data source.
     *
     * Removing data access from components means you can change your mind about the implementation anytime,
     * without touching any components.
     *
     * The implementation in this tutorial continues to deliver mock heroes.
     */
    getHeroes(): Observable<Hero[]> {
        /**
         * This tutorial simulates getting data from the server with the RxJS of() function
         * of(HEROES) returns an Observable<Hero[]> that emits a single value, the array of mock heroes.
         * 
         * https://rxjs.dev/api/index/function/of
         */
        const heroes: Observable<Hero[]> = of(HEROES);
        // Send a message when the heroes are fetched.
        this.messageService.add('HeroService: fetched heroes')
        return heroes;
    }
}
