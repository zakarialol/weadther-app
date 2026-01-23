//https://geocoding-api.open-meteo.com/v1/search?name=Casablanca
//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m

export async function weaderCity(city) {
    let res  =await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    if(!res.ok) throw new Error('something went wrong with fetch')
    const data = await res.json()
    const latitude = data.results[0].latitude
    const longtude = data.results[0].longitude
    return getWeatherInfofunc(latitude,longtude)
}
async function getWeatherInfofunc(lati,longti){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longti}&hourly=temperature_2m,is_day,weathercode&timezone=auto`;
    const res = await fetch(url)
    if(!res.ok) throw new Error("fetch didn't work")
    const data = await res.json()
    return data
}