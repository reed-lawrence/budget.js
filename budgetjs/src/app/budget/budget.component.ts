import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BudgetDate } from '../classes/budget-date';
import { BudgetEvent } from '../classes/budget-event';
import * as $ from 'jquery';
import 'bootstrap';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  animations: [
    trigger('slideDown', [
      state('void', style({ height: '0px', overflowY: 'hidden' })),
      transition(':enter, :leave', [
        animate('150ms ease')
      ])
    ])
  ]
})
export class BudgetComponent implements OnInit {

  constructor() { }

  month = 2;
  year = 2019;
  monthDates: BudgetDate[] = [];
  events: BudgetEvent[] = [];

  // Modal elements
  @ViewChild('dateModal') dateModalEle: ElementRef;
  dateDetails: BudgetDate = null;
  newEventInProgress = false;
  newEvent: BudgetEvent = null;

  editEventInProgress = false;
  editEvent: BudgetEvent = null;

  hoverDate: BudgetDate = null;

  // Tooltip hover
  @ViewChild('calendarDatePreview') calendarDatePreviewEle: ElementRef;

  updateCalendarTooltip(date: BudgetDate, event: any) {
    if(date.date !== null){
      $(this.calendarDatePreviewEle.nativeElement).css('left', event.pageX).css('top', event.pageY + 50).css('opacity', 1);
    } else {
      $(this.calendarDatePreviewEle.nativeElement).css('opacity', 0);
    }
   
    if(this.hoverDate === null) {
      this.hoverDate = date;
    }

    if(this.hoverDate.id !== date.id){
      this.hoverDate = date;
    }
    // console.log(event);
  }

  unsetEditEvent() {
    this.editEvent = {
      amount: null,
      dates: [],
      description: null,
      id: -1,
      name: null,
      recurring: false,
      type: null
    };
  }

  setEditEvent(event: BudgetEvent) {
    this.editEvent = JSON.parse(JSON.stringify(event));
  }

  saveEditEvent(payload: { event: BudgetEvent, date: BudgetDate }) {
    this.events[this.events.findIndex(e => e.id === payload.event.id)] = JSON.parse(JSON.stringify(payload.event));
    this.dateDetails.events[this.dateDetails.events.findIndex(e => e.id === payload.event.id)] = JSON.parse(JSON.stringify(payload.event));
    const dateIndex = this.monthDates.findIndex(d => d.id === payload.date.id);
    this.monthDates[dateIndex].events[this.monthDates[dateIndex].events.findIndex(e => e.id === payload.event.id)] = JSON.parse(JSON.stringify(payload.event));
    this.unsetEditEvent();
  }

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
    let date = new Date(year, month).getTime();
    let idIndex = 0;
    const daysInMonth = this.daysInMonth(month, year);

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        // if (i === 0 && j < firstDay) {
        //   arr.push({
        //     id: idIndex,
        //     date: null,
        //     day: null,
        //     events: [],
        //     month: null,
        //     year: null
        //   });
        // } else if (date > daysInMonth) {
        //   arr.push({
        //     id: idIndex,
        //     date: null,
        //     day: null,
        //     events: null,
        //     month: null,
        //     year: null
        //   });
        // } else {
        //   arr.push({
        //     id: idIndex,
        //     date: new Date(year, month, date).getTime(),
        //     day: this.getDayOfWeek(year, month, date),
        //     events: [],
        //     month: month,
        //     year: year
        //   });
        //   date++;
        // }
        // idIndex++;
        arr.push({
          id: null,
          date: date,
          day: null,
          events: [],
          month: null,
          year: null
        })
        date += 86400000;
      }
    }
    console.log(arr);
    return arr;
  }

  viewDateDetails(date: BudgetDate) {
    this.dateDetails = JSON.parse(JSON.stringify(date));
    this.newEvent = {
      dates: [],
      description: null,
      id: null,
      name: null,
      recurring: false,
      type: null,
      amount: null
    };
    $(this.dateModalEle.nativeElement).modal('show');
  }

  createEvent(payload: { event: BudgetEvent, date: BudgetDate }) {
    // Assign a unique id
    let eventId = 1;
    while (this.events.findIndex(e => e.id === eventId) !== -1) {
      eventId++;
    }

    payload.event.id = eventId;
    console.log(payload.event);
    this.events.push(JSON.parse(JSON.stringify(payload.event)));

    this.dateDetails.events.push(JSON.parse(JSON.stringify(payload.event)));
    this.monthDates[this.monthDates.findIndex(d => d.id === payload.date.id)].events.push(JSON.parse(JSON.stringify(payload.event)));
    this.newEventInProgress = false;
    this.newEvent = {
      amount: null,
      dates: [],
      description: null,
      id: null,
      name: null,
      recurring: false,
      type: null
    };
  }

  ngOnInit() {
    this.monthDates = this.generateCalendarDates(this.month, this.year);
    const testEvent: BudgetEvent = {
      amount: 1500,
      dates: [],
      description: null,
      id: 1,
      name: 'Paycheck',
      recurring: false,
      type: 'deposit'
    };
    this.events.push(testEvent)
    this.monthDates[5].events.push(testEvent);
    this.unsetEditEvent();

    $(this.dateModalEle.nativeElement).on('hidden.bs.modal', (e) => {
      this.newEventInProgress = false;
    });
  }

}
