using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;

namespace WorkersList.Data.Repositories
{
    public class WorkerRepository : IWorkerRepository
    {
        private readonly DataContext _context;
        public WorkerRepository(DataContext context) => _context = context;
        public async Task<IEnumerable<Worker>> GetWorkersAsync()=> await _context.Workers.ToListAsync();
        public async Task<Worker> GetWorkerAsync(int id) => await _context.Workers.FindAsync(id);
        public async Task<Worker> AddWorkerAsync(Worker w)
        {
            _context.Workers.Add(w);
            await _context.SaveChangesAsync();
            return w;
        }
        public async Task<Worker> UpdateWorkerAsync(int id, Worker updateWorker)
        {
            var w = _context.Workers.Find(id);
            if (w != null)
            {
                w.FirstName = updateWorker.FirstName;
                w.FamilyName = updateWorker.FamilyName;
                w.DateStartWork = updateWorker.DateStartWork;
                w.BirthDate = updateWorker.BirthDate;
                w.Roles = updateWorker.Roles;
            }
            await _context.SaveChangesAsync();
            return updateWorker;
        }

        public async Task<Worker> UpdateWorkerStatusAsync(int id)
        {
            var w = _context.Workers.Find(id);
            if (w != null)
                w.Status = Status.pasive;
            await _context.SaveChangesAsync();
            return w;
        }

        public async Task<Worker> AddRoleForWorkerAsync(int id, RoleForWorker r)
        {
            var w = _context.Workers.Find(id);
            if(w != null)
            {
                if(!w.Roles.Contains(r))
                    w.Roles.Add(r);
            }
            await _context.SaveChangesAsync();
            return w;
        }

    }
}