using server.Dtos;
using server.Models;

namespace server.Repositories
{
    public interface ISnipRepo
    {
        Task<SnipModel> AddSnip(SnipDto dto);
        Task<IEnumerable<SnipModel>> GetAllSnips();
        Task<SnipModel> GetSnipById(Guid id);
        Task UpdateSnip(Guid id, UpdateSnipDto dto);
        Task DeleteSnip(Guid snipId);
    }
}
