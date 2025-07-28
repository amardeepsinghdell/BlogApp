using BlogService.Context;
using BlogService.DTOs;
using BlogService.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BlogService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogPostsController : ControllerBase
    {
        public readonly BlogContext _context;

        public BlogPostsController(BlogContext BlogContext) // DI
        {
            _context = BlogContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogPostReadDto>>> GetBlogPosts()
        {
            var blogPosts = await _context.BlogPosts.Include(c => c.Comments).OrderByDescending(o => o.CreatedAt).ToListAsync(); //Order by Descending,Take 5 - To Get Last 5 Blog Posts

            var blogPostsDto = blogPosts.Select(x => x.ToReadDto()); //Manual Mapping

            return Ok(blogPostsDto); // Returning with 200
        }

        [HttpPost]
        public async Task<ActionResult<BlogPostReadDto>> CreateBlogPost(BlogPostCreateDto blogPostCreateDto)
        {
            var blogPost = blogPostCreateDto.ToEntity();

            _context.Add(blogPost);
            await _context.SaveChangesAsync();

            var blogPostCreationResponse = blogPost.ToReadDto();
            return CreatedAtAction(nameof(GetBlogPosts), new { id = blogPost.Id }, blogPostCreationResponse); // Returning the created resource , action/id and DTO in response body
        }
    }
}
