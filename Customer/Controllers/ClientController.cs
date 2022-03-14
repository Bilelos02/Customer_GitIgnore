using Microsoft.AspNetCore.Mvc;
using Models;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Customer.Controllers
{
    public class ClientController : Controller
    {
        private readonly IClientService _IClientService;
        public ClientController(IClientService clientService)
        {
            _IClientService = clientService;
        }
        public IActionResult Index()
        {
            return View("~/Views/Client/Client.cshtml");
        }
        public JsonResult VeritAccount()
        {
            string AccountNumber = Request.Query["AccountNumber"];
            return Json(_IClientService.Exist(AccountNumber));
        }
        public JsonResult VeritAmount()
        {
            string AccountNumber = Request.Query["AccountNumber"];
            double Amount = Convert.ToDouble(Request.Query["Amount"]);
            return Json(_IClientService.VeritAmount(AccountNumber, Amount));
        }
        public IActionResult Add(Client client)
        {
            client.CreatedDate = DateTime.Now;
            _IClientService.Add(client);
            return View("~/Views/Client/Client.cshtml");
        }
    }
}
