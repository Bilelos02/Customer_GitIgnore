using Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Repositories.Interface
{
    public interface IClientRepository
    {
        bool Exist(string AccountNumber);
        bool VeritAmount(string AccountNumber, double Amount);
        Client GetByAccountNumber(string AccountNumber);
        void Update(Client client);
        void Add(Client client);
    }
}
