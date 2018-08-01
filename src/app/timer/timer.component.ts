import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment-duration-format';
import { MapsService } from '../maps.service';
import { TimesService } from '../times.service';

@Component({
  selector: 'ngrt-timer',
  templateUrl: './timer.component.html',
  styles: []
})
export class TimerComponent implements OnInit {

  _startTime;
  // formatted_time = '00:00.00';
  intervalId;
  _isRunning = false;
  _paused = false;
  _pausetime;
  _avgDifference = 0;

  constructor(public mapsService: MapsService, public timesService: TimesService) { }

  start() {
    if (this.mapsService.selectedMap !== '') {
      if (this._isRunning === false) {
        if (this._paused === false) {
          this._startTime = Date.now();
        } else { this._startTime = Date.now() - this._pausetime; }
        this.intervalId = setInterval(() => {
          this.timeIt();
        }, 10);
      }
      this._isRunning = true;
      this._paused = false;
    } else {
      alert('Choose a map.');
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this._isRunning = false;
  }

  pause() {
    if (this._isRunning === true) {
      clearInterval(this.intervalId);
      this._paused = true;
      this._isRunning = false;
      this._pausetime = this.timesService.elapsedTime;
    }
  }

  timeIt() {
   this.timesService.elapsedTime = Date.now() - this._startTime;
    this.timesService.formatted_time = this.milli2time(this.timesService.elapsedTime);
  }

  milli2time(totalMilliseconds) {
    const duration = moment.duration(totalMilliseconds, 'milliseconds').format('mm:ss.SS', { trim: false });
    return duration;
}
  save() {
    console.log(this.timesService.elapsedTime);
    const maptopush = this.mapsService.selectedMap;
    let timetopush = this.timesService.elapsedTime;
    let maptimepair = {};
    maptimepair[maptopush] = [timetopush, this._avgDifference];

    if (this.timesService.elapsedTime !== 0) {
      if (this.mapsService.maps.includes(this.mapsService.selectedMap)) {
        this.timesService.alltimes.unshift(
          maptimepair
        );
        this.timesService.selectedmapTimes.unshift(
          maptimepair[maptopush]
        );
        this.timesService.formatted_time = '00:00.00';
        this.timesService.getTimes(this.mapsService.selectedMap);
        this.timesService.getBest(this.timesService.milliTimes);
        this.timesService.showTimes = true;
      } else {
        alert('Please choose a valid map.');
      }
      maptimepair = {};
      timetopush = 0;
      this.timesService.elapsedTime = 0;
      this._avgDifference = 0;
    }
  }

  ngOnInit() {
    this.timesService.formatted_time = '00:00.00';
  }

}
