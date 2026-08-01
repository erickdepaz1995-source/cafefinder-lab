const shopList = document.querySelector('#shopList');
const zoneFilter = document.querySelector('#zoneFilter');

let shops = [];

async function loadShops() {
  try {
    const response = await fetch('./data/shops.json');
    if (!response.ok) {
      throw new Error('Unable to load shops data');
    }

    shops = await response.json();
    populateZones(shops);
    renderShops(shops);
  } catch (error) {
    shopList.innerHTML = '<p class="empty-state">Unable to load coffee shops.</p>';
    console.error(error);
  }
}

function populateZones(data) {
  const zones = ['All', ...new Set(data.map(shop => shop.zone))];

  zoneFilter.innerHTML = zones
    .map(zone => `<option value="${zone}">${zone}</option>`)
    .join('');
}

function renderShops(data) {
  if (!Array.isArray(data) || data.length === 0) {
    shopList.innerHTML = '<p class="empty-state">No shops found for this zone.</p>';
    return;
  }

  shopList.innerHTML = data
    .map(
      shop => `
        <article class="shop-card">
          <h2>${shop.name}</h2>
          <p class="shop-meta">Zone: ${shop.zone}</p>
          <p class="shop-meta">Specialty: ${shop.specialty}</p>
          <p class="shop-meta">Average price: Q${shop.avg_price}</p>
          <span class="shop-chip">${shop.specialty}</span>
        </article>
      `
    )
    .join('');
}

zoneFilter.addEventListener('change', (event) => {
  const selectedZone = event.target.value;
  const filteredShops = selectedZone === 'All'
    ? shops
    : shops.filter(shop => shop.zone === selectedZone);

  renderShops(filteredShops);
});

loadShops();
