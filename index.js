let cart = [];
    let totalPrice = 0;

    // Функция добавления товара в корзину
    function addToCart(productName, price, productId) {
      cart.push({ product: productName, price: price });
      totalPrice += price;

      // Обновляем информацию о корзине
      document.getElementById('cartCount').textContent = cart.length;
      document.getElementById('totalPrice').textContent = totalPrice + ' руб.';

      // Обновляем кнопку товара
      const button = document.querySelector(`#${productId} button`);
      button.textContent = 'Товар добавлен!';
      button.disabled = true;
      button.classList.add('added');

      // Отправляем данные в форму
      sendDataToForm(cart);
    }

    // Функция отправки данных в форму
    function sendDataToForm(cart) {
      const iframe = document.getElementById('orderForm');
      const iframeWindow = iframe.contentWindow;

      // Преобразуем корзину в JSON
      const jsonOrder = JSON.stringify(cart);

      // Отправляем данные в iframe через postMessage
      iframeWindow.postMessage({
        orderId: '123456',
        orderData: jsonOrder
      }, '*');
    }

    // Обработчик сообщений для получения данных в форме
    window.addEventListener('message', (event) => {
      if (event.origin !== 'https://yashashin.ru') return;
      const data = event.data;
      if (data.orderId && data.orderData) {
        console.log('Получены данные заказа:', data);
      }
    });