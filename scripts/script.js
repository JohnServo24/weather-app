const roundNum = num => Math.round(num * 100) / 100;

const kelvinToCelsius = temp => roundNum(temp - 273.15);

const celsiusToFahrenheit = temp => roundNum((temp * (9/5)) + 32);

const fahrenheitToCelsius = temp => roundNum((temp - 32) * (5/9));

const getWeather = async place => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=b4b83f2b8d179c2bad3ddefc61e51390`);
    const promise = await response.json();

    country.innerHTML = promise.name;
    countryCode.innerHTML = `&nbsp${promise.sys.country}`;
    temp.innerHTML = kelvinToCelsius(promise.main.temp);
    humidity.innerHTML = promise.main.humidity;
    pressure.innerHTML = promise.main.pressure;
}

const toggleTemp = () => {
    const type = tempType.textContent;
    const deg = temp.textContent;

    let newTemp = 0;

    if(type === '°C') {
        newTemp = celsiusToFahrenheit(deg);
        tempType.textContent = '°F';
    } else if(type === '°F') {
        newTemp = fahrenheitToCelsius(deg);
        tempType.textContent = '°C';
    }

    temp.textContent = newTemp;
}

const createElements = () => {
    const card = document.createElement('div');
    const cardTop = document.createElement('div');
    const cardMid = document.createElement('div');
    const cardBot = document.createElement('div');

    const country = document.createElement('p');
    const countryCode = document.createElement('p');

    const cardTemp = document.createElement('div');
    const cardOther = document.createElement('div');

    const temp = document.createElement('p');
    const tempType = document.createElement('span');

    const humidity = document.createElement('p');
    const pressure = document.createElement('p');

    const humidityText = document.createElement('span');
    const pressureText = document.createElement('span');

    const checkbox = document.createElement('input');
    const label = document.createElement('label');
}

const form = document.getElementById('form');
const search = document.getElementById('search');
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
