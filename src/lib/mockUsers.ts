export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coordinator';
  college: {
    name: string;
    category: string;
    location: string;
  };
}

// Mock user database - each college has 1 coordinator and 1 admin
export const mockUsers: User[] = [
  // IIT Delhi - Engineering College
  {
    id: '1',
    email: 'coordinator@iitdelhi.ac.in',
    name: 'Dr. Rajesh Kumar',
    role: 'coordinator',
    college: {
      name: 'Indian Institute of Technology Delhi',
      category: 'Engineering',
      location: 'New Delhi'
    }
  },
  {
    id: '2',
    email: 'admin@iitdelhi.ac.in',
    name: 'Prof. Sunita Sharma',
    role: 'admin',
    college: {
      name: 'Indian Institute of Technology Delhi',
      category: 'Engineering',
      location: 'New Delhi'
    }
  },
  
  // AIIMS Delhi - Medical College
  {
    id: '3',
    email: 'coordinator@aiims.edu',
    name: 'Dr. Priya Gupta',
    role: 'coordinator',
    college: {
      name: 'All India Institute of Medical Sciences Delhi',
      category: 'Medical',
      location: 'New Delhi'
    }
  },
  {
    id: '4',
    email: 'admin@aiims.edu',
    name: 'Dr. Anil Verma',
    role: 'admin',
    college: {
      name: 'All India Institute of Medical Sciences Delhi',
      category: 'Medical',
      location: 'New Delhi'
    }
  },
  
  // University of Delhi - University
  {
    id: '5',
    email: 'coordinator@du.ac.in',
    name: 'Prof. Meera Singh',
    role: 'coordinator',
    college: {
      name: 'University of Delhi',
      category: 'University',
      location: 'New Delhi'
    }
  },
  {
    id: '6',
    email: 'admin@du.ac.in',
    name: 'Prof. Vikram Chandra',
    role: 'admin',
    college: {
      name: 'University of Delhi',
      category: 'University',
      location: 'New Delhi'
    }
  }
];