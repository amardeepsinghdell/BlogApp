namespace BlogService.DTOs
{
    public class CommentReadDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public string? Author { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
