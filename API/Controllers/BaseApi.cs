using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApi : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
