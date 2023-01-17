const search = document.querySelector('#search');
const matchList = document.querySelector('#match-list');

// Search russian-cities.json and filter it
const searchStates = async (searchText) => {
  const res = await fetch('russian-cities.json');
  const states = await res.json();

  // Get matches to current text input
  let matches = states.filter((state) => {
    const regex = new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex) || state.district.match(regex);
  });
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }

  outPutHtml(matches);
};

// Show result in HTML
const outPutHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map((match) => {
        return `<div class='card card-body mb-1'>
        <h4>${match.name} (${match.district} Федеральный округ)
          <div>
            <span class='text-primary'>Население: ${match.population}</span>
          </div>
        </h4>
        <small>Lat ${match.coords.lat} / Long ${match.coords.lon}</small>
      </div>`;
      })
      .join('');

    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => searchStates(search.value));
