import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculadora';
  datePipe: DatePipe = new DatePipe('en-US');

  // method to get formatted date
  getFormattedDate(){
    var date = new Date();
    var transformDate = this.datePipe.transform(date, 'dd/MM/yyyy');
    return transformDate;
  }
}
