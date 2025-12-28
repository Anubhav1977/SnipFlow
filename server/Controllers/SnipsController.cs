using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Constants;
using server.Dtos;
using server.Repositories;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SnipsController : ControllerBase
    {
        private readonly ISnipRepo _repo;

        public SnipsController(ISnipRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> getAllSnips()
        {
            try
            {
                return Ok(await _repo.GetAllSnips());
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getById(Guid id)
        {
            try
            {
                return Ok(await _repo.GetSnipById(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> createSnip(SnipDto dto)
        {
            try
            {
                await _repo.AddSnip(dto);
                return Ok(new { message = AppMessages.CreateSuccess });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> updateSnip(Guid id, UpdateSnipDto dto)
        {
            try
            {
                await _repo.UpdateSnip(id, dto);
                return Ok(new { message = AppMessages.UpdateSuccess });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deleteSnip(Guid id)
        {
            try
            {
                await _repo.DeleteSnip(id);
                return Ok(new { message = AppMessages.DeleteSuccess });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
