using System.ComponentModel.DataAnnotations;

namespace BlogService.DTOs
{
    public class CommentCreateDto
    {
        [Required]
        public string Content { get; set; } = null!;

        public string Author { get; set; } = "Anonymous"; // Setting this as anonymous if the user doesn't enter any value

        [Required]
        public int BlogPostId { get; set; }

    }
}
