﻿using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Controllers;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]   //     ...../api/users
[Authorize]
public class UsersController : BaseApi
{
    
    private readonly DataContext _context;

	public UsersController(DataContext context)
	{
		_context = context;
	}

	[AllowAnonymous]
	[HttpGet]


	public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
	{
		var users =await _context.Users.ToListAsync();
		return Ok(users);
	}


	
	[HttpGet("{id}")]

	public async Task<ActionResult<AppUser>> GetUser(int id)
	{
		var user =await _context.Users.FindAsync(id);
		return Ok(user);
	}



}
