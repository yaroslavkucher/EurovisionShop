using EurovisionShop.Api.Data;
using EurovisionShop.Api.DTOs;
using EurovisionShop.Api.Mappers;
using EurovisionShop.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EurovisionShop.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OrdersController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null) return NotFound();

        return Ok(order.ToDto());
    }

    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] EditOrderStatusDto dto)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null) return NotFound();

        order.Status = dto.Status;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<OrderDto>> PlaceOrder(CreateOrderDto dto)
    {
        var productIds = dto.Items.Select(i => i.ProductId).ToList();

        var productsFromDb = await _context.Products
            .Where(p => productIds.Contains(p.Id))
            .ToDictionaryAsync(p => p.Id);

        var orderItems = new List<OrderItem>();

        foreach (var itemDto in dto.Items)
        {
            if (!productsFromDb.TryGetValue(itemDto.ProductId, out var product))
            {
                return BadRequest(new { message = $"Товар з ID {itemDto.ProductId} не знайдено." });
            }

            orderItems.Add(new OrderItem
            {
                ProductId = product.Id,
                Quantity = itemDto.Quantity,
                UnitPrice = product.Price
            });
        }

        var order = new Order
        {
            UserId = dto.UserId,
            OrderDate = DateTime.UtcNow,
            Status = OrderStatus.Pending,
            Items = orderItems
        };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order.ToDto());
    }
}