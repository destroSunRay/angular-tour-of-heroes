import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private heroService: HeroService
  ) {}

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((h) => (this.hero = h));
  }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }
}
