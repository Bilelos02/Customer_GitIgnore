using Microsoft.EntityFrameworkCore;
using Models;
using Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace Repositories.Implementation
{
    public class ClientRepository : IClientRepository
    {
        protected readonly DBContext _context;
        public ClientRepository(DBContext context)
        {
            _context = context;
        }
        public bool Exist(string AccountNumber)
        {
            try
            {
                return _context.Clients.Any(c => c.AccountNumber == AccountNumber);
            }catch(Exception ex)
            {
                return false;
            }
        }
        public bool VeritAmount(string AccountNumber, double Amount)
        {
            try
            {
                return _context.Clients.Any(a => a.AccountNumber == AccountNumber && a.TotalAmount > Amount);
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public Client GetByAccountNumber(string AccountNumber)
        {
            try
            {
                return _context.Clients.Where(c => c.AccountNumber == AccountNumber).FirstOrDefault();
            }catch(Exception ex)
            {
                return null;
            }
        }
        public void Update(Client client)
        {
            try
            {
                _context.Clients.Update(client);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
        public void Add(Client client)
        {
            try
            {
                _context.Clients.Add(client);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }
    }
}

