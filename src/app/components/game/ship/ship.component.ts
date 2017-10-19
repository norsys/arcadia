import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../services/category.service'
import { AuthService } from '../../../services/auth.service'
import { Category } from '../../../models/category'
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DisplayService } from '../../../services/display.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  providers: [CategoryService]

})
export class ShipComponent implements AfterContentInit {

  public galaxySelector: String;

  public categories: Array<Category>;

  constructor(private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private router: Router,
    private displayService: DisplayService) {
    this.categoryService.getAll().then((categories) => { this.categories = categories.json() });
    if (localStorage.getItem('galaxy-sector')) {
      this.galaxySelector = localStorage.getItem('galaxy-sector');
    } else {
      this.galaxySelector = "1";
    }
    this.displayService.setShowHeader(true);
  }

  goToPlanet(index) {
    if (index - 1 < this.categories.length) {
      this.router.navigate(['/planets', index]);
    } else {
      this.router.navigate(['/planets', 'comingsoon']);
    }
  }

  ngAfterContentInit() {
  }

  getPlanetImage(planet, index) {
    return this.sanitizer.bypassSecurityTrustStyle("url('/assets/img/fuel-gauges-" + index + ".png'), url('/assets/img/planets/planet-" + planet + ".png')");
  }

  swip(swipeDirection: string) {
    var _max_sector = 3;
    var _current_galaxy = document.querySelector('.outer-space-approached');
    var _galaxy_classes = _current_galaxy.classList;
    var _sector_number = parseInt(_current_galaxy.getAttribute('data-outer-space'));
    var _current_screen_planets = document.querySelector('.frame-container-active');

    if (swipeDirection == 'left' || swipeDirection == 'right') {
      if (swipeDirection == 'left') {
        _sector_number -= 1;
        if (_sector_number < 1) {
          _sector_number = _max_sector;
        }
      } else if (swipeDirection == 'right') {
        _sector_number += 1;
        if (_sector_number > _max_sector) {
          _sector_number = 1;
        }
      }

      _galaxy_classes.add('outer-space-leaving');
      _galaxy_classes.remove('outer-space-approached');
      _current_screen_planets.classList.remove('frame-container-active')

      setTimeout(() => {
        _galaxy_classes.add('outer-space-faraway');
        _galaxy_classes.remove('outer-space-leaving');
      }, 2750);

      var _next_galaxy;
      var _galaxies = document.querySelectorAll('.outer-space');

      for (var i = 0; i < _galaxies.length; i++) {
        var _galaxy = _galaxies[i];
        var _galaxy_number = parseInt(_galaxy.getAttribute('data-outer-space'));

        if (_galaxy_number == _sector_number) {
          _next_galaxy = _galaxy;
        }
      }

      var _screen_planets = document.querySelector(`[data-sector="${_sector_number}"]`);

      _next_galaxy.classList.add('outer-space-approaching');
      _next_galaxy.classList.remove('outer-space-faraway');
      _screen_planets.classList.add('frame-container-active');

      setTimeout(() => {
        _next_galaxy.classList.add('outer-space-approached');
        _next_galaxy.classList.remove('outer-space-approaching');
      }, 2750);
    }
  }

}
