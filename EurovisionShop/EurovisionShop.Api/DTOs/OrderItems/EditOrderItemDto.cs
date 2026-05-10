using System.ComponentModel.DataAnnotations;

namespace EurovisionShop.Api.DTOs
{
    public class EditOrderItemDto
    {
        [Required]
        [Range(1, 100, ErrorMessage = "Кількість має бути від 1 до 100 одиниць")]
        public int Quantity { get; set; }
    }
}
