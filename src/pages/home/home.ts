import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PercentProvider } from '../../providers/percent/percent';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // private readonly context : CanvasRenderingContext2D;

  public currentDay;
  
  public start : any;
  public yearProgress : number;
  public monthProgress : number;
  public weekProgress : number;
  public dayProgress : number;

  constructor(public navCtrl: NavController,
  			  public pp : PercentProvider,
          ) {
    //this.context = this.canvas.getContext('2d');
    

  	this.year();
    this.month();
    this.week();
    this.day();
    

    
    // window.setInterval(()=>this.draw(),5);
   
  }

  year() :number {
  	// YEAR PROGRESS.
    if(this.yearProgress==100 || this.yearProgress>100){this.yearProgress=0;}
    this.currentDay = new Date();
	  this.start = new Date(this.currentDay.getFullYear(), 0, 0);
	  var diff = this.currentDay - this.start;
	  var oneDay = 1000 * 60 * 60 * 24;
	  var day = Math.floor(diff / oneDay);
	  var maxDays = new Date().getFullYear() % 4 == 0 ? 366 : 365;
	  this.yearProgress = this.pp.calculatePercent(day, maxDays);
    this.yearProgress = Math.round(this.yearProgress * 100)/100; //ROUNDING TO 2 DECIMALS
    console.log('year() reporting \n Day of year: ' + day + '\n TotalDaysThisYear : '+maxDays +'\nYear Progress: ', + this.yearProgress);
	  return this.yearProgress;
  }

  month() : number{
    if(this.monthProgress ==100 || this.monthProgress > 100) {this.monthProgress=0;}
    this.currentDay = new Date();
    var date = this.currentDay.getDate();
    var totalDays = new Date(this.currentDay.getFullYear(), this.currentDay.getMonth()+1, 0).getDate();
    this.monthProgress = this.pp.calculatePercent(date, totalDays);
    this.monthProgress = Math.round(this.monthProgress * 100)/100  //ROUNDING TO TWO DECIMALS
    console.log('month() reporting \n Date : '+date+ '\n TotalDaysthisMonth: ' +totalDays+'\n monthProgress: '+this.monthProgress);
    return this.monthProgress;


  }

  week() : number{
    if(this.weekProgress == 100 || this.weekProgress > 100){this.weekProgress = 0;}
    this.currentDay = new Date();
    var day = this.currentDay.getDay();
    var totalDays = 7;
    this.weekProgress = this.pp.calculatePercent(day,totalDays);
    this.weekProgress = Math.round(this.weekProgress * 100)/100;
    console.log('week() reporting' + '\n Day: '+ day + '\nTotalWeekdays: 7' + '\nweekProgress: '+ this.weekProgress);
    return this.weekProgress;
  }

  day(): number{
    if(this.dayProgress==100 || this.dayProgress>100){ this.dayProgress=0; }
    this.currentDay = new Date();
    var second = this.currentDay.getHours()*60*60 + this.currentDay.getMinutes()*60 + this.currentDay.getSeconds();

    var totalSeconds = 24*60*60;

    this.dayProgress = this.pp.calculatePercent(second,totalSeconds);
    this.dayProgress = Math.round(this.dayProgress * 100) / 100;

    console.log('day() reporting' + '\n seconds: '+ second + '\n TotalSeconds: ' + totalSeconds + '\ndayProgress: ' + this.dayProgress );

    return this.dayProgress;
  }

  draw(){
    this.yearProgress = this.year();
    this.monthProgress = this.month();
    this.weekProgress = this.week();
    this.dayProgress = this.day();
    setInterval(() => {
      this.draw();
    }, 1000);
  }
  ngOnInit() {
    // Test interval to show the progress bar
    setInterval(() => {
      this.draw();
    }, 1000);
  }

}

// // Below is the way to call animation
// const canvas = <HTMLCanvasElement>document.getElementById('canvasId');
// new HomePage(this.NavController,this.PercentProvider,canvas);
