import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  heroes: Hero[] = [];

  // The constructor expects Angular to inject the HeroService into a private heroService property.
  constructor(private heroService: HeroService) {}

  // The ngOnInit() lifecycle hook calls getHeroes().
  ngOnInit(): void {
    this.getHeroes();
  }

  // This getHeroes() returns the sliced list of heroes at positions 1 and 5, returning only Heroes two, three, four, and five.
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
