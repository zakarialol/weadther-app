// selecting elemenet i will need 
const animationDiv = document.querySelector('[data-loading="loading-Div"]')
console.log(animationDiv,'animation div')
// weather api
export async function weaderCity(city) {
    animationDiv.classList.remove('hidden')
    try{
        let res  =await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        const data = await res.json()
        if(!res.ok) throw new Error('something went wrong with fetch')
        animationDiv.classList.add('hidden')
        const cityName = data.results[0].name
        const latitude = data.results[0].latitude
        const longtude = data.results[0].longitude
        return getWeatherInfofunc(latitude,longtude,cityName)
    }catch(err){
        console.log('error',err)
    }
}
async function getWeatherInfofunc(lati,longti,cityName){
    try{
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lati}&longitude=${longti}&hourly=temperature_2m,is_day,weathercode&timezone=auto`;
        const res = await fetch(url)
        if(!res.ok) throw new Error("fetch didn't work")
        const data = await res.json()
        const obj ={
            data:data,
            cityName:cityName
        }
        return obj
    }catch(err){
        console.log('err',err)
    }
}