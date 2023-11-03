import { Component, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
    /**
     * The hero property must be an Input property, annotated with the @Input() decorator, because
     * the external HeroesComponent binds to it.
     *
     * 'hero' corresponds to the 'selectedHero' from HeroesComponent', so it is not assigned to any value
     * since there is no selected hero when the application starts. So it is initially undefined.
     */
    @Input() hero?: Hero;
}
