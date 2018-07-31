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

  _elapsedTime = 0;
  _startTime;
  formatted_time = '00:00.00';
  intervalId;
  _isRunning = false;
  _paused = false;
  _pausetime;
  _avgDifference = 0;

  constructor(public mapsService: MapsService, public timesService: TimesService) { }

  start() {
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
  }

  stop() {
    clearInterval(this.intervalId);
    this._isRunning = false;
  }

  pause() {
    clearInterval(this.intervalId);
    this._paused = true;
    this._isRunning = false;
    this._pausetime = this._elapsedTime;
  }

  timeIt() {
   this._elapsedTime = Date.now() - this._startTime;
    this.formatted_time = this.milli2time(this._elapsedTime);
  }

  milli2time(totalMilliseconds) {
    const duration = moment.duration(totalMilliseconds, 'milliseconds').format('mm:ss.SS', { trim: false });
    return duration;
}
  save() {
    const maptopush = this.mapsService.selectedMap;
    let timetopush = this._elapsedTime;
    let maptimepair = {};
    maptimepair[maptopush] = [timetopush, this._avgDifference];

    if (this._elapsedTime !== 0) {
      if (this.mapsService.maps.includes(this.mapsService.selectedMap)) {
        this.timesService.alltimes.unshift(
          maptimepair
        );
        this.timesService.selectedmapTimes.unshift(
          maptimepair[maptopush]
        );
        this.formatted_time = '00:00.00';
        this.timesService.getTimes(this.mapsService.selectedMap);
        this.timesService.showTimes = true;
      } else {
        alert('Please choose a valid map.');
      }
      maptimepair = {};
      timetopush = 0;
      this._elapsedTime = 0;
      this._avgDifference = 0;
    }
  }

  ngOnInit() {
  }

}
