import { Component, OnInit } from '@angular/core';
import {ComponentCanDeactivate, PendingChangesGuard} from '../guard';
import { Observable } from 'rxjs';
import { HostListener } from '@angular/core';
import { TimesService } from '../times.service';

@Component({
  selector: 'ngrt-mainwindow',
  templateUrl: './mainwindow.component.html',
  styles: []
})
export class MainwindowComponent implements OnInit, PendingChangesGuard {

  constructor(public timesService: TimesService) { }

  ngOnInit() {
    this.timesService.showTimes = false;
  }
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
  // insert logic to check if there are pending changes here;
  // returning true will navigate without confirmation
  // returning false will show a confirm dialog before navigating away
  return false;
  }
}
