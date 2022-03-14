using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repositories
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options)
           : base(options)
        {
        }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Client> Clients { get; set; }
    }
}
