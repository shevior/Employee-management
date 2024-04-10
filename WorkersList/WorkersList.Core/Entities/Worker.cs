using WorkersList.Core.Entities;

namespace WorkersList
{
    public enum Gender { Male, Female };
    public enum Status { active, pasive };
    public class Worker
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string Identity { get; set; }
        public DateTime DateStartWork { get; set; }
        public DateTime BirthDate { get; set; }
        public Gender Gender { get; set; }
        public List<RoleForWorker> Roles { get; set; }
        public Status Status { get; set; }
    }
}