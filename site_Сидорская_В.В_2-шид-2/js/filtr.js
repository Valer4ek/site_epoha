const cards = document.querySelectorAll(".catalog-item");
const filterButtons = document.querySelectorAll(".filter-option");
const searchInput = document.getElementById("searchInput");
const searchButton = document.querySelector(".search-btn");
const showMoreBtn = document.getElementById("showMoreBtn");
const filters = {
  status: "all",
  date: "all",
  popular: "all",
  price: "all",
  search: ""
};
let visibleCards = 3;


function updateCards() {
    let filtered = [];

    cards.forEach(card => {
        const title = card.querySelector(".catalog-title").textContent.toLowerCase();
        const matchStatus = filters.status === "all" || card.classList.contains(filters.status);
        const matchDate = filters.date === "all" || card.classList.contains(filters.date);
        const matchPopular = filters.popular === "all" || card.classList.contains(filters.popular);
        const matchPrice = filters.price === "all" || card.classList.contains(filters.price);
        const matchSearch = title.includes(filters.search.toLowerCase());

        if (matchStatus && matchDate && matchPopular && matchPrice && matchSearch) {
            filtered.push(card);
        }

        card.style.display = "none";
    });

    filtered.forEach((card, index) => {
        if (index < visibleCards) {
        card.style.display = "block";
        }
    });


    if (showMoreBtn) {
        if (filtered.length <= 3) {
            showMoreBtn.style.display = "none";
        }
        else {
            showMoreBtn.style.display = "block";
        }
    }

    if (showMoreBtn) {
        if (visibleCards >= filtered.length) {
            showMoreBtn.textContent = "Скрыть";
        } 
        else {
            showMoreBtn.textContent ="Еще спектакли";
        }
    }
}

filterButtons.forEach(btn => {
    btn.addEventListener("click", e => {
        e.preventDefault();
        const type = btn.dataset.type;
        const value = btn.dataset.value;

        filters[type] = value;
        document.querySelectorAll(`.filter-option[data-type="${type}"]`).forEach(el =>el.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        visibleCards = 3;

        updateCards();
    });
});

if (searchButton) {
    searchButton.addEventListener("click", () => {
        filters.search = searchInput.value;
        visibleCards = 3;
        updateCards();
    });
}
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        filters.search = searchInput.value;
        visibleCards = 3;
        updateCards();
    }
});

if (showMoreBtn) {showMoreBtn.addEventListener("click",() => {
    const filtered = [];
    cards.forEach(card => {
        const title = card.querySelector(".catalog-title").textContent.toLowerCase();
        const matchStatus = filters.status === "all" || card.classList.contains(filters.status);
        const matchDate = filters.date === "all" || card.classList.contains(filters.date);
        const matchPopular = filters.popular === "all" || card.classList.contains(filters.popular);
        const matchPrice = filters.price === "all" || card.classList.contains(filters.price);
        const matchSearch = title.includes(filters.search.toLowerCase());

        if (matchStatus && matchDate && matchPopular && matchPrice && matchSearch) {
          filtered.push(card);
        }
    });

    if (visibleCards >= filtered.length) {
        visibleCards = 3;
        showMoreBtn.textContent = "Еще спектакли";
    }
    else {
        visibleCards = filtered.length;
        showMoreBtn.textContent = "Скрыть";
    }

      updateCards();
});
}


updateCards();