using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersList.Core.Entities;
using WorkersList.Core.Repositories;
using WorkersList.Core.Services;

namespace WorkersList.Service.Services
{
    public class WorkerService : IWorkerService
    {
        private readonly IWorkerRepository _workerRepository;
        public WorkerService(IWorkerRepository workerRepository)=>_workerRepository = workerRepository;

        public async Task<IEnumerable<Worker>> GetWorkersAsync(Gender? gender, DateTime? startWorking)
        {
            var workers = await _workerRepository.GetWorkersAsync();
            return workers.Where(w => (gender == null || w.Gender.Equals(gender)) && (startWorking == null || startWorking<w.DateStartWork));
        }
        public async Task<Worker> GetWorkerAsync(int id)
        {
            return await _workerRepository.GetWorkerAsync(id);
        }
        public async Task<Worker> AddRoleForWorkerAsync(int id, RoleForWorker r)
        {
            var w = await _workerRepository.GetWorkerAsync(id);
            if (r.StartRole < w.DateStartWork)
                return w;
            var ro = w.Roles.Find(role => role.Id == r.Id);
            if (ro != null)
                return w;
            return await _workerRepository.AddRoleForWorkerAsync(id, r);
        }

        public Task<Worker> AddWorkerAsync(Worker w)
        {
            return _workerRepository.AddWorkerAsync(w);
        }


        public async Task<Worker> UpdateWorkerAsync(int id, Worker w)
        {
            return await _workerRepository.UpdateWorkerAsync(id, w);
        }

        public async Task<Worker> UpdateWorkerStatusAsync(int id)
        {
            return await _workerRepository.UpdateWorkerStatusAsync(id);
        }
    }
}
