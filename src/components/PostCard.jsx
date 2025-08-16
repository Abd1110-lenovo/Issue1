const PostCard = ({ post }) => (
  <div className="post-card">
    <div className="post-title">{post.title}</div>
    <div className="post-body">{post.body}</div>
  </div>
);

export default PostCard;
