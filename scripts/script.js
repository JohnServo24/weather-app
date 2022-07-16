const roundNum = num => Math.round(num * 100) / 100;

const kelvinToCelsius = temp => roundNum(temp - 273.15);

const celsiusToFahrenheit = temp => roundNum((temp * (9 / 5)) + 32);

const fahrenheitToCelsius = temp => roundNum((temp - 32) * (5 / 9));

const makeVisible = () => card.classList.add('card-visible');

const outputData = promise => {
    country.innerHTML = promise.name;
    countryCode.innerHTML = `&nbsp${promise.sys.country}`;
    temp.innerHTML = kelvinToCelsius(promise.main.temp);
    humidity.innerHTML = promise.main.humidity;
    pressure.innerHTML = promise.main.pressure;

    makeVisible();
}

const getWeather = async place => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b4b83f2b8d179c2bad3ddefc61e51390`);
    const promise = await response.json();

    outputData(promise);
}

const toggleTemp = () => {
    const type = tempType.textContent;
    const deg = temp.textContent;

    if (type === '°C') {
        newTemp = celsiusToFahrenheit(deg);
        tempType.textContent = '°F';
    } else if (type === '°F') {
        newTemp = fahrenheitToCelsius(deg);
        tempType.textContent = '°C';
    }

    temp.textContent = newTemp;
}

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');
const card = document.getElementById('card');
const country = document.getElementById('country');
const countryCode = document.getElementById('countryCode');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const tempType = document.getElementById('tempType');
const tempCheckbox = document.getElementById('toggleTemp');

form.addEventListener('submit', e => {
    getWeather(search.value);
});

tempCheckbox.addEventListener('click', e => {
    toggleTemp();
})