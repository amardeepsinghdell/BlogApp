using System.ComponentModel.DataAnnotations;

namespace BlogService.DTOs
{
    public class BlogPostCreateDto
    {
        [Required]
        [StringLength(100)]
        public string Title { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;
    }
}
