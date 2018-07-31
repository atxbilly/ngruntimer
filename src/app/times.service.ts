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


  public getTimes(map) {
    this.selectedmapTimes = [];
    this.milliTimes = [];

    for (let i = 0; i < this.alltimes.length; i++) {
      if (this.alltimes[i].hasOwnProperty(map)) {
        for (const key of Object.keys(this.alltimes[i])) {
          const runtime = this.alltimes[i][key][0];
          this.milliTimes.push(runtime);
          this.averageTime = this.avgTimes(this.milliTimes);
          this.alltimes[i][key][1] = Math.floor(runtime - this.averageMilliTime);
          const diff = this.alltimes[i][key][1];
          const formattedDiff = this.milli2time(diff);
          this.selectedmapTimes.push([this.milli2time(runtime), formattedDiff]);
          for (let j = 0; j < this.selectedmapTimes.length; j++) {
            const t = this.selectedmapTimes[j][0];
            const s = Number(t.split(':')[0]) * 60000;
            const r = Number(t.split(':')[1]) * 1000;
            const timeInMilli = s + r;
            this.selectedmapTimes[j][1] = this.milli2time(timeInMilli - this.averageMilliTime );
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
}
