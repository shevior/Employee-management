using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;

namespace WorkersList.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;
        public RoleRepository(DataContext dataContext)=> _context = dataContext;

        public async Task<IEnumerable<Role>> GetRolesAsync() => await _context.Roles.ToListAsync();

        public async Task<Role> AddRoleAsync(Role r)
        {
            _context.Roles.Add(r);
            await _context.SaveChangesAsync();
            return r;
        }

        public async Task<Role> UpdateRoleAsync(int id, Role r)
        {
            var role = _context.Roles.Find(id);
            if (role != null)
            {
                role.Name = r.Name;
            }
            await _context.SaveChangesAsync();
            return r;
        }
    }
}
