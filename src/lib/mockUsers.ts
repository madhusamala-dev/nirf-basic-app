export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'coordinator';
  college: string;
}

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    username: 'coord1',
    email: 'coordinator1@iitdelhi.ac.in',
    password: 'demo123',
    role: 'coordinator',
    college: 'IIT Delhi'
  },
  {
    id: '2',
    name: 'Prof. Priya Sharma',
    username: 'coord2',
    email: 'coordinator2@iitbombay.ac.in',
    password: 'demo123',
    role: 'coordinator',
    college: 'IIT Bombay'
  },
  {
    id: '3',
    name: 'Dr. Amit Singh',
    username: 'coord3',
    email: 'coordinator3@iitkanpur.ac.in',
    password: 'demo123',
    role: 'coordinator',
    college: 'IIT Kanpur'
  },
  {
    id: '4',
    name: 'Admin User',
    username: 'admin1',
    email: 'admin@nirf.gov.in',
    password: 'demo123',
    role: 'admin',
    college: 'NIRF Administration'
  }
];