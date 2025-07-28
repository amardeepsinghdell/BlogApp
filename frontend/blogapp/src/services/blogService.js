import api from './api';

//Fetch all blog posts
export const getBlogPosts = async () =>{
    const response = await api.get('/blogposts');
    return response.data;
};

//Create a new blog post
export const createBlogPost = async (data) =>{
    const response = await api.post('/blogposts',data);
    return response.data;
};