import React, { useState } from "react";
import "./App.css";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import CommentSection from "./components/CommentSection";

function App() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  // Handle when a blog post is selected from the lis
  const handleSelectPost = (post) => {
    setSelectedPost(post);
  };

  // Refresh when a new post is created
  const handlePostCreated = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <header className="App-header">
        <h1>InstaBlog</h1>
      </header>

      <main className="app-main">
        <div className="app-container">
          <section className="blog-list-section">
            <BlogList key={refresh} onSelectPost={handleSelectPost} />
          </section>
          <section className="blog-form-section">
            <button className="create-post-button" onClick={() => setIsDialogOpen(true)}>
              Create New Post
            </button>
          </section>
          {isDialogOpen && (
            <BlogForm
              onPostCreated={handlePostCreated}
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
            />
          )}
          <section className="comment-section-wrapper">
            <CommentSection selectedPost={selectedPost} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
