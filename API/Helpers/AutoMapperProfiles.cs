using API.DTOs;
using API.Entities;
using API.Extentions;
using AutoMapper;
namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, MemberDto>()
                .ForMember(dest => dest.PhotoUrl, opt=> opt.MapFrom(src => src.Photos.FirstOrDefault(x=> x.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));  // so we are mapping the photourl with  the url present in the other entity i,e photos.
            CreateMap<Photos, PhotosDto>();
            CreateMap<MemberUpdateDto, AppUser>();
        }
    }
}
