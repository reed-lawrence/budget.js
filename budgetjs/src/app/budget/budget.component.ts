import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetDate } from '../classes/budget-date';
import { BudgetEvent } from '../classes/budget-event';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor() { }

  @ViewChild('calendar') calendarEle: ElementRef;

  month = 2;
  year = 2019;
  monthDates: BudgetDate[] = [];



  daysInMonth(iMonth, iYear): number {
    return 32 - new Date(iYear, iMonth, 32).getDate();
  }

  getDayOfWeek(year: number, month: number, date: number):
    'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' {
    const dayOfWeek = new Date(year, month, date).getDay();
    switch (dayOfWeek) {
      case 0: {
        return 'Sunday';
      } case 1: {
        return 'Monday';
      } case 2: {
        return 'Tuesday';
      } case 3: {
        return 'Wednesday';
      } case 4: {
        return 'Thursday';
      } case 5: {
        return 'Friday';
      } case 6: {
        return 'Saturday';
      }
    }
  }

  weekFilter(monthDates: BudgetDate[], weekMax: number, weekMin = 0): BudgetDate[] {
    return monthDates.filter(d => d.id >= weekMin && d.id < weekMax);
  }

  generateCalendarDates(month: number, year: number): BudgetDate[] {
    const arr: BudgetDate[] = [];
    const firstDay = (new Date(year, month)).getDay();
    let date = 1;
    let idIndex = 0;
    const daysInMonth = this.daysInMonth(month, year);

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          arr.push({
            id: idIndex,
            date: null,
            day: null,
            events: null,
            month: null,
            year: null
          });
        } else if (date > daysInMonth) {
          arr.push({
            id: idIndex,
            date: null,
            day: null,
            events: null,
            month: null,
            year: null
          });
        } else {
          arr.push({
            id: idIndex,
            date: date,
            day: this.getDayOfWeek(year, month, date),
            events: [],
            month: month,
            year: year
          });
          date++;
        }
        idIndex++;
      }
    }
    console.log(arr);
    return arr;
  }

  ngOnInit() {
    this.monthDates = this.generateCalendarDates(this.month, this.year);
    // this.renderCalendar(this.calendarEle.nativeElement, this.month, this.year, this.monthDates);
  }

}
