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
    public class ClientService : IClientService
    {
        private readonly IClientRepository _IClientRepository;
        public ClientService(IClientRepository IClientRepository)
        {
            _IClientRepository = IClientRepository;
        }
        public bool Exist(string AccountNumber)
        {
            return _IClientRepository.Exist(AccountNumber);
        }
        public bool VeritAmount(string AccountNumber, double Amount)
        {
            return _IClientRepository.VeritAmount(AccountNumber, Amount);
        }
        public Client GetByAccountNumber(string AccountNumber)
        {
            return _IClientRepository.GetByAccountNumber(AccountNumber);
        }
        public void Update(Client client)
        {
            _IClientRepository.Update(client);
        }
        public void Add(Client client)
        {
            _IClientRepository.Add(client);
        }
    }
}

