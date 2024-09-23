import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Category() {
  const { category } = useParams();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server_url}/teams/${category}`)
      .then((res) => {
        setTeams(res.data.teams.filter((team) => team.payment_status));
        console.log(res.data.teams);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        setError("Failed to fetch teams. Please try again later.");
        setLoading(false);
      });
  }, [category]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center capitalize">
        {category} Teams
      </h1>
      {teams.length === 0 ? (
        <p className="text-center text-xl">
          No teams registered for this category.
        </p>
      ) : category !== "Accommodation" ? (
        <ul className="space-y-6">
          {teams.map((team) => (
            <li key={team.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">
                College: {team.collegeName}
              </h2>
              <p className="text-lg font-medium mb-4">
                Amount Paid: ₹{team.amount}
              </p>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Main Players:</h3>
                <ul className="space-y-2">
                  {team?.mainplayers?.map((player, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p>Name: {player.name}</p>
                      <p>Email: {player.email}</p>
                      <p>Phone: {player.phone}</p>
                      <p>College ID: {player.collegeID}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Substitutes:</h3>
                <ul className="space-y-2">
                  {team?.substitutes?.map((player, index) => (
                    <li key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p>Name: {player.name}</p>
                      <p>Gender: {player.gender}</p>
                      <p>Email: {player.email}</p>
                      <p>Phone: {player.phone}</p>
                      <p>College ID: {player.collegeID}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Payer`s Contact:</h3>
                <p>Name: {team.payersContact.name}</p>
                <p>Email: {team.payersContact.email}</p>
                <p>Mobile: {team.payersContact.mobileNumber}</p>
                <p>
                  Payment Status: {team.payment_status ? "Paid" : "Pending"}
                </p>
                <p>Payment ID: {team?.payment_id}</p>
                <p>Order ID: {team.order_id}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-6">
          {teams.map((team, index) => (
            <li key={index} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">
                Name: {team.payersContact.name}
              </h2>
              <p className="text-lg font-medium mb-4">
                Email: {team.payersContact.email}
              </p>
              <p className="text-lg font-medium mb-4">
                Mobile Number: {team.payersContact.mobileNumber}
              </p>
              <p className="text-lg font-medium mb-4">Gender: {team.gender}</p>
              <p className="text-lg font-medium mb-4">Age: {team.age}</p>
              <p className="text-lg font-medium mb-4">
                Blood Group: {team.bloodGroup}
              </p>
              <p className="text-lg font-medium mb-4">
                College Name: {team.collegeName}
              </p>
              <p className="text-lg font-medium mb-4">
                College ID: {team.collegeId}
              </p>
              <p className="text-lg font-medium mb-4">
                Year of Study: {team.yearOfStudy}
              </p>
              <p className="text-lg font-medium mb-4">
                Category: {team.category}
              </p>
              <p className="text-lg font-medium mb-4">
              Payment ID: {team?.payment_id}
              </p>
              <p className="text-lg font-medium mb-4">
                Order ID: {team.order_id}
              </p>
              <p className="text-lg font-medium mb-4">
                Payment Status: {team.payment_status ? "Paid" : "Pending"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
