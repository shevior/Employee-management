using WorkersList.Core.Entities;

namespace WorkersList.API.Models.put
{
    public class WorkerPutModel
    {
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public DateTime DateStartWork { get; set; }
        public List<RoleForWorker> Roles { get; set; }
    }
}
