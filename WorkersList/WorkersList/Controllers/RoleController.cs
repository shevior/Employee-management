using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.Hosting;
using WorkersList.API.Models.Post;
using WorkersList.Core.Entities;
using WorkersList.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersList.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RolePostModel role)
        {
            var r = await _roleService.AddRoleAsync(_mapper.Map<Role>(role));
            return Ok(r);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] RolePostModel role)
        {
            var r = await _roleService.UpdateRoleAsync(id, _mapper.Map<Role>(role));
            return Ok(r);
        }

    }
}
