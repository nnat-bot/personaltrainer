import dayjs from 'dayjs';
import { groupBy, sumBy } from 'lodash-es';
import type { ActivityMinutes, Training } from './types';

export function formatDateTime(date: string): string {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function customerName(training: Training): string {
  return training.customer ? `${training.customer.firstname} ${training.customer.lastname}` : '';
}

export function minutesByActivity(trainings: Training[]): ActivityMinutes[] {
  const trainingsByActivity = groupBy(trainings, training => training.activity.trim());
  return Object.entries(trainingsByActivity)
    .map(([activity, activityTrainings]) => ({
      activity,
      minutes: sumBy(activityTrainings, 'duration'),
    }))
    .sort((a, b) => b.minutes - a.minutes);
}