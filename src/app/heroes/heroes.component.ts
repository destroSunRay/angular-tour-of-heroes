import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css',
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heros) => (this.heroes = heros));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (name) {
      this.heroService
        .addHero({ name } as Hero)
        .subscribe(() => this.getHeroes());
    }
  }

  delete(hero: Hero): void {
    this.heroService
      .deleteHero(hero)
      .subscribe(
        () => (this.heroes = this.heroes.filter((he) => hero.id !== he.id))
      );
  }
}
