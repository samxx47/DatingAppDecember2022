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

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]   //     ...../api/users
[Authorize]
public class UsersController : BaseApi
{
	private readonly IUserRepository _userRepository;
	private readonly IMapper _mapper;

	//  private readonly DataContext _context;

	public UsersController(IUserRepository userRepository,IMapper mapper)
	{
		_userRepository = userRepository;
		_mapper = mapper;
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
		var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		var user = await _userRepository.GetUserByNameAsync(username);

		if (user == null) return NotFound();

		_mapper.Map(memberUpdateDto,user);

		if (await _userRepository.SaveAllAsync()) return NoContent();

		return BadRequest("Failed to update user");
	}


}
