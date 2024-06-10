// cart.js


let cart = [];

function addToCart(button) {
    const product = button.parentElement;
    const id = product.getAttribute('data-id');
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));

    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const newProduct = { id, name, price, quantity: 1 };
        cart.push(newProduct);
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
            <button onclick="removeFromCart(${index})">Remove</button>`;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const cartData = JSON.stringify(cart);
    localStorage.setItem('cart', cartData);

    window.location.href = 'cartdetails.html';
}
