using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models
{
    public class Account
    {
        public Account()
        {

        }
        [Key]
        public int Id { get; set; }
        public double WithdrawalAmount { get; set; }
        public string operation { get; set; }
        public int ClientId { get; set; }
        public Client Customer { get; set; }
        public DateTime OperationDate { get; set; }
    }
}
