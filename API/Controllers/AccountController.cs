using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly UserManager<AppUser> userManager;
        public TokenService TokenService { get; }

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            this.TokenService = tokenService;
            this.userManager = userManager;
            
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            // this will either return an user or null
            if (user == null) return Unauthorized();

            var result = await userManager.CheckPasswordAsync(user, loginDto.Password);
            // this is gonna return a flag indicating whether given password is correct or incorrect 
            if (result)
            {
                return CreateUserObject(user);
            }
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<ActionResult<UserDTO>> Register(RegisterDto registerDto)
        {
            if (await userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("This username is already exists");
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };
            var result = await userManager.CreateAsync(user, registerDto.Password);
            if(result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUzer()
        {
            var user = await userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        private UserDTO CreateUserObject(AppUser user)
        {
            return new UserDTO
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = TokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}