import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import NotificationsPage from './pages/NotificationsPage';
import PostDetail from './pages/PostDetail';

export default function App() {
  return (
    <Router>
      <div className="App">
        <h1>GenZ</h1>
        <nav>
          <Link to="/">Posts</Link> | <Link to="/users">Users</Link> | <Link to="/notifications">Notifications</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}
