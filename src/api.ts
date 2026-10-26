import type { Customer, CustomerData, Training, TrainingData } from './types';

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';
const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function request(url: string, options: RequestInit, action: string): Promise<Response> {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error when ${action}: ${response.statusText}`);
  return response;
}

// Customers

export async function getCustomers(): Promise<Customer[]> {
  const response = await request(`${BASE_URL}/customers`, {}, 'fetching customers');
  const data = await response.json();
  return data._embedded.customers;
}

export async function addCustomer(customer: CustomerData): Promise<void> {
  await request(
    `${BASE_URL}/customers`,
    { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(customer) },
    'adding customer',
  );
}

export async function updateCustomer(url: string, customer: CustomerData): Promise<void> {
  await request(
    url,
    { method: 'PUT', headers: JSON_HEADERS, body: JSON.stringify(customer) },
    'updating customer',
  );
}

export async function deleteCustomer(url: string): Promise<void> {
  await request(url, { method: 'DELETE' }, 'deleting customer');
}

// Trainings

export async function getTrainings(): Promise<Training[]> {
  const response = await request(`${BASE_URL}/gettrainings`, {}, 'fetching trainings');
  return response.json();
}

export async function addTraining(training: TrainingData): Promise<void> {
  await request(
    `${BASE_URL}/trainings`,
    { method: 'POST', headers: JSON_HEADERS, body: JSON.stringify(training) },
    'adding training',
  );
}

export async function deleteTraining(id: number): Promise<void> {
  await request(`${BASE_URL}/trainings/${id}`, { method: 'DELETE' }, 'deleting training');
}