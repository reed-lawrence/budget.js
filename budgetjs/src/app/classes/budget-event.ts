import { BudgetDate } from './budget-date';

export class BudgetEvent {
  id: number;
  recurring: boolean;
  dates: BudgetDate[];
  name: string;
  description: string;
  type: 'deposit' | 'payment';
  amount: number;
}
