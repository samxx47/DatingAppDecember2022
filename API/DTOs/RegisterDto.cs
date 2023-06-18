using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = String.Empty;

        [Required]
        public string KnownAs { get; set; } = String.Empty;

        [Required]
        public string Gender { get; set; } = String.Empty;

        [Required]
        public DateOnly? DateOfBirth { get; set; }

        [Required]
        public string City { get; set; } = String.Empty;

        [Required]
        public string Country { get; set; } = String.Empty;

        [Required]
        [StringLength(8,MinimumLength =4)]
        [PasswordPropertyText]
        public string Password { get; set; } = String.Empty;


    }
}
