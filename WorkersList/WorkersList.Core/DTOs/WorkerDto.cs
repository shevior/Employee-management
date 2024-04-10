using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkersList.Core.DTOs
{
    public class WorkerDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string FamilyName { get; set; }
        public string identity { get; set; }
        public Status Status { get; set; }
        public DateTime DateStartWork { get; set; }
    }
}
