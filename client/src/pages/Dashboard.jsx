import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then(res => res.json())
      .then(data => {
        const modified = data.users.map(user => ({
          ...user,
          rating: Math.ceil(Math.random() * 5) // mock performance
        }));
        setUsers(modified);
      });
  }, []);

  return (
    <div className="grid gap-4 p-6 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <EmployeeCard key={user.id} user={user} />
      ))}
    </div>
  );
}
