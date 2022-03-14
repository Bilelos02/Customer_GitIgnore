using Models;
using Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services.Interfaces
{
    public interface IAccountService
    {
        bool Add(Account account);
        void Update(Account account);
        List<Account> ListAccount(int ClientId);
    }
}
