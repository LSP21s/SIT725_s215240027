// static categories shown when clicking Browse Categories
const categories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Dessert",
    "Drinks"
];

// load category buttons on screen
function loadCategoryMode() {
    const container = document.getElementById("featured-section");
    container.innerHTML = "<h2>Select a Category</h2>";

    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.classList.add("category-btn");
        
        btn.addEventListener("click", () => {
            loadCategories(cat);
        });

        container.appendChild(btn);
    });
}

// get recipes by category
async function loadCategories(category) {
    const res = await fetch(`/api/recipes/categories?category=${category}`);
    const data = await res.json();
    displayCards(data);
}

// get latest recipes
async function loadLatest() {
    const res = await fetch(`/api/recipes/latest`);
    const data = await res.json();
    displayCards(data);
}

// display recipe cards
function displayCards(recipes) {
    const container = document.getElementById("featured-section");
    container.innerHTML = "";

    recipes.forEach(r => {
        container.innerHTML += `
            <div class="recipe-card">
                <img src="${r.image}" alt="${r.title}">
                <h3>${r.title}</h3>
                <p>${r.category}</p>
                <span>${r.time} mins</span>
            </div>
        `;
    });
}


// load featured (just reuse category for now)
function loadFeatured() {
  loadCategories("Dessert"); // or whatever category you want as featured
}

// load latest automatically
window.onload = function() {
  loadFeatured();
  loadLatest();
};

async function loadAllRecipes() {
    const res = await fetch("/api/recipes/latest");
    const data = await res.json();
    displayCards(data);
};
