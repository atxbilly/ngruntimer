import { Injectable } from '@angular/core';
import { MapsService } from './maps.service';
import * as moment from 'moment';
import 'moment-duration-format';

@Injectable({
  providedIn: 'root'
})
export class TimesService {

  constructor(public mapsService: MapsService) { }
  alltimes: Object[] = [];
  selectedmapTimes: Array<string[]>;
  milliTimes: Number[] = [];
  averageTime  = '';
  showTimes: Boolean;
  averageMilliTime: number;
  avgDifference: number;
  formatted_time = '00:00.00';
  elapsedTime = 0;
  bestTime = '';
  bestMilliTime: number;


  public getTimes(map) {
    this.selectedmapTimes = [];
    this.milliTimes = [];

    // Loop over the array of objects, allTimes.
    // [{"Burial Chambers": [runtime (in milli), the runtime's difference from average] }, ...{},{},{}]
    for (let i = 0; i < this.alltimes.length; i++) {
      // Find all times that match map parameter
      if (this.alltimes[i].hasOwnProperty(map)) {
        // If it does, loop over that time's keys (of which there is only one, the selected map)
        for (const key of Object.keys(this.alltimes[i])) {
          // Grab the runtime in milliseconds and push it to the array, milliTimes
          const runtime = this.alltimes[i][key][0];
          this.milliTimes.push(runtime);
          // Get average as a string (++Call is rendundant, move out of function++ call after getTimes)
          this.averageTime = this.avgTimes(this.milliTimes);
          // Set currently iterated time's difference from average in milliseconds (notice averageMILLItime, not averageTime)
          this.alltimes[i][key][1] = Math.floor(runtime - this.averageMilliTime);
          // Assign that value to the const diff
          const diff = this.alltimes[i][key][1];
          // Format diff as string
          const formattedDiff = this.milli2time(diff);
          // Push the currently iterated time as a string along with formattedDiff to the selectedmapTime's array
          this.selectedmapTimes.push([this.milli2time(runtime), formattedDiff]);
          // Loop over that array
          for (let j = 0; j < this.selectedmapTimes.length; j++) {
            // Get the runtime as a string
            const t = this.selectedmapTimes[j][0];
            // Convert that string into milliseconds
            const s = Number(t.split(':')[0]) * 60000;
            const r = Number(t.split(':')[1]) * 1000;
            const timeInMilli = s + r;
            // This is redundant DELETE?!
            this.selectedmapTimes[j][1] = this.milli2time(timeInMilli - this.averageMilliTime );

            // If the first character of the formatted difference from average is NOT negative, add a '+' to the beginning of that string
            if (this.selectedmapTimes[j][1][0] !== '-') {
              this.selectedmapTimes[j][1] = '+' + this.selectedmapTimes[j][1];
            }

          }
        }
      }
    }
    this.averageTime = this.avgTimes(this.milliTimes);
  }
  public milli2time(totalMilliseconds) {
    const duration = moment.duration(totalMilliseconds, 'milliseconds').format('mm:ss.SS', { trim: false });
    return duration;
  }
  public avgTimes(milliTimes) {
    let sum = 0;
    for (let i = 0; i < milliTimes.length; i++) {
      sum += milliTimes[i];
    }
    this.averageMilliTime = sum / milliTimes.length;
    return this.milli2time(this.averageMilliTime);
  }
  public getBest(milliTimes) {
    const arr = milliTimes;
    const min = Math.min(...arr);
    this.bestMilliTime = min;
    if (this.bestMilliTime !== Infinity) { 
      this.bestTime = this.milli2time(this.bestMilliTime);
    } else {this.bestTime = 'N/A'; }
  }
}

