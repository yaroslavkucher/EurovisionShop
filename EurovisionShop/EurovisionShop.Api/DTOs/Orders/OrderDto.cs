using EurovisionShop.Api.Models;

namespace EurovisionShop.Api.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;

        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public List<OrderItemDto> Items { get; set; } = new();
    }
}
