using Models;
using Repositories;
using Repositories.Implementation;
using Repositories.Interface;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Implementation
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _IAccountRepository;
        public AccountService(IAccountRepository IAccountRepository)
        {
            _IAccountRepository = IAccountRepository;
        }

        public bool Add(Account account)
        {
            if (_IAccountRepository.Add(account))
            {
                return true;
            }
            return false;
        }
        public void Update(Account account)
        {
            _IAccountRepository.Update(account);
        }
        public List<Account> ListAccount(int ClientId)
        {
            return _IAccountRepository.ListAccount(ClientId);
        }
    }
}
