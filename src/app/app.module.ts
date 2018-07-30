import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import 'hammerjs';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatListModule,
  MatRadioModule,
  MatDividerModule,
  MatSortModule ,
  MatSelectModule, MatSidenavModule,
  MatProgressBarModule,
  MatAutocompleteModule} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatGridListModule, MatCheckboxModule, MatTableModule, MatSliderModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import {PendingChangesGuard} from './guard';
import { MapselectComponent } from './mapselect/mapselect.component';
import { TimerComponent } from './timer/timer.component';
import { TimesComponent } from './times/times.component';


@NgModule({
  declarations: [
    AppComponent,
    MainwindowComponent,
    HeaderComponent,
    FooterComponent,
    MapselectComponent,
    TimerComponent,
    TimesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    FlexLayoutModule,
    MatSelectModule,
    MatSliderModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [PendingChangesGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
