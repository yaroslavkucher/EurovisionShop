using EurovisionShop.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace EurovisionShop.Api.DTOs
{
    public class EditOrderStatusDto
    {
        [Required]
        public OrderStatus Status { get; set; }
    }
}
