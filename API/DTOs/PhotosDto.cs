using API.Entities;

namespace API.DTOs
{
    public class PhotosDto
    {
        public int Id { get; set; }

        public string Url { get; set; } = String.Empty;
        public bool IsMain { get; set; }
       
    }
}