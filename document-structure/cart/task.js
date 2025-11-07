document.addEventListener('DOMContentLoaded', function() {
    const cartProductsContainer = document.querySelector('.cart__products');

    // Обработчики для всех товаров
    document.querySelectorAll('.product').forEach(product => {
        const decButton = product.querySelector('.product__quantity-control_dec');
        const incButton = product.querySelector('.product__quantity-control_inc');
        const quantityValue = product.querySelector('.product__quantity-value');
        const addButton = product.querySelector('.product__add');

        // Уменьшение количества
        decButton.addEventListener('click', function() {
            let currentValue = parseInt(quantityValue.textContent);
            if (currentValue > 1) {
                quantityValue.textContent = currentValue - 1;
            }
        });

        // Увеличение количества
        incButton.addEventListener('click', function() {
            let currentValue = parseInt(quantityValue.textContent);
            quantityValue.textContent = currentValue + 1;
        });

        // Добавление в корзину
        addButton.addEventListener('click', function() {
            const productId = product.getAttribute('data-id');
            const quantity = parseInt(quantityValue.textContent);
            const productImage = product.querySelector('.product__image').src;

            addToCart(productId, quantity, productImage);
        });
    });

    // Функция добавления в корзину
    function addToCart(productId, quantity, productImage) {
        const existingProduct = cartProductsContainer.querySelector(`.cart__product[data-id="${productId}"]`);

        if (existingProduct) {
            // Увеличиваем количество существующего товара
            const countElement = existingProduct.querySelector('.cart__product-count');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + quantity;
        } else {
            // Создаем новый товар в корзине
            const cartProduct = document.createElement('div');
            cartProduct.className = 'cart__product';
            cartProduct.setAttribute('data-id', productId);

            cartProduct.innerHTML = `
                <img class="cart__product-image" src="${productImage}">
                <div class="cart__product-count">${quantity}</div>
            `;

            cartProductsContainer.appendChild(cartProduct);
        }
    }
});