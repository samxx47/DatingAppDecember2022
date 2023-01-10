using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
 using API.Extentions;
using API.Middleware;
using Microsoft.EntityFrameworkCore.Update.Internal;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();




//
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();


//


// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}
//
//app.UseHttpsRedirection();
//
//app.UseAuthorization();

app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();



//making a middleware service to apply the seed data through migration
using var scope= app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
	var context = services.GetRequiredService<DataContext>();	
	await context.Database.MigrateAsync();

	await Seed.SeedUsers(context);

}
catch (Exception ex)
{

	var logger = services.GetService<Logger<Program>>();
	logger.LogError(ex, "An Error Occured while migartion");
}

//
app.Run();
