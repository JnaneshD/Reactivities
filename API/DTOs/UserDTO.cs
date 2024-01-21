using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDTO
    {
        // This is going to have the properties that we want to send back to the user on a successful login
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string Image { get; set; }
        public string UserName { get; set; }
        
    }
}