import { Link } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkContext";

const EmployeeCard = ({ user }) => {
  const { addBookmark } = useBookmarks();

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-4">
        <img src={user.image} alt={user.firstName} className="w-14 h-14 rounded-full" />
        <div>
          <h2 className="font-bold">{user.firstName} {user.lastName}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-2 text-sm">
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Dept:</strong> {user.company.department}</p>
      </div>
      <div className="mt-2">
        {Array.from({ length: user.rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <Link to={`/employee/${user.id}`} className="text-blue-500">View</Link>
        <button onClick={() => addBookmark(user)} className="text-green-600">Bookmark</button>
        <button className="text-purple-600">Promote</button>
      </div>
    </div>
  );
};

export default EmployeeCard;
