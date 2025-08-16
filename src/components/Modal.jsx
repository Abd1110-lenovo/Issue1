import PostCard from "./PostCard";

const Modal = ({ user, posts, onClose, loading }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div className="modal-title">Posts by {user.name}</div>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="modal-content">
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default Modal;
