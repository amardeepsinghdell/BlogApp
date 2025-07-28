import api from './api';

//Fetch comments for a specific blog post
export const getCommentsforPost = async(postId)=>{
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
};

//Create a new comment for a specific blog post
export const createComment = async(postId,data) =>{
    const response = await api.post(`/comments/${postId}`,data);
    return response.data;
}