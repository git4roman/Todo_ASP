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
            if (todo == null) return NotFound();
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();
            return todo;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null) return NotFound();
            return Ok(todo);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<TodoItem>> EditTodos(int id, TodoItem todo)
        {
            var existingtodo = await _context.Todos.FindAsync(id);
            if (existingtodo == null) return NotFound();
            existingtodo.Title = todo.Title;
            existingtodo.IsCompleted = todo.IsCompleted;
            _context.Todos.Update(existingtodo);

            await _context.SaveChangesAsync();
            return Ok(existingtodo);
        }

    }
}