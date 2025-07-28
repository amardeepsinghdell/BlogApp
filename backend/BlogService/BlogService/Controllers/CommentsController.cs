using BlogService.Context;
using BlogService.DTOs;
using BlogService.Helpers;
using BlogService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : Controller
    {
        public BlogContext _context;

        public CommentsController(BlogContext BlogContext)
        {
            _context = BlogContext;
        }

        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<CommentReadDto>>> GetCommentsByPostId(int postId) // Get comments by BlogPostId
        {
            var comments = await _context.Comments
                .Where(c => c.BlogPostId == postId)
                .ToListAsync();

            // Return empty array instead of 404 when no comments found
            if (comments == null || !comments.Any())
            {
                return Ok(new List<CommentReadDto>());
            }

            var commentDtos = comments.Select(c => c.ToReadDto()).ToList();
            return Ok(commentDtos);
        }

        [HttpPost("{postId}")]
        public async Task<ActionResult<IEnumerable<CommentReadDto>>> CreateComment(int postId,CommentCreateDto commentCreateDto)
        { 
            var blogPostExists = await _context.BlogPosts.AnyAsync(x => x.Id == postId);
           
            if (!blogPostExists) return BadRequest("BlogPost with ID : " + postId + "doesn't exist");

            // Set the BlogPostId from the route parameter
            commentCreateDto.BlogPostId = postId;

            var comment = commentCreateDto.ToEntity();
            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            var commentCreatedRes = comment.ToReadDto();

            return CreatedAtAction(nameof(GetCommentsByPostId),new {postId = comment.BlogPostId},commentCreatedRes);
        }
    }
}
