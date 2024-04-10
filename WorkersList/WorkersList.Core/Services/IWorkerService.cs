using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;

namespace WorkersList.Core.Services
{
    public interface IWorkerService
    {
        Task<IEnumerable<Worker>> GetWorkersAsync(Gender? gender, DateTime? startWorking);
        Task<Worker> GetWorkerAsync(int id);
        Task<Worker> AddWorkerAsync(Worker w);
        Task<Worker> AddRoleForWorkerAsync(int id, RoleForWorker r);
        Task<Worker> UpdateWorkerAsync(int id, Worker w);
        Task<Worker> UpdateWorkerStatusAsync(int id);
    }
}
