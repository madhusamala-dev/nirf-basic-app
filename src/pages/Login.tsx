import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../context/AuthContext';
import { CollegeCategory } from '../lib/types';

const Login: React.FC = () => {
  const [collegeName, setCollegeName] = useState('');
  const [category, setCategory] = useState<CollegeCategory>('overall');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (collegeName.trim()) {
      login(collegeName.trim(), category);
    }
  };

  const categories: { value: CollegeCategory; label: string }[] = [
    { value: 'overall', label: 'Overall' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'management', label: 'Management' },
    { value: 'pharmacy', label: 'Pharmacy' },
    { value: 'medical', label: 'Medical' },
    { value: 'law', label: 'Law' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-900">NIRF Application</CardTitle>
          <CardDescription>
            National Institutional Ranking Framework
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                type="text"
                placeholder="Enter your college name"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Application Category</Label>
              <Select value={category} onValueChange={(value: CollegeCategory) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              Login to NIRF Portal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;