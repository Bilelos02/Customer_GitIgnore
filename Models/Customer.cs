using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class Client
    {
        public Client()
        {
            Accounts = new HashSet<Account>();
        }
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public double TotalAmount { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<Account> Accounts { get; set; }
    }
}
