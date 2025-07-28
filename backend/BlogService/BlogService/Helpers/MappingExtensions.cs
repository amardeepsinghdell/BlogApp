using BlogService.DTOs;
using BlogService.Models;

namespace BlogService.Helpers
{
    //Using helper class here to define all mappings from Entity to DTO and vice-versa
    public static class MappingExtensions
    {
        //BlogPost Mappings 
        public static BlogPostReadDto ToReadDto(this BlogPost post)
        {
            return new BlogPostReadDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                Comments = post.Comments?.Select(p => p.ToReadDto()).ToList() ?? new List<CommentReadDto>() // This is mapping the Collection of Comments from a blogpost to the CommentReadDTO
            };
        }

        public static BlogPost ToEntity(this BlogPostCreateDto dto)
        {
            return new BlogPost
            {
                Title = dto.Title,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };
        }

        //Comment Mappings
        public static CommentReadDto ToReadDto(this Comment comment)
        {
            return new CommentReadDto
            {
                Id = comment.Id,
                Content = comment.Content,
                Author = comment.Author,
                CreatedAt = comment.CreatedAt
            };
        }

        public static Comment ToEntity(this CommentCreateDto comment)
        {
            return new Comment
            {
                BlogPostId = comment.BlogPostId,
                Content = comment.Content,
                Author = comment.Author,
                CreatedAt = DateTime.UtcNow
            };
        }

    }
}
