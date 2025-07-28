import React, { useState } from "react";
import { createBlogPost } from "../services/blogService";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

const BlogForm = ({ onPostCreated, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    //Handle form input changes
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    //Clear success messages of user input
    if (success) {
      setSuccess(false);
    }
  };

  const handleSubmit = async (e) => {
    //Handle form submission
    e.preventDefault();

    //Basic validation
    if (!formData.title) {
      setError("Title is required");
      return;
    }

    if (!formData.content) {
      setError("Content is required");
      return;
    }

    try {
      //Try to create a new blog post
      setIsSubmitting(true);
      setError(null);
      await createBlogPost({
        //Call the service to create a new blog post
        title: formData.title,
        content: formData.content,
        date: new Date().toISOString(), //Set the current date in ISO format
      });

      setFormData({ title: "", content: "" }); //Reset the fiedls
      setSuccess(true); //Set success message

      setTimeout(()=>{
        onClose(); // Close the dialog after a successful post creation
        setSuccess(false); // Reset success message
      }, 2000);
      
    } catch (error) {
      setError("Failed to create blog post");
    } finally {
      setIsSubmitting(false);
    }

    if (onPostCreated) {
      onPostCreated(); // Notify parent component about the new post to refresh the blog list
    }
  };
  return (
        <Modal 
      show={isOpen} 
      onHide={onClose} 
      size="sm"           
      centered            
      backdrop="static"   
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Blog Post</Modal.Title>
      </Modal.Header>
    <Modal.Body>
      {success && (
        <div className="success">Blog post created successfully!</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            disabled={isSubmitting}
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="..."
            rows="8" //No. of rows in textarea
            disabled={isSubmitting} //Prevents user from typing while submitting
          />
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isSubmitting}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title || !formData.content}>
          {isSubmitting ? "Creating..." : "Create Post"}
          </Button>
          </Modal.Footer>
    </Modal>
  );
};

export default BlogForm;
