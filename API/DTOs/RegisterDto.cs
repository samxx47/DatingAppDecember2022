using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = String.Empty;

        [Required]
        [StringLength(8,MinimumLength =4)]
        [PasswordPropertyText]
        public string Password { get; set; } = String.Empty;


    }
}
