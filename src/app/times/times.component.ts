import { Component, OnInit } from '@angular/core';
import { TimesService } from '../times.service';
import { MapsService } from '../maps.service';

@Component({
  selector: 'ngrt-times',
  templateUrl: './times.component.html',
  styles: []
})
export class TimesComponent implements OnInit {

  timesToDelete: String[] = [];


  constructor(public timesService: TimesService, public mapsService: MapsService) { }

  ngOnInit() {
  }

  onNgModelChange(event) {
  }

  deleteTime() {
    this.timesToDelete.forEach(item => {
      const index: number = this.timesService.selectedmapTimes.findIndex(d => d[0] === item[0]);
      if (index > -1) {
        this.timesService.selectedmapTimes.splice(index, 1);
      }
    });
    this.timesToDelete.forEach(itemToDelete => {
      this.timesService.alltimes.forEach(time => {
        if (time.hasOwnProperty(this.mapsService.selectedMap)) {
          const val = time[this.mapsService.selectedMap][0];
          const formattedVal = this.timesService.milli2time(val);
          if (formattedVal === itemToDelete[0]) {
            const map = this.mapsService.selectedMap;
            const allindex: number = this.timesService.alltimes.findIndex(function(element, index, array) {
              return element[map][0] === val; });
            if (allindex > -1) {
              this.timesService.alltimes.splice(allindex, 1);
              this.timesService.getTimes(this.mapsService.selectedMap);
              this.timesService.getBest(this.timesService.milliTimes);
            }
          }
        }
      });
    });
    this.timesService.getBest(this.timesService.milliTimes);
  }
}

