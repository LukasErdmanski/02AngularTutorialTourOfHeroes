import { Component } from '@angular/core';
import { Hero } from '../hero';

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
    styleUrls: ['./heroes.component.css'],
})
// Always export the component class so you can import it elsewhere … like in the AppModule.
export class HeroesComponent {
    hero: Hero = {
        id: 1,
        name: 'Windsorm',
    };
}
