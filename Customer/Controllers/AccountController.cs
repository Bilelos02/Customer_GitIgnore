using Aspose.Pdf;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IronPdf;
using Models;

namespace Customer.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _IAccountService;
        private readonly IClientService _IClientService;
        public AccountController(IAccountService accountService, IClientService clientService)
        {
            _IAccountService = accountService;
            _IClientService = clientService;
        }
        public IActionResult Index()
        {
            return View("~/Views/Account/index");
        }
        public IActionResult Deposit()
        {            
            return View("~/Views/Account/Deposit.cshtml");
        }
        
        public void CreateOperation(int Idclient, string operation, double amount)
        {
            Account account = new Account();
            account.ClientId = Idclient;
            account.operation = operation;
            account.OperationDate = DateTime.Now;
            account.WithdrawalAmount = amount;
            _IAccountService.Add(account);
        }
        public IActionResult DepositAmount()
        {
            Client client = _IClientService.GetByAccountNumber(Request.Form["AccountNumber"]);
            CreateOperation(client.Id, "+", Convert.ToDouble(Request.Form["Amount"]));
            client.TotalAmount = client.TotalAmount + Convert.ToDouble(Request.Form["Amount"]);
            _IClientService.Update(client);
            return View("~/Views/Account/Deposit.cshtml");
        }
        public IActionResult TakeAll()
        {
            Client client = _IClientService.GetByAccountNumber(Request.Form["AccountNumber"]);
            CreateOperation(client.Id, "-", client.TotalAmount);
            client.TotalAmount = 0;
            _IClientService.Update(client);
            return View("~/Views/Account/Deposit.cshtml");
        }
        public IActionResult Withdrawal()
        {
            return View("~/Views/Account/Withdrawal.cshtml");
        }
        public IActionResult WithdrawalAmount()
        {
            Client client = _IClientService.GetByAccountNumber(Request.Form["AccountNumber"]);
            CreateOperation(client.Id, "-", Convert.ToDouble(Request.Form["Amount"]));
            client.TotalAmount = client.TotalAmount - Convert.ToDouble(Request.Form["Amount"]);
            _IClientService.Update(client);
            return View("~/Views/Account/Deposit.cshtml");
        }
        public void Historique(string AccountNumber)
        {
            int clientId = _IClientService.GetByAccountNumber(AccountNumber).Id;
            ViewData["ListOperation"] = _IAccountService.ListAccount(clientId);
        }
        public ActionResult Printed()
        {
            string AccountNumber = Request.Query["AccountNumber"];
            var PDF = IronPdf.ChromePdfRenderer.StaticRenderUrlAsPdf(new Uri("/Account/Historique/"+ AccountNumber));
            return File(PDF.BinaryData, "application/pdf", "historique.Pdf");
        }
    }
}
