import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DisplayService } from '../../../services/display.service';
import { ImagesService } from '../../../services/images.service';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss'],
  providers: [CategoryService, ImagesService]

})
export class ShipComponent  {

  public galaxySelector: String;

  public categories: Array<Category>;
  public categs: Array<Category>;

  private nbrOuterSpace: number;

  private classNumber: number;

  public clicked: boolean;
  public click = false;
  public clickedPlanet: boolean;
  donneeImg = [];
  nbrScreen = [];

  constructor(private sanitizer: DomSanitizer,
    private categoryService: CategoryService,
    private router: Router,
    private displayService: DisplayService,
    private imageService: ImagesService) {
    this.categoryService.getAll().then((categories) => {
      this.categories = categories.json(),
        this.nbrOuterSpace = Math.ceil(this.categories.length / 3);
      this.nbrScreen = Array.from({ length: this.nbrOuterSpace }, (v, k) => k + 1);

      this.categs = categories;
      this.getImages();
    });
    if (localStorage.getItem('galaxy_arcadia') === null) {
      localStorage.setItem('galaxy_arcadia', '1');
    }
    this.galaxySelector = localStorage.getItem('galaxy_arcadia');
    this.displayService.setShowHeader(true);
    this.classNumber = 0;
  }

  goToPlanet(index) {
    this.animate('#id-' + index, 'planet-click-animat');
    this.animate('#id' + index, 'planet-click-animat');
    this.clickedPlanet = true;
    if (index - 1 < this.categories.length) {
      this.router.navigate(['/planets', index]);
    } else {
      this.router.navigate(['/planets', 'comingsoon']);
    }
  }

  getCategoriesBySpace(number) {

    return this.categories.slice((number - 1) * 3, number * 3);

  }

  swip(swipeDirection: string, btnClicked: string) {
    const _current_galaxy = document.querySelector('.outer-space-approached');
    const _galaxy_classes = _current_galaxy.classList;
    let _sector_number = parseInt(localStorage.getItem('galaxy_arcadia'));

    const _current_screen_planets = document.querySelector('.frame-container-active');
    if (btnClicked == 'left' || btnClicked == 'right') {
      var btn_click;
      if (swipeDirection == 'left') {
        btn_click = document.querySelector('#btn-navigation-left');
      } else if (swipeDirection == 'right') {
        btn_click = document.querySelector('#btn-navigation-right');
      }
    }
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

  aide() {
    this.clicked = true;
    this.router.navigate(['/aide']);
  }

  animate(id: string, classcss: string) {
    let btnclick = document.querySelector(id).classList;
    btnclick.add(classcss);
    setTimeout(() => {
      btnclick.remove(classcss);
    }, 2000);
  }

  getImages() {
    var i = 0;
    while (i < this.categories.length) {
      let categ = this.categories[i];
      this.imageService.getImage(categ.image).then((res: any) => {
        const blob = new Blob([res._body], {
          type: res.headers.get('Content-Type')
        });
        const urlCreator = window.URL;
        this.donneeImg[categ.id] = this.sanitizer.bypassSecurityTrustStyle('url(' + urlCreator.createObjectURL(blob) + ')');
      });
      i++;
    }
  }



  getClass(number) {
    if (number % 3 === 0) {
      return 1;
    }
    if (number % 3 === 1) {
      return 2;
    }
    if (number % 3 === 2) {
      return 3;
    }
  }

}
