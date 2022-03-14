using Microsoft.EntityFrameworkCore;
using Models;
using Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Repositories.Implementation
{
    public class AccountRepository : IAccountRepository
    {
        protected readonly DBContext _context;
        public AccountRepository(DBContext context)
        {
            _context = context;
        }
        public bool Add(Account account)
        {
            try
            {
                _context.Accounts.Add(account);
                _context.SaveChanges();
                return true;
            }catch(Exception ex)
            {
                return false;
            }
        }
        public void Update(Account account)
        {
            try
            {
                _context.Accounts.Update(account);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public List<Account> ListAccount(int ClientId)
        {
            try
            {
                return _context.Accounts.Where(a => a.ClientId == ClientId).ToList();
            }
            catch (Exception ex)
            {
                return new List<Account>();
            }
        }
    }
}
