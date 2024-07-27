const container = document.querySelector('.container');
const search = document.querySelector('.search-container button');
const weatherContainer = document.querySelector('.weather-container');
const weatherDetails = document.querySelector('.info-weather');

search.addEventListener('click', () => {
    const apikey = '6846e0356213a94c3ee8e6835948e43d';
    const city = document.querySelector('.search-container input').value;

    if (city === '') return;

    // Clear previous results and error states
    const ooooops = document.querySelector('.notfound');
    const oopsimg = document.querySelector('.notfound img');
    const oopsp = document.querySelector('.notfound p');
    const humid = document.querySelector('.humidity');
    const windy = document.querySelector('.wind');
    const image = document.querySelector('.weather-container img');
    const description = document.querySelector('.weather-container .desc');
    const temperature = document.querySelector('.weather-container .temp');
    const humidity = document.querySelector('.humidity span');
    const wind = document.querySelector('.wind span');

    weatherContainer.classList.remove('erreur', 'active');
    ooooops.classList.remove('notfound-active');
    oopsimg.classList.remove('erreur');
    oopsp.classList.remove('erreur');
    humid.classList.remove('erreur', 'active');
    windy.classList.remove('erreur', 'active');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                weatherContainer.classList.add('erreur');
                ooooops.classList.add('notfound-active');
                humid.classList.add('erreur');
                windy.classList.add('erreur');
                return;
            }

            humid.classList.add('active');
            windy.classList.add('active');
            weatherContainer.classList.add('active');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
            }

            temperature.innerHTML = parseInt(json.main.temp) + '<span>°C</span>';
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = parseInt(json.main.humidity) + '%';
            wind.innerHTML = parseInt(json.wind.speed) + ' km/h';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
});
