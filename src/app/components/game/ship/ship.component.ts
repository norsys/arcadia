import { Component} from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  providers: [CategoryService]

})
export class ShipComponent {

  public galaxySelector: String;

  public categories: Array<Category>;

  private nbrOuterSpace: number;

  constructor(private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private router: Router,
    private displayService: DisplayService) {
    this.categoryService.getAll().then((categories) => {
      this.categories = categories.json(),
        this.nbrOuterSpace = Math.ceil(this.categories.length / 3);
    });
    if (localStorage.getItem('galaxy_arcadia') === null){
      localStorage.setItem('galaxy_arcadia', '1');
    }
    this.galaxySelector = localStorage.getItem('galaxy_arcadia');
    this.displayService.setShowHeader(true);
  }

  goToPlanet(index) {
    if (index - 1 < this.categories.length) {
      this.router.navigate(['/planets', index]);
    } else {
      this.router.navigate(['/planets', 'comingsoon']);
    }
  }

  getPlanetImage(planet, index) {
    return this.sanitizer.bypassSecurityTrustStyle('url(\'/assets/img/fuel-gauges-' + index + '.png\'), url(\'/assets/img/planets/planet-' + planet + '.png\')');
  }

  getCategoriesBySpace(number) {
    switch (number) {
      case 1: return this.categories.slice(0, this.nbrOuterSpace);
      case 2: return this.categories.slice(this.nbrOuterSpace, this.nbrOuterSpace * 2);
      case 3: return this.categories.slice(this.nbrOuterSpace * 2, this.nbrOuterSpace * 3);
    }
  }
  swip(swipeDirection: string) {
    const _current_galaxy = document.querySelector('.outer-space-approached');
    const _galaxy_classes = _current_galaxy.classList;
    //var _sector_number = parseInt(_current_galaxy.getAttribute('data-outer-space'));
    let _sector_number = parseInt(localStorage.getItem('galaxy_arcadia'));

    const _current_screen_planets = document.querySelector('.frame-container-active');

    if (swipeDirection == 'left' || swipeDirection == 'right') {
      if (swipeDirection == 'left') {
        _sector_number -= 1;
        if (_sector_number < 1) {
          _sector_number = this.nbrOuterSpace;
        }
      } else if (swipeDirection == 'right') {
        _sector_number += 1;
        if (_sector_number > this.nbrOuterSpace) {
          _sector_number = 1;
        }
      }

      _galaxy_classes.add('outer-space-leaving');
      _galaxy_classes.remove('outer-space-approached');
      _current_screen_planets.classList.remove('frame-container-active');

      setTimeout(() => {
        _galaxy_classes.add('outer-space-faraway');
        _galaxy_classes.remove('outer-space-leaving');
      }, 2750);

      let _next_galaxy;
      const _galaxies = document.querySelectorAll('.outer-space');

      for (let i = 0; i < _galaxies.length; i++) {
        const _galaxy = _galaxies[i];
        const _galaxy_number = parseInt(_galaxy.getAttribute('data-outer-space'));

        if (_galaxy_number == _sector_number) {
          _next_galaxy = _galaxy;
        }
      }

      const _screen_planets = document.querySelector(`[data-sector="${_sector_number}"]`);

      _next_galaxy.classList.add('outer-space-approaching');
      _next_galaxy.classList.remove('outer-space-faraway');
      _screen_planets.classList.add('frame-container-active');


      localStorage.setItem('galaxy_arcadia', _sector_number.toString());

      setTimeout(() => {
        _next_galaxy.classList.add('outer-space-approached');
        _next_galaxy.classList.remove('outer-space-approaching');
      }, 2750);
    }
  }

}
