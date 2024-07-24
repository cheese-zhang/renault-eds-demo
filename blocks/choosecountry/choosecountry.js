export default async function decorate(block) {
  let countries = [];
  countries = await new Promise((resolve) => {
    fetch('/country.json')
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        return {};
      })
      .then((json) => {
        countries = json.data;
        resolve(countries);
      })
      .catch(() => {
        // error
      });
  });
  const countryContainer = document.createElement('div');
  countryContainer.className = 'c-country-banner u-global-margin-fluid o-grid o-grid--no-gutter js-country-position';
  const countryWrapper = document.createElement('div');
  countryWrapper.className = 'c-country-banner__wrapper';
  const countriesTitle = document.createElement('div');
  countriesTitle.className = 'c-country-banner__title';
  countriesTitle.textContent = 'Choose your country';
  countryWrapper.append(countriesTitle);
  countryContainer.append(countryWrapper);

  const countryListContainer = document.createElement('div');
  countryListContainer.className = 'c-country-banner__btn-list js-country-list';
  countries.forEach((country) => {
    const button = document.createElement('a');
    button.className = 'c-btn c-btn--no-style c-country-banner__btn js-show-panel';
    button.href = country.value;
    button.textContent = country.key;
    countryListContainer.append(button);
  });
  countryContainer.append(countryListContainer);
  block.textContent = '';
  block.append(countryContainer);
}
