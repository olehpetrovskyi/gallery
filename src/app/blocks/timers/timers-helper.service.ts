import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimersHelperService {

  constructor() { }

  getRandomDelay() {
    // random delay between 200 and 300 ms
    return Math.random() * 100 + 200;
  }
}
