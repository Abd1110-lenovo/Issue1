const UserCard = ({ user, onClick }) => (
  <div className="user-card" onClick={() => onClick(user)}>
    <div className="user-name">{user.name}</div>
    <div className="user-info">
      <strong>Email:</strong> {user.email}
    </div>
    <div className="user-info">
      <strong>Phone:</strong> {user.phone}
    </div>
    <div className="user-info">
      <strong>Website:</strong> {user.website}
    </div>
    <div className="user-info">
      <strong>Company:</strong> {user.company.name}
    </div>
  </div>
);

export default UserCard;
