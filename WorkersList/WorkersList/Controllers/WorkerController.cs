using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.Extensions.Logging;
using WorkersList.API.Models.Post;
using WorkersList.Core.DTOs;
using WorkersList.Core.Services;

namespace WorkersList.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkerController : ControllerBase
    {
        private readonly IWorkerService _workerService;
        private readonly IMapper _mapper;
        public WorkerController(IWorkerService workerService, IMapper mapper)
        {
            _workerService = workerService;
            _mapper = mapper;
        }

        // GET: api/<EventController>
        [HttpGet]
        public async Task<IActionResult> Get(Gender? gender, DateTime? startWorking)
        {
            var workers = await _workerService.GetWorkersAsync(gender, startWorking);
            var listDto = workers.Select(w => _mapper.Map<WorkerDto>(w));
            return Ok(listDto);
        }

        // GET api/<EventController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var worker = await _workerService.GetWorkerAsync(id);
            var workerDto = _mapper.Map<WorkerDto>(worker);
            if (workerDto is null)
                return NotFound();
            return Ok(workerDto);
        }

        // POST api/<EventController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WorkerPostModel post)
        {
            var worker = await _workerService.AddWorkerAsync(_mapper.Map<Worker>(post));
            var newWorker = await _workerService.GetWorkerAsync(worker.Id);
            return Ok(_mapper.Map<WorkerDto>(newWorker));
        }

        // PUT api/<EventController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] WorkerPostModel put)
        {
            var worker = await _workerService.UpdateWorkerAsync(id, _mapper.Map<Worker>(put));
            var newWorker = await _workerService.GetWorkerAsync(worker.Id);
            if (newWorker is null)
                return NotFound();
            return Ok(newWorker);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            var worker = await _workerService.UpdateWorkerStatusAsync(id);
            var newWorker = await _workerService.GetWorkerAsync(worker.Id);
            if (newWorker is null)
                return NotFound();
            return Ok(newWorker);
        }
    }
}