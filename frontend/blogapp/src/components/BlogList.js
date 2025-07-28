import { React, useState, useEffect } from 'react';
import { getBlogPosts } from '../services/blogService';
import formatDate from "../helpers/formatDate";

const BlogList = ({ onSelectPost }) => {
    const [allPosts, setAllPosts] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                setLoading(true);
                const data = await getBlogPosts();
                setAllPosts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch blog posts');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []);

    const visiblePosts = showAll ? allPosts : allPosts.slice(0, 5);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="blog-list">
            <h2>Blogs</h2>
            {visiblePosts.length === 0 ? (
                <p>No blog posts available</p>
            ) : (
                <>
                    {visiblePosts.map((post) => (
                        <div key={post.id} className="blog-post" onClick={() => onSelectPost(post)}>
                            <h3>{post.title}</h3>
                            <p className="blog-date">Created On: {formatDate(post.createdAt)}</p>
                            <p className="blog-excerpt">said: <br />{post.content.substring(0, 100)}...</p>
                        </div>
                    ))}

                    <div className="view-all-container">
                        <button
                            className="view-all-btn"
                            onClick={() => setShowAll(!showAll)}
                        >
                            {showAll ? 'View Less' : 'View All'}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BlogList;
