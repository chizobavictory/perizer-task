type Team = {
  id: number;
  name: string;
  description: string;
};

type User = {
  _id: string;
  isActive: boolean;
  picture: string;
  team: number;
  role: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
  location: string;
};

type SearchQueryParams = {
  name?: string;
  email?: string;
  gender?: string;
  role?: string;
  team?: string;
};