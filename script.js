let weather = {
    apiKey: "d8182d8bce773a3f245f4de5ae6be0c8",
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + 
            "&appid=" + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data))
            .catch(error => console.error("Error:", error)); // Add error handling
    },
    displayWeather: function(data) {
        try {
            const { name } = data;
            const { icon, description } = data.weather[0];
            const tempInKelvin = data.main.temp;
            const tempInCelsius = (tempInKelvin - 273.15).toFixed(2); // Convert from Kelvin to Celsius
            const { humidity } = data.main;
            const { speed } = data.wind;
            const { timezone } = data.timezone;
            const { time } = document.querySelector('.timezone');
            const { dateConst } = document.querySelector('.show-date');

            console.log(name, icon, description, tempInCelsius, humidity, speed, timezone, time, dateConst);

            document.querySelector(".city").innerText = "Weather in " + name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerText = description;
            document.querySelector(".temp").innerText = tempInCelsius + "°C";
            document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
            document.querySelector(".wind").innerText = "Wind speed: " + speed + "km/h";
            let gmt = document.querySelector(".timezone").innerText = ` ${data.timezone / 3600} `;
            document.querySelector(".timezone").innerText = `Timezone: GMT ${data.timezone / 3600}:00 `;

            let temp = new Date();
            let hours = temp.getHours();
            let minutes = temp.getMinutes();
            let monthNumber = temp.getDay();
            //let days = temp.getDay();
            
            let hoursNew = +hours + +gmt -1;

            let date = new Date();
            const month = date.toLocaleString('default', { month: 'long' });
            const day = date.toLocaleString('default', { weekday: 'long' });
            const year = date.getFullYear();

            document.querySelector(".time").innerText = "Time: " + hoursNew + ":" + minutes;
            document.querySelector(".show-date").innerText = day + " " + month + " " + monthNumber + " " + year;

            document.querySelector('.weather').classList.remove('loading');
        } catch (error) {
            console.error("Error displaying weather:", error);
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

weather.fetchWeather("YourCityName");

document.querySelector('.search-button').addEventListener('click', function() {
    weather.search();
})

document.querySelector('.search-bar').addEventListener('keyup', function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})
