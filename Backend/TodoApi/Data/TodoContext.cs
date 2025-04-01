using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }
        public DbSet<TodoItem> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TodoItem>().HasData(
                new TodoItem { Id = 1, Title = "Learn ASP.NET", IsCompleted = false },
                new TodoItem { Id = 2, Title = "Build ASP.NET", IsCompleted = false },
                new TodoItem { Id = 3, Title = "Implement ASP.NET", IsCompleted = false }
            );
        }
    }
}