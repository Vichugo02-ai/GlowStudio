document.addEventListener('DOMContentLoaded', () => {
    // Array de productos de alta calidad para el catálogo
    const products = [
        { id: 1, title: 'Vestido Noir Plisado', price: '$180.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&auto=format&fit=crop&q=80', height: 600 },
        { id: 2, title: 'Abrigo Minimalista Lana', price: '$350.00', category: 'outerwear', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80', height: 450 },
        { id: 3, title: 'Bolso Estructurado Piel', price: '$220.00', category: 'accessories', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop&q=80', height: 400 },
        { id: 4, title: 'Vestido Seda Blanca', price: '$195.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=80', height: 550 },
        { id: 5, title: 'Gafas Retro Noir', price: '$85.00', category: 'accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80', height: 400 },
        { id: 6, title: 'Trench Coat Ébano', price: '$290.00', category: 'outerwear', img: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&auto=format&fit=crop&q=80', height: 650 }
    ];

    const productGrid = document.getElementById('product-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categoryItems = document.querySelectorAll('.category-item');
    const wishlistBadge = document.getElementById('wishlist-count');
    
    let wishlist = [];

    // Función para renderizar los productos en la cuadrícula
    function renderProducts(filterCategory) {
        productGrid.innerHTML = ''; // Limpiar la cuadrícula
        
        const filteredProducts = filterCategory === 'all' 
            ? products 
            : products.filter(product => product.category === filterCategory);

        filteredProducts.forEach(product => {
            const isLiked = wishlist.includes(product.id);
            const heartIcon = isLiked ? '♥' : '♡';
            const activeClass = isLiked ? 'active' : '';

            const card = document.createElement('div');
            card.className = 'product-card';
            // Aplicar alturas variadas para generar asimetría
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <img src="${product.img}" alt="${product.title}" style="height: ${product.height}px;">
                </div>
                <div class="product-info">
                    <div class="product-details">
                        <h3>${product.title}</h3>
                        <span class="product-price">${product.price}</span>
                    </div>
                    <button class="wishlist-btn ${activeClass}" data-id="${product.id}">${heartIcon}</button>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Re-asignar eventos a los nuevos botones de wishlist
        attachWishlistEvents();
    }

    // Manejo de clicks en Wishlist
    function attachWishlistEvents() {
        const wishlistBtns = document.querySelectorAll('.wishlist-btn');
        wishlistBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const index = wishlist.indexOf(id);
                
                if (index === -1) {
                    wishlist.push(id); // Añadir
                    e.currentTarget.classList.add('active');
                    e.currentTarget.textContent = '♥';
                } else {
                    wishlist.splice(index, 1); // Quitar
                    e.currentTarget.classList.remove('active');
                    e.currentTarget.textContent = '♡';
                }
                
                // Actualizar contador
                wishlistBadge.textContent = wishlist.length;
            });
        });
    }

    // Manejo de Filtros
    function applyFilter(category) {
        // Actualizar botones de la barra inferior
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });
        
        // Actualizar items del carrusel superior
        categoryItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-filter') === category);
        });

        renderProducts(category);
    }

    // Eventos para filtros (Barra inferior y Carrusel)
    const allFilterElements = [...filterButtons, ...categoryItems];
    allFilterElements.forEach(element => {
        element.addEventListener('click', (e) => {
            const category = e.currentTarget.getAttribute('data-filter');
            applyFilter(category);
        });
    });

    // Render inicial
    renderProducts('all');
});