import { Link } from "react-router-dom";

const Home = (userDetails) => {
  const user = userDetails.user;

  // Logout via Google OAuth logout route
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/users/logout`, "_self");
  };

  // Prevent default submission (since it's a display-only form)
  const preventSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Profile
        </h2>

        <form onSubmit={preventSubmit} className="space-y-4">
          <img
            src={user.picture}
            alt="user"
            className="w-32 h-32 mx-auto rounded-full"
          />

          <input
            type="text"
            name="name"
            defaultValue={user.name}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled
          />

          <input
            type="email"
            name="email"
            defaultValue={user.email}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled
          />

          <button
            type="button"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={logout}
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
