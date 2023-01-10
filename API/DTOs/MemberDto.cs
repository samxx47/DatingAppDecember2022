using API.Entities;
using API.Extentions;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class MemberDto
    {

        public int Id { get; set; }

        
        public string UserName { get; set; } = String.Empty;

        public string PhotoUrl { get; set; } = String.Empty;
        public int Age { get; set; }

        public string KnownAs { get; set; } = String.Empty;

        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; } 

        public string Gender { get; set; } = String.Empty;
        public string Introduction { get; set; } = String.Empty;
        public string Interests { get; set; } = String.Empty;
        public string City { get; set; } = String.Empty;

        public string Country { get; set; } = String.Empty;

        public List<PhotosDto> Photos { get; set; }  



    }
}
