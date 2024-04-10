using AutoMapper;
using Microsoft.Extensions.Logging;
using WorkersList.Core.Entities;
using WorkersList.API.Models.Post;
using WorkersList.API.Models.put;

namespace WorkersList.API
{
    public class ApiMappingProfile:Profile
    {
        public ApiMappingProfile() 
        {
            CreateMap<Worker, WorkerPostModel>().ReverseMap();
            CreateMap<Worker, WorkerPutModel>().ReverseMap();
            CreateMap<Role, RolePostModel>().ReverseMap();
        }
    }
}
