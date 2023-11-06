/**
 * 1. Install the In-memory Web API package from npm with the following command:
 * 'npm install angular-in-memory-web-api --save'
 * 2. Generate the class src/app/in-memory-data.service.ts with the following command:
 * 'ng generate service InMemoryData'
 */
import { Injectable } from '@angular/core';
import { Hero } from './hero';

@Injectable({
    providedIn: 'root',
})
/* 'implements InMemoryDataService' required! */
export class InMemoryDataService implements InMemoryDataService {
    createDb() {
        const heroes = [
            { id: 12, name: 'Dr. Nice' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr. IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' },
        ];
        return { heroes };
    }

    // Overrides the genId method to ensure that a hero always has an id.
    // If the heroes array is empty,
    // the method below returns the initial number (11).
    // if the heroes array is not empty, the method below returns the highest
    // hero id + 1.
    genId(heroes: Hero[]): number {
        return heroes.length > 0 ? Math.max(...heroes.map((hero) => hero.id)) + 1 : 11;
    }
}
