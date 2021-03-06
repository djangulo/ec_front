import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { HomeImage } from './home-image.model';
import { HomeImageService } from './home-image.service';

import { Animations } from './../animations';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ HomeImageService ],
  animations: [
    Animations.fade,
    Animations.parallax
  ]
})
export class HomeComponent implements OnInit, OnDestroy {
  images: HomeImage[];
  currentImage: HomeImage;
  index: number;
  fadeState: string;
  parallaxState: string;
  @ViewChild('theDiv') div: ElementRef;

  constructor(
    private homeImageService: HomeImageService,
    private sanitizer: DomSanitizer
  ) {
    setInterval(() => {this.fadeState = 'invisible';}, 29000);
    setInterval(() => {this.rotateImages();  this.parallaxState = 'reset';}, 29700);
    setInterval(() => {this.fadeState = 'visible'; this.parallaxState = 'do';}, 30000);
  }


  ngOnInit() {
    this.fadeState = 'invisible';
    this.parallaxState = 'reset';
    this.getHomeImages();
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.fadeState = 'invisible';
  }

  getHomeImages(): void {
    this.homeImageService
      .getImages()
      .then((images) => {
        this.images = images;
        this.index = 0;
        this.currentImage = images[this.index];
        this.updateBackground();
        this.fadeState = 'visible';
        this.parallaxState = 'do';
      });
  }

  increaseIndex() {
    const i = this.images.length - 1;
      if(this.index === i){
        this.index = 0;
      }else{
        this.index++;
      }
    return this.index
  }

  rotateImages() {
    this.currentImage = this.images[this.increaseIndex()]
    this.updateBackground();
 }
  updateBackground(){
    this.div.nativeElement.style.backgroundImage = `url(${this.currentImage.image})`;
  }
  getBackground (image) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${image})`);
  }

}
