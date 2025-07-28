using System.ComponentModel.DataAnnotations;

namespace BlogService.Models
{
    public class BlogPost
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = null!; // Using the null-forgiving operator here only to suppress the warning ,the field level validation will work to block null entries

        [Required]
        public string Content { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Comment> Comments { get; set; } = new List<Comment>();

    }
}
