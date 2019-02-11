import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PercentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PercentProvider {
  
  public percent;
  
  constructor(public http: Http) {
  }

  calculatePercent(currentval, maxVal) : number {

  	this.percent = ( currentval/maxVal ) * 100;
  	return this.percent;

  }

}
