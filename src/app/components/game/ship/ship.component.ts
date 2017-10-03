import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var _outer_space;
    var _screen_sector;

    if (localStorage.getItem('galaxy-sector')) {
      _outer_space = document.querySelector(`.outer-space[data-outer-space="${localStorage.getItem('galaxy-sector')}"]`);
      _screen_sector = document.querySelector(`[ data-sector="${localStorage.getItem('galaxy-sector')}"]`);
      localStorage.removeItem('galaxy-sector');
    } else {
      _outer_space = document.querySelector(`.outer-space[data-outer-space="1"]`);
      _screen_sector = document.querySelector(`.frame-container[ data-sector="1"]`);
    }

    _outer_space.classList.add('outer-space-approached');
    _screen_sector.classList.add('frame-container-active');
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
