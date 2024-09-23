import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Admin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get(`${server_url}/stats`)
      .then((res) => {
        console.log(res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (<>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Total Revenue</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p className="text-xl font-medium">₹{stats.data.totalRevenue}/-</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Total Students</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <ul className="space-y-2">
            <li>Total: {stats.data.totalStudents.total}</li>
            <li>Male: {stats.data.totalStudents.male}</li>
            <li>Female: {stats.data.totalStudents.female}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <Link
          to="/admin/Accommodation"
          className="text-blue-500 hover:underline"
        >
          <h2 className="text-2xl font-semibold mb-2">Accommodation</h2>
        </Link>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <ul className="space-y-2">
            <li>Total: {stats.data.accommodation.total}</li>
            <li>Male: {stats.data.accommodation.male}</li>
            <li>Female: {stats.data.accommodation.female}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Meal Requirements</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <ul className="space-y-2">
            <li>Breakfast: {stats.data.mealRequirements.breakfast}</li>
            <li>Lunch: {stats.data.mealRequirements.lunch}</li>
            <li>Dinner: {stats.data.mealRequirements.dinner}</li>
          </ul>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Sport Participation</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left bg-gray-200">Category</th>
                <th className="px-4 py-2 text-left bg-gray-200">Teams</th>
                <th className="px-4 py-2 text-left bg-gray-200">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {stats.data.sportParticipation.map((sport, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">
                    <Link
                      to={`/admin/${sport.category}`}
                      className="text-blue-500 hover:underline"
                    >
                      {sport.category}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{sport.teams}</td>
                  <td className="px-4 py-2">₹{sport.revenue}/-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">College Participation</h2>
        <div className="p-4 bg-white rounded-lg shadow-md">
          {Object.keys(stats.data.collegeParticipation).length === 0 ? (
            <p>No college participation data available.</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(stats.data.collegeParticipation).map(
                ([college, count], index) => (
                  <li key={index}>
                    {college}: {count}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
 </> );
}
