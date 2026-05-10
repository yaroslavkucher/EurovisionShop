using EurovisionShop.Api.DTOs;
using EurovisionShop.Api.Models;

namespace EurovisionShop.Api.Mappers
{
    public static class OrderMappingExtensions
    {
        public static OrderDto ToDto(this Order order)
        {
            if (order == null) return null!;

            return new OrderDto
            {
                Id = order.Id,
                UserId = order.UserId,
                Status = order.Status,
                OrderDate = order.OrderDate,
                Items = order.Items?.Select(i => new OrderItemDto
                {
                    Id = i.Id,
                    OrderId = i.OrderId,
                    ProductId = i.ProductId,
                    ProductName = i.Product?.Name ?? "Невідомий товар",
                    Quantity = i.Quantity,
                    UnitPrice = i.UnitPrice
                }).ToList() ?? new List<OrderItemDto>()
            };
        }
    }
}