namespace BlogService.DTOs
{
    public class BlogPostReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public List<CommentReadDto> Comments { get; set; } = new();
    }
}
