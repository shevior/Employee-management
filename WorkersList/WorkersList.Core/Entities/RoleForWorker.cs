using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkersList.Core.Entities
{
    public class RoleForWorker
    {
        public int Id { get; set; }
        public Role role { get; set; }
        public bool IsManagerial { get; set; }
        public DateTime StartRole { get; set; }
    }
}
