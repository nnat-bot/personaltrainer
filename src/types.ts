export type CustomerData = {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
};

export type Customer = CustomerData & {
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
};

export type Training = {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: CustomerData & { id: number };
};

export type TrainingData = {
  date: string;
  activity: string;
  duration: number;
  customer: string;
};