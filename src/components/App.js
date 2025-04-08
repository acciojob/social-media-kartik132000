import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./app/store";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";
import PostDetail from "./features/posts/PostDetail";
import EditPostForm from "./features/posts/EditPostForm";
import UsersList from "./features/users/UsersList";
import UserPage from "./features/users/UserPage";
import NotificationsList from "./features/notifications/NotificationsList";
import Navbar from "./components/Navbar";
import "./../styles/App.css";

const App = () => {
  return (
    <div>
      {/* Do not remove the main div */}
      <Provider store={store}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<PostsList />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:userId" element={<UserPage />} />
            <Route path="/notifications" element={<NotificationsList />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
