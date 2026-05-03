using EurovisionShop.Api.Models;

namespace EurovisionShop.Api.DTOs.Orders
{
    public class CreateOrderDto
    {
        public string UserId { get; set; } = string.Empty;
        public List<OrderItem> Items { get; set; } = new();
    }
}
