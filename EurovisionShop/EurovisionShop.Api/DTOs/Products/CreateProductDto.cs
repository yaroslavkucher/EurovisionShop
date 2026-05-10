using System.ComponentModel.DataAnnotations;

namespace EurovisionShop.Api.DTOs
{
    public class CreateProductDto
    {
        [Required(ErrorMessage = "Назва товару обов'язкова")]
        [MaxLength(100, ErrorMessage = "Назва не може перевищувати 100 символів")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(1000, ErrorMessage = "Опис занадто довгий")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Ціна є обов'язковою")]
        [Range(0.01, 100000, ErrorMessage = "Ціна має бути більшою за 0")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Категорія є обов'язковою")]
        public string Category { get; set; } = string.Empty;

        [Range(0, int.MaxValue, ErrorMessage = "Кількість на складі не може бути від'ємною")]
        public int StockQuantity { get; set; }
    }
}
