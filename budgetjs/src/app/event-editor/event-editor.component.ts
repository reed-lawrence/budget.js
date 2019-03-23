import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetEvent } from '../classes/budget-event';
import { BudgetDate } from '../classes/budget-date';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  constructor() { }

  @Input() date: BudgetDate;
  @Input() event: BudgetEvent;
  @Input() type: 'new' | 'edit';

  @Output() onSave = new EventEmitter<{event: BudgetEvent, date: BudgetDate}>();
  @Output() onCancel = new EventEmitter<any>();

  ngOnInit() {
  }

}
