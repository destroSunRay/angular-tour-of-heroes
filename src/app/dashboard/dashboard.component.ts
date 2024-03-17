import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, HeroSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  getheroes(): void {
    this.heroService
      .getHeroes()
      .subscribe((data) => (this.heroes = data.slice(1, 5)));
  }

  ngOnInit(): void {
    this.getheroes();
  }
}
