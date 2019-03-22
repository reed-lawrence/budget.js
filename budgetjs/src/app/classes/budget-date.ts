import { BudgetEvent } from './budget-event';

export class BudgetDate {
  id: number;
  year: number;
  month: number;
  day: 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  date: number;
  events: BudgetEvent[];
}
