// import { useSession } from "next-auth/react";

const fetchUserProfile = async () => {
  // const { data: session, status } = useSession();
  return {
    id: "user_123",
    name: "John Doe",
    avatarUrl: "https://via.placeholder.com/150",
    email: "john.doe@example.com",
    phone: "+1234567890",
    location: "New York, USA",
    session: "session",
    projects: [
      {
        id: "project_1",
        name: "Project Alpha",
        description: "This is project Alpha.",
      },
      {
        id: "project_2",
        name: "Project Beta",
        description: "This is project Beta.",
      },
    ],
  };
};
export default async function Page() {
  const user = await fetchUserProfile();

  return (
    <div className="h-full w-full bg-gray-50 py-10">
      <h1 className="text-center text-3xl font-bold mb-6">User Profile</h1>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-gray-700">
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>
        <h3 className="text-lg font-bold mb-2">Recent Projects</h3>
        <ul className="space-y-2">
          {user.projects.map((project) => (
            <li key={project.id} className="p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold">{project.name}</h4>
              <p className="text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
