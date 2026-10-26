import type { Customer, Training } from './types';

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export async function getCustomers(): Promise<Customer[]> {
  const response = await fetch(`${BASE_URL}/customers`);
  if (!response.ok) throw new Error('Error when fetching customers: ' + response.statusText);
  const data = await response.json();
  return data._embedded.customers;
}

export async function getTrainings(): Promise<Training[]> {
  const response = await fetch(`${BASE_URL}/gettrainings`);
  if (!response.ok) throw new Error('Error when fetching trainings: ' + response.statusText);
  return response.json();
}