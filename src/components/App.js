// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import NotificationsPage from './pages/NotificationsPage';
import PostDetail from './pages/PostDetail';

export default function App() {
  return (
    <div className="App">
      <h1>GenZ</h1>
      <Router>
        <nav>
          <a href="/">Posts</a> | <a href="/users">Users</a> | <a href="/notifications">Notifications</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

// pages/Home.jsx
import React, { useState } from 'react';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';

const initialPosts = [
  { id: 1, title: 'Hello', content: 'World', author: 'Alice', reactions: [0, 0, 0, 0, 0] },
];

export default function Home() {
  const [posts, setPosts] = useState(initialPosts);

  const addPost = (newPost) => setPosts([newPost, ...posts]);
  const updatePost = (updatedPost) => setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
  return (
    <div>
      <CreatePost addPost={addPost} />
      <div className="posts-list">
        {posts.map((post, idx) => (
          <Post key={post.id} post={post} updatePost={updatePost} index={idx} />
        ))}
      </div>
    </div>
  );
}

// components/CreatePost.jsx
import React, { useState } from 'react';

export default function CreatePost({ addPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Alice');

  const handleSubmit = () => {
    if (title && content) {
      const newPost = {
        id: Date.now(),
        title,
        content,
        author,
        reactions: [0, 0, 0, 0, 0],
      };
      addPost(newPost);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div>
      <input id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <select id="postAuthor" value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option>Alice</option>
        <option>Bob</option>
        <option>Charlie</option>
      </select>
      <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// components/Post.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Post({ post, updatePost, index }) {
  const navigate = useNavigate();

  const addReaction = (idx) => {
    if (idx === 4) return; // 5th button does not increase
    const updated = { ...post };
    updated.reactions[idx]++;
    updatePost(updated);
  };

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <div>
        {post.reactions.map((r, idx) => (
          <button key={idx} onClick={() => addReaction(idx)}>{r}</button>
        ))}
      </div>
      <button className="button" onClick={() => navigate(`/posts/${post.id}`)}>Edit</button>
    </div>
  );
}

// pages/PostDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Normally update logic would go here
    navigate('/');
  };

  return (
    <div className="post">
      <input id="postTitle" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Edit Title" />
      <textarea id="postContent" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Edit Content" />
      <button className="button" onClick={handleSave}>Save</button>
    </div>
  );
}

// pages/UsersPage.jsx
import React, { useState } from 'react';

const users = ['Alice', 'Bob', 'Charlie'];
const postsByUser = {
  Alice: [{ title: 'A1', content: 'Post A1' }],
  Bob: [{ title: 'B1', content: 'Post B1' }, { title: 'B2', content: 'Post B2' }],
  Charlie: [],
};

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user} onClick={() => setSelectedUser(user)}>{user}</li>
        ))}
      </ul>
      {selectedUser && (
        <div>
          {postsByUser[selectedUser].map((post, idx) => (
            <div className="post" key={idx}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// pages/NotificationsPage.jsx
import React, { useState } from 'react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const handleRefresh = () => {
    setNotifications(["New follower", "New comment"]);
  };

  return (
    <section className="notificationsList">
      <button className="button" onClick={handleRefresh}>Refresh Notifications</button>
      {notifications.map((note, idx) => (
        <div key={idx}>{note}</div>
      ))}
    </section>
  );
}
