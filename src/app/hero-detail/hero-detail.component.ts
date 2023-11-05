/**
 * The router creates the HeroDetailComponent in response to a URL such as ~/detail/12.
 * 
 * The HeroDetailComponent needs a new way to get the hero to display. Is does it in the follwing way: 
 * - Get the route that created it
 * - Extract the id from the route
 * - Get the hero with that id from the server using the HeroService
 */
import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
    hero: Hero | undefined;

    /**
     * The ActivatedRoute, HeroService, and Location services injected into the constructor, saving their values in
     * private fields.
     */
    constructor(
        /**
         * The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
         * This component is interested in the route's parameters extracted from the URL. The "id" parameter is the id
         * of the hero to display.
         */
        private route: ActivatedRoute,
        /**
         * The HeroService gets hero data from the remote server and this component uses it to get the hero-to-display.
         */
        private heroService: HeroService,
        /**
         * The location is an Angular service for interacting with the browser. This service lets you navigate back to the previous view.
         */
        private location: Location
    ) {}

        ngOnInit():void {
            this.getHero();
        }

        getHero(): void {
            /**
             * The route.snapshot is a static image of the route information shortly after the component was created.
             * 
             * The paramMap is a dictionary of route parameter values extracted from the URL. The "id" key returns the id
             * of the hero to fetch.
             * 
             * Route parameters are always strings. The JavaScript Number function converts the string to a number, 
             * which is what a hero id should be.
             */
            const id = Number(this.route.snapshot.paramMap.get('id'));
            this.heroService.getHero(id).
                subscribe(hero => this.hero = hero);
        }

        /**
         * Navigates backward one step in the browser's history stack using the Location service is injected here.
         */
        goBack(): void {
            this.location.back();
        }
}
