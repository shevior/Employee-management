using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using WorkersList.Core.Entities;

namespace WorkersList.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Role> Roles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=employee_managment_db");
        }

    }
}
