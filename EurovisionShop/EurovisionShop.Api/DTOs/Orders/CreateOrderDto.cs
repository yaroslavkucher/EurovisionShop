using System.ComponentModel.DataAnnotations;

namespace EurovisionShop.Api.DTOs
{
    public class CreateOrderDto
    {
        [Required(ErrorMessage = "ID користувача є обов'язковим")]
        public string UserId { get; set; } = string.Empty;

        [Required(ErrorMessage = "Замовлення не може бути порожнім")]
        [MinLength(1, ErrorMessage = "Додайте хоча б один товар у кошик")]
        public List<CreateOrderItemDto> Items { get; set; } = new();
    }
}