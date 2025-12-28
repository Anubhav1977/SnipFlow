using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Dtos;
using server.Models;
using System;

namespace server.Repositories
{
    public class SnipRepo : ISnipRepo
    {
        private readonly SnipDbContext _context;

        public SnipRepo(SnipDbContext context)
        {
            _context = context;
        }

        public async Task<SnipModel> AddSnip(SnipDto dto)
        {
            bool exists = await _context.Snips.AnyAsync(s => s.Title.ToLower() == dto.Title.ToLower());

            if (exists)
                throw new InvalidOperationException(AppMessages.DuplicateTitle);

            var snip = new SnipModel()
            {
                Id = Guid.NewGuid(),
                Title = dto.Title,
                Content = dto.Content,
                Type = dto.Type,
                Visibility = dto.Visibility,
                CreatedAt = dto.CreatedAt,
            };

            await _context.Snips.AddAsync(snip);
            await _context.SaveChangesAsync();

            return snip;
        }

        public async Task DeleteSnip(Guid snipId)
        {
            var snip = await GetSnipById(snipId);
            _context.Snips.Remove(snip);

            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<SnipModel>> GetAllSnips()
        {
            return await _context.Snips
                .OrderByDescending(s => s.CreatedAt)
                .ToListAsync();
        }

        public async Task<SnipModel> GetSnipById(Guid id)
        {
            var snip = await _context.Snips.FindAsync(id);

            if (snip == null)
                throw new KeyNotFoundException(AppMessages.SnipNotFound);

            return snip;
        }

        public async Task UpdateSnip(Guid id, UpdateSnipDto dto)
        {
            var snip = await GetSnipById(id);

            snip.Title = dto.Title.Trim();
            snip.Content = dto.Content;
            snip.Type = dto.Type;
            snip.Visibility = dto.Visibility;

            await _context.SaveChangesAsync();
        }
    }
}
