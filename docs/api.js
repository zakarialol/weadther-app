// weather api
export async function weaderCity(city) {
        let res  =await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        console.log(res,'first respone')
        const data = await res.json()
        console.log(data,'data')
        if(!res.ok) throw new Error('something went wrong with fetch')
        console.log(data)
        const cityName = data.results[0].name
        console.log(cityName)
        const latitude = data.results[0].latitude
        const longtude = data.results[0].longitude
        return getWeatherInfofunc(latitude,longtude,cityName)
}
async function getWeatherInfofunc(lati,longti,cityName){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longti}&hourly=temperature_2m,is_day,weathercode&timezone=auto`;
    const res = await fetch(url)
    if(!res.ok) throw new Error("fetch didn't work")
    const data = await res.json()
    console.log(data)
    const obj ={
        data:data,
        cityName:cityName
    }
    return obj
}