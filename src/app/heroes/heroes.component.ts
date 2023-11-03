import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HEROES } from '../mock-heroes';

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
    heroes = HEROES;
}
