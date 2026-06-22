// ===== PRODUCT DATA =====
const products = [
    { id: 1, name: "Men's Classic Kurta", price: 2500, oldPrice: 3200, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Kurta" },
    { id: 2, name: "Women's Saree", price: 3500, oldPrice: 4500, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Saree" },
    { id: 3, name: "Men's Daura Suruwal", price: 4200, oldPrice: 5000, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Daura" },
    { id: 4, name: "Women's Kurti Set", price: 2200, oldPrice: 2800, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Kurti" },
    { id: 5, name: "Boys Wedding Suit", price: 3800, oldPrice: 4800, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Suit" },
    { id: 6, name: "Girls Frock", price: 1800, oldPrice: 2400, image: "https://via.placeholder.com/300x400/1a1a1a/ffd700?text=Frock" },
];

let cart = [];
let totalItems = 0;

// ===== DISPLAY PRODUCTS =====
function displayProducts() {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div>
                <span class="price">NPR ${p.price}</span>
                <span class="old-price">NPR ${p.oldPrice}</span>
            </div>
            <button class="btn-add" onclick="addToCart(${p.id})">
                <i class="fas fa-plus"></i> Add to Cart
            </button>
        </div>
    `).join('');
}

// ===== ADD TO CART =====
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    totalItems += 1;
    updateCart();
    showNotification(`${product.name} added!`);
}

// ===== UPDATE CART UI =====
function updateCart() {
    document.getElementById('cartCount').textContent = totalItems;
    
    const cartItemsDiv = document.getElementById('cartItems');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">🛍️ Cart is empty</p>';
    } else {
        cartItemsDiv.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span class="item-name">${item.name} × ${item.qty}</span>
                <span class="item-price">NPR ${item.price * item.qty}</span>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    document.getElementById('cartTotal').textContent = total;
}

// ===== CART OPEN/CLOSE =====
function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
}
function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
}

// ===== CHECKOUT =====
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty! Add some items first.');
        return;
    }
    closeCart();
    document.getElementById('orderModal').classList.add('active');
}

// ===== MODAL =====
function closeModal() {
    document.getElementById('orderModal').classList.remove('active');
}

// ===== ORDER FORM =====
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelectorAll('input[type="text"]')[1].value;
    const address = this.querySelectorAll('input[type="text"]')[2].value;
    const province = this.querySelector('select').value;
    
    // Create WhatsApp message
    const items = cart.map(i => `${i.name} × ${i.qty} = NPR ${i.price * i.qty}`).join('\n');
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const message = `🛍️ *New Order - The New Fashion Jaleshwar*\n\n` +
                    `👤 Name: ${name}\n` +
                    `📱 Phone: ${phone}\n` +
                    `📍 Address: ${address}, ${province}\n` +
                    `📦 Items:\n${items}\n` +
                    `💰 Total: NPR ${total}\n` +
                    `🚚 Delivery: All Over Nepal 🇳🇵`;
    
    const whatsappUrl = `https://wa.me/977986???????`; // APNA NUMBER DAALEIN
    window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset
    cart = [];
    totalItems = 0;
    updateCart();
    closeModal();
    this.reset();
    alert('✅ Order placed! We will contact you shortly.');
});

// ===== NOTIFICATION =====
function showNotification(msg) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; bottom: 20px; right: 20px; background: #ffd700; 
        color: #000; padding: 15px 30px; border-radius: 10px; font-weight: 600;
        z-index: 9999; animation: slideUp 0.5s ease;
    `;
    toast.textContent = '✅ ' + msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// ===== INIT =====
displayProducts();