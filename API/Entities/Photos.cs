using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")]
    public class Photos
    {
        public int Id { get; set; }

        public string Url { get; set; } = String.Empty;
        public bool IsMain{ get; set; }
        public string PublicId { get; set; } = String.Empty;

        public int AppUserId { get; set; }

        public AppUser AppUser { get; set; }
    }
}