// ===== DOM references =====
const productGrid = document.getElementById("product-grid");
const searchInput = document.getElementById("search-input");
const addProductBtn = document.getElementById("add-product-btn");

// ===== Sample product pool for dynamic creation =====
const sampleProducts = [
  {
    title: "Laptop Stand",
    description:
      "Ergonomic aluminum stand that keeps your laptop cool and at eye level.",
    price: "$34.99",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
  },
  {
    title: "Mechanical Keyboard",
    description:
      "RGB backlit keyboard with tactile switches for a satisfying typing experience.",
    price: "$74.99",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  {
    title: "USB-C Hub",
    description:
      "7-in-1 hub with HDMI, USB-A, SD card, and 100W power delivery.",
    price: "$29.99",
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
  },
  {
    title: "Webcam HD",
    description:
      "1080p webcam with auto-focus, built-in mic, and low-light correction.",
    price: "$59.99",
    image:
      "https://images.unsplash.com/photo-1596394723269-e95af3b4ff1e?w=400&h=300&fit=crop",
  },
];

let sampleIndex = 0;

// ===== Part 2A: Add to Cart toggle =====
function handleCartClick(button) {
  const card = button.closest(".product-card");
  const isAdded = button.classList.toggle("added");
  button.textContent = isAdded ? "Added" : "Add to Cart";
  card.classList.toggle("in-cart", isAdded);
}

// Event delegation on the grid so dynamically added cards work automatically
productGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-cart")) {
    handleCartClick(e.target);
  }
});

// ===== Part 2B: Search / Filter =====
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const cards = productGrid.querySelectorAll(".product-card");

  cards.forEach(function (card) {
    const title = card.getAttribute("data-title").toLowerCase();
    card.classList.toggle("hidden", !title.includes(query));
  });
});

// ===== Part 3: Add Sample Product =====
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.setAttribute("data-title", product.title);

  card.innerHTML =
    '<img src="' + product.image + '" alt="' + product.title + '" class="product-image">' +
    '<div class="product-info">' +
      '<h2 class="product-title">' + product.title + "</h2>" +
      '<p class="product-description">' + product.description + "</p>" +
      '<p class="product-price">' + product.price + "</p>" +
      '<button class="btn btn-cart">Add to Cart</button>' +
    "</div>";

  return card;
}

addProductBtn.addEventListener("click", function () {
  const product = sampleProducts[sampleIndex % sampleProducts.length];
  const card = createProductCard(product);
  productGrid.appendChild(card);
  sampleIndex++;

  // Re-apply current search filter to the new card
  const query = searchInput.value.toLowerCase().trim();
  if (query) {
    const title = card.getAttribute("data-title").toLowerCase();
    card.classList.toggle("hidden", !title.includes(query));
  }
});
