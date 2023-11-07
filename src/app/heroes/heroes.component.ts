import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

/**
 * You always import the Component symbol from the Angular core library and annotate the component class with @Component.
 * @Component is a decorator function that specifies the Angular metadata for the component.
 */
@Component({
    /**
     * The CSS element selector, 'app-heroes', matches the name of the HTML element that identifies this component within
     * a parent component's template.
     */
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    /**
     * You define private styles either inline in the @Component.styles array or as style sheet files identified in
     * the @Component.styleUrls array.
     * When the ng generate created the HeroesComponent, it created an empty heroes.component.css style sheet for
     * the HeroesComponent and pointed to it in @Component.styleUrls like this.
     * Styles and style sheets identified in @Component metadata are scoped to that specific component.
     * The heroes.component.css styles apply only to the HeroesComponent and don't affect the outer HTML or
     * the HTML in any other component.
     */
    styleUrls: ['./heroes.component.css'],
})
// Always export the component class so you can import it elsewhere … like in the AppModule.
export class HeroesComponent {
    heroes: Hero[] = [];

    /**
     * The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site.
     * When Angular creates a HeroesComponent, the Dependency Injection system sets the heroService parameter
     * to the singleton instance of HeroService.
     */
    constructor(private heroService: HeroService) {}

    /**
     * While you could call getHeroes() in the constructor, that's not the best practice.
     *
     * Reserve the constructor for minimal initialization such as wiring constructor parameters to properties.
     * The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests
     * to a remote server as a real data service would.
     *
     * Instead, call getHeroes() inside the ngOnInit lifecycle hook and let Angular call ngOnInit()
     * at an appropriate time after constructing a HeroesComponent instance.
     */
    ngOnInit() {
        this.getHeroes();
    }

    /**
     * Retrieves the heroes from the service.
     *
     * The previous version assigns an array of heroes to the component's heroes property. The assignment occurs
     * synchronously, as if the server could return heroes instantly or the browser could freeze the UI while it waited
     * or the server's response.
     *
     * That won't work when the HeroService is actually making requests of a remote server.
     *
     * The new version waits for the Observable to emit the array of heroes, which could happen now or several minutes
     * from now. The subscribe() method passes the emitted array to the callback, which sets the component's heroes property.
     *
     * This asynchronous approach works when the HeroService requests heroes from the server.
     */
    getHeroes(): void {
        this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
    }

    /**
     * Click event handler of the add button.
     *
     * When the given name isn't blank, the handler creates an object based on the hero's name. The handler passes
     * the object name to the service's addHero() method.
     *
     * When addHero() creates a new object, the subscribe() callback receives the new hero and pushes it into to
     * the heroes list for display.
     */
    add(name: string): void {
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.addHero({ name } as Hero).subscribe((hero) => {
            this.heroes.push(hero);
        });
    }

    /**
     * Click event handler to the button delete.
     *
     * Although the component delegates hero deletion to the HeroService, it remains responsible for updating its own
     * list of heroes. The component's delete() method immediately removes the hero-to-delete from that list,
     * anticipating that the HeroService succeeds on the server.
     *
     * There's really nothing for the component to do with the Observable returned by heroService.deleteHero() but it
     * must subscribe anyway.
     */
    delete(hero: Hero): void {
        this.heroes = this.heroes.filter((h) => h !== hero);
        /**
         * If you neglect to subscribe(), the service can't send the delete request to the server. As a rule,
         * an Observable does nothing until something subscribes.
         *
         * Confirm this for yourself by temporarily removing the subscribe(), clicking Dashboard, then clicking Heroes.
         * This shows the full list of heroes again.
         */
        this.heroService.deleteHero(hero.id).subscribe();
    }
}
