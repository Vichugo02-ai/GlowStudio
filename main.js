document.addEventListener('DOMContentLoaded', () => {
    // Array de productos (Alta calidad de fotografía como en el brief)
    const products = [
        { id: 1, title: 'Vestido Noir Plisado', price: '$180.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&auto=format&fit=crop&q=80' },
        { id: 2, title: 'Abrigo Minimal', price: '$350.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80' },
        { id: 3, title: 'Bolso Estructurado Piel', price: '$220.00', category: 'accessories', img: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=600&auto=format&fit=crop&q=80' },
        { id: 4, title: 'Vestido Seda Blanca', price: '$195.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=80' },
        { id: 5, title: 'Gafas Retro', price: '$85.00', category: 'accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80' },
        { id: 6, title: 'Vestido Tejido', price: '$140.00', category: 'dresses', img: 'https://images.unsplash.com/photo-1583391733958-6c515d911bba?w=600&auto=format&fit=crop&q=80' }
    ];

    const gridContainer = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const wishlistCountEl = document.getElementById('wishlist-count');
    let wishlistCount = 0;

    // Función para renderizar el catálogo de ropa
    function renderProducts(filter = 'all') {
        gridContainer.innerHTML = ''; // Limpiar cuadrícula
        
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(p => p.category === filter);

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            // Inyectamos el HTML de cada tarjeta
            card.innerHTML = `
                <img src="${product.img}" alt="${product.title}">
                <div class="product-info">
                    <div>
                        <div class="product-title">${product.title}</div>
                        <div class="product-price">${product.price}</div>
                    </div>
                    <button class="heart-btn" aria-label="Guardar en wishlist">♡</button>
                </div>
            `;

            // Agregar funcionalidad al botón de corazón
            const heartBtn = card.querySelector('.heart-btn');
            heartBtn.addEventListener('click', () => {
                heartBtn.classList.toggle('active');
                if(heartBtn.classList.contains('active')){
                    heartBtn.innerHTML = '♥';
                    wishlistCount++;
                } else {
                    heartBtn.innerHTML = '♡';
                    wishlistCount--;
                }
                // Actualizar el contador en la barra superior
                wishlistCountEl.textContent = wishlistCount;
            });

            gridContainer.appendChild(card);
        });
    }

    // Inicializar mostrando todos los productos
    renderProducts();

    // Lógica para los botones de filtrado (Todo, Vestidos, Accesorios)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Quitar clase activa a todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase activa solo al botón clickeado
            e.target.classList.add('active');
            // Cargar los productos correspondientes
            renderProducts(e.target.dataset.filter);
        });
    });
});