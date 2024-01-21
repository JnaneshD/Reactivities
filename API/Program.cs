using API.Extensions;
using API.Middleware;
using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers(options => {
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    options.Filters.Add(new AuthorizeFilter(policy)); //this means every endpoint will need authentication 
});
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// when we are done with this scope, we will dispose this service. It automatically frees up memory. 
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync(); // this would be same as database update command in the dotnet-ef database thing
    // Use the seed data to put random data
    await Seed.SeedData(context, userManager);
}
catch (Exception ex)
{
    
    var logger = services.GetRequiredService<ILogger<Program>>();   
    logger.LogError(ex, "An error occured during the migration");
}

app.Run();
