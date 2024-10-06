const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.post('/cuaca', async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) throw 'Penggunaan: !cuaca <lokasi>';

        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(text)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
        if (!response.ok) throw 'Lokasi tidak ditemukan';

        let json = await response.json();
        if (json.cod != 200) throw json;

        const data = {
            location: json.name,
            country: json.sys.country,
            description: json.weather[0].description,
            temperature: json.main.temp,
            temp_max: json.main.temp_max,
            temp_min: json.main.temp_min,
            humidity: json.main.humidity,
            wind_speed: json.wind.speed
        };

        res.json(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
