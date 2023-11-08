import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
    heroes$!: Observable<Hero[]>;
    /**
     * The searchTerms property is an RxJS Subject.
     *
     * A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you
     * would any Observable.
     *
     * You can also push values into that Observable by calling its next(value) method as the search() method does.
     *
     * The event binding to the text box's input event calls the search() method.
     */
    private searchTerms = new Subject<string>();

    constructor(private heroService: HeroService) {}

    /**
     * Push a search term into the observable stream.
     *
     * Every time the user types in the text box, the binding calls search() with the text box value as a search term.
     * The searchTerms becomes an Observable emitting a steady stream of search terms.
     */
    search(term: string): void {
        this.searchTerms.next(term);
    }

    /**
     * Chaining RxJS operators
     * Passing a new search term directly to the searchHeroes() after every user keystroke creates excessive HTTP requests,
     * which taxes server resources and burns through data plans.
     *
     * Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce
     * the number of calls to the searchHeroes(). Ultimately, this returns an observable of timely hero search results
     * where each one is a Hero[].
     */
    ngOnInit(): void {
        /**
         * Each operator works as follows:
         * - debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along
         * the latest string. Requests aren't likely to happen more frequently than 300 ms.
         *
         * - distinctUntilChanged() ensures that a request is sent only if the filter text changed.
         *
         * - switchMap() calls the search service for each search term that makes it through debounce() and
         * distinctUntilChanged(). It cancels and discards previous search observables, returning only the latest search
         * service observable.
         *
         * With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call.
         * Even with a 300 ms pause between requests, you could have many HTTP requests in flight, and they may not
         * return in the order sent.
         *
         * switchMap() preserves the original request order while returning only the observable from the most recent
         * HTTP method call. Results from prior calls are canceled and discarded.
         *
         * Canceling a previous searchHeroes() Observable doesn't actually cancel a pending HTTP request. Unwanted
         * results are discarded before they reach your application code.
         *
         * Remember that the component class doesn't subscribe to the heroes$ observable. That's the job of the AsyncPipe
         * in the template.
         */
        this.heroes$ = this.searchTerms.pipe(
            // wait 300 ms after each keystroke before considering the term
            debounceTime(300),

            // ignore new term if same as previous term
            distinctUntilChanged(),

            // switch to new search observable each time the term changes
            switchMap((term: string) => this.heroService.searchHeroes(term))
        );
    }
}
