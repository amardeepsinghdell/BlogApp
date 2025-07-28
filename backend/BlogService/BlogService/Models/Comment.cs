using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogService.Models
{
    public class Comment
    {
        public int Id { get; set; }

        [Required]
        public string Content { get; set; } = null!;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public int BlogPostId { get; set; }

        [ForeignKey(nameof(BlogPostId))]            //The explicit definition here is to show the use of data annotation for foreign key, by default <NavigationPropertyName>Id structure is a Foreign key.
        public BlogPost BlogPost { get; set; } = null!;

        public string? Author { get; set; }
    }
}
