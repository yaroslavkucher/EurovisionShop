using EurovisionShop.Api.Models;

namespace EurovisionShop.Api.DTOs.Orders
{
    public class EditOrderStatusDto
    {
        public int Id { get; set; }
        public OrderStatus Status { get; set; }
    }
}
