using API.Extentions;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; } = String.Empty;

        public byte[] PasswordHash  { get; set; }

        public byte[] PasswordSaltw { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string KnownAs { get; set; } = String.Empty;

        public DateTime Created { get; set; } = DateTime.UtcNow;

        public DateTime LastActive { get; set; } = DateTime.UtcNow;

        public string Gender { get; set; } = String.Empty;
        public string Introduction { get; set; } = String.Empty;
        public string Interests { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;

        public string Country { get; set; } = String.Empty;

        public List<Photos> Photos { get; set; } = new();


      /*  public int GetAge()
        {
            return DateOfBirth.CalculateAge();
        }*/




    }
}
