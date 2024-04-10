using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;
using WorkersList.Core.Services;
using WorkersList.Data.Repositories;

namespace WorkersList.Service.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository) => _roleRepository = roleRepository;

        public async Task<Role> AddRoleAsync(Role w)
        {
            return await _roleRepository.AddRoleAsync(w);
        }

        public async Task<IEnumerable<Role>> GetRolesAsync()
        {
            return await _roleRepository.GetRolesAsync();
        }

        public Task<Role> UpdateRoleAsync(int id, Role r)
        {
            return _roleRepository.UpdateRoleAsync(id, r);
        }
    }
}
