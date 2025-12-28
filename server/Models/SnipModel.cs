using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace server.Models
{
    public class SnipModel
    {
        public Guid Id { get; set; }
        public required string Title { get; set; } = string.Empty;
        public required string Content { get; set; } = string.Empty;
        public required string Type { get; set; } = string.Empty;
        public required string Visibility { get; set; } = string.Empty;
        public required DateTime CreatedAt { get; set; }

    }
}
