import { useState, useEffect } from "react";
import UserCard from "./components/UserCard";
import PostCard from "./components/PostCard";
import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const userData = await response.json();
      setUsers(userData);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      setPostsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const postsData = await response.json();
      setPosts(postsData);
    } catch (err) {
      setError("Failed to load posts. Please try again later.");
    } finally {
      setPostsLoading(false);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchUserPosts(user.id);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setPosts([]);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="header">
        <h1>User & Post Dashboard</h1>
        <p>Click on any user to view their posts</p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {filteredUsers.length === 0 ? (
        <div className="no-results">
          No users found matching "{searchTerm}"
        </div>
      ) : (
        <div className="users-grid">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onClick={handleUserClick} />
          ))}
        </div>
      )}

      {selectedUser && (
        <Modal
          user={selectedUser}
          posts={posts}
          onClose={handleCloseModal}
          loading={postsLoading}
        />
      )}
    </div>
  );
};

export default App;
