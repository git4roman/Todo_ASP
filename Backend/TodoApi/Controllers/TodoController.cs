using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/todos")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;
        public TodoController(TodoContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            var todos = await _context.Todos.ToListAsync();
            return todos;
        }
        [HttpPost]
        public async Task<ActionResult<TodoItem>> CreateTodo(TodoItem todo)
        {
            if (todo.Title == "") return BadRequest();
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
            return todo;
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo== null) return NotFound();
            _context.Todos.Remove(todo);
            return todo;
        }

    }
}