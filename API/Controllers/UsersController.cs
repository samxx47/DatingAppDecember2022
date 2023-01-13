using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Controllers;
using Microsoft.AspNetCore.Authorization;
using API.Interfaces;
using AutoMapper;
using API.DTOs;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using API.Extentions;
using SQLitePCL;
using System.Runtime.CompilerServices;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]   //     ...../api/users
[Authorize]
public class UsersController : BaseApi
{
	private readonly IUserRepository _userRepository;
	private readonly IMapper _mapper;
	private readonly IPhotoService _photoService;

	//  private readonly DataContext _context;

	public UsersController(IUserRepository userRepository,IMapper mapper, IPhotoService photoService)
	{
		_userRepository = userRepository;
		_mapper = mapper;
		_photoService = photoService;
		//_context = context;
	}

	
	[HttpGet]


	public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
	{
		var users =await _userRepository.GetMembersAsync();
		//var usersToReturn = _mapper.Map<IEnumerable<MemberDto>>(users);
		return Ok(users);
	}


	
	[HttpGet("{username}")]

	public async Task<ActionResult<MemberDto>> GetUser(string username)
	{
		var user =await _userRepository.GetMemberAsync(username);
        //var usersToReturn = _mapper.Map<MemberDto>(user);
        return Ok(user);
	}

	[HttpPut]

	public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
	{
		var user = await _userRepository.GetUserByNameAsync(User.GetUsername());

		if (user == null) return NotFound();

		_mapper.Map(memberUpdateDto,user);

		if (await _userRepository.SaveAllAsync()) return NoContent();

		return BadRequest("Failed to update user");
	}

	[HttpPost("add-photo")]
	public async Task<ActionResult<PhotosDto>> AddPhoto(IFormFile file)
	{
		var user = await _userRepository.GetUserByNameAsync(User.GetUsername());
		if (user == null) return NotFound();

		var result = await _photoService.AddPhotosAsync(file);

		if (result.Error != null) return BadRequest(result.Error.Message);

		var photo = new Photos
		{
			Url = result.SecureUrl.AbsoluteUri,
			PublicId = result.PublicId,
		};

		if (user.Photos.Count == 0) photo.IsMain = true;

		user.Photos.Add(photo);
		if (await _userRepository.SaveAllAsync())
		{
			return CreatedAtAction(nameof(GetUser),  // se since we dont want to create a response of the uploade photo so here we are focusing on shareing the loaction where we ahve uploaded the photo
				new {username = user.UserName},_mapper.Map<PhotosDto>(photo));
		}
        return BadRequest("Problem adding Photo");

	}
	[HttpPut("set-main-photo/{photoId}")]

	public async Task<ActionResult> SetMainPhoto(int photoId)
	{
		var user = await _userRepository.GetUserByNameAsync(User.GetUsername());
		if (user == null) return NotFound();
		var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

		if (photo == null) return NotFound();

		if (photo.IsMain) return BadRequest("this is already your main photo");

		var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
		if (currentMain != null) currentMain.IsMain = false;
		photo.IsMain = true;
		if(await _userRepository.SaveAllAsync()) return NoContent();

		return BadRequest("problem in setting main photo");

	}

	[HttpDelete("delete-photo/{photoId}")]

	public async Task<ActionResult> DeletePhoto(int photoId)
	{
		var user =await  _userRepository.GetUserByNameAsync(User.GetUsername());
		var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

		if (photo == null) return NotFound();

		if (photo.IsMain) return BadRequest("You cannot delete the only photo you have");

		if(photo.PublicId != null)
		{
			var result = await _photoService.DeletePhotoAsync(photo.PublicId);
			if (result.Error != null) return BadRequest(result.Error.Message);

		}

		user.Photos.Remove(photo);

		if(await _userRepository.SaveAllAsync()) return Ok();

		return BadRequest("problem deleting photos");

	}

}
