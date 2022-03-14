using Models;
using Repositories.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Services.Interfaces
{
    public interface IClientService
    {
        bool Exist(string AccountNumber);
        bool VeritAmount(string AccountNumber, double Amount);
        Client GetByAccountNumber(string AccountNumber);
        void Update(Client client);
        void Add(Client client);
    }
}

