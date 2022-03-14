using Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repositories.Interface
{
    public interface IAccountRepository
    {
        bool Add(Account account);
        void Update(Account account);
        List<Account> ListAccount(int ClientId);
    }
}
