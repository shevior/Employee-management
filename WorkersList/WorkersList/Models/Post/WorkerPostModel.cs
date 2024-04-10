using WorkersList.Core.Entities;

namespace WorkersList.API.Models.Post
{
    public class WorkerPostModel
    {
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Identity { get; set; }
        public DateTime DateStartWork { get; set; }
        public DateTime BirthDate { get; set; }
        public List<RoleForWorker> Roles { get; set; }
        public Gender Gender { get; set; }
    }
}
