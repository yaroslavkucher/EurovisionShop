using EurovisionShop.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace EurovisionShop.Api.DTOs
{
    public class CreateOrderItemDto
    {
        [Required(ErrorMessage = "Вкажіть ідентифікатор товару")]
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Кількість є обов'язковою")]
        [Range(1, 100, ErrorMessage = "Можна замовити від 1 до 100 одиниць")]
        public int Quantity { get; set; }
    }
}
