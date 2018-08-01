import { Component, OnInit } from '@angular/core';
import { MapsService } from '../maps.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TimesService } from '../times.service';

@Component({
  selector: 'ngrt-mapselect',
  templateUrl: './mapselect.component.html',
  styles: []
})
export class MapselectComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = this.mapsService.maps;
  filteredOptions: Observable<string[]>;

  constructor(public mapsService: MapsService, public timesService: TimesService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.onChange();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  public onChange(): void {
    this.myControl.valueChanges.subscribe(map => {
      if (this.mapsService.maps.includes(map)) {
        this.mapsService.selectedMap = map;
        this.timesService.averageTime = '';
        this.timesService.formatted_time = '00:00.00';
        this.timesService.elapsedTime = 0;
        this.timesService.getTimes(map);
        this.timesService.getBest(this.timesService.milliTimes);
      }
    });
  }
}
