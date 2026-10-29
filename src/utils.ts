import dayjs from 'dayjs';
import type { Training } from './types';

export function formatDateTime(date: string): string {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function customerName(training: Training): string {
  return training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : '';
}