import { Component } from '@angular/core';
import { Refresher, reorderArray } from 'ionic-angular';

import { ANIMALS } from '../../data/data.animals';
import { Animal } from '../../interfaces/animal.interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animals: Animal[] = [];
  audio = new Audio();
  audioTime: any;
  orderingAnimals: boolean = false;

  constructor() {
    this.animals = [...ANIMALS];
  }

  reproduce( animal:Animal ) {

    if( animal.reproducing ) {
      this.pauseAudio();
      return;
    }

    this.pauseAudio();

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproducing = true;

    this.audioTime = setTimeout( () => animal.reproducing = false, animal.duration * 1000)
  }

  private pauseAudio () {
    clearTimeout( this.audioTime );

    this.audio.pause();
    this.audio.currentTime = 0;

    this.animals
      .map((animal) => {
        animal.reproducing = false
        return animal
      })
  }

  deleteAnimal( index:number ) {
    this.animals.splice(index, 1)
  }

  fetchAnimals( refresher:Refresher ) {
    setTimeout( () => {
      this.animals = [...ANIMALS];
      refresher.complete();
    }, 1500);
  }

  reorderAnimals( indexes ) {
    this.animals = reorderArray(this.animals, indexes);
  }
}
