using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class SnipDbContext : DbContext
    {
        public SnipDbContext(DbContextOptions<SnipDbContext> options) : base(options)
        {
        }

        public DbSet<SnipModel> Snips { get; set; }
    }
}
