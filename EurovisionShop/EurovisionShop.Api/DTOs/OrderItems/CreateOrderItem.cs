using EurovisionShop.Api.Models;

namespace EurovisionShop.Api.DTOs.OrderItems
{
    public class CreateOrderItem
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
    }
}
