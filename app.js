const main = document.getElementById("main");
const globalSection = document.getElementById("global")
const countrySection = document.getElementById("country")
const searchBar = document.getElementById("searchBar");


document.addEventListener("DOMContentLoaded", function(){
    fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        //Elementos para os dados globais
        let globalTitle = document.createElement("h2");
        globalTitle.className = "title"
        globalTitle.innerText = "Global Stats"

        let bandeira = document.createElement("img")
    

        let global = data.Global
        let globalKeys = Object.keys(global);

        globalKeys.splice(4,3);

        globalKeys.forEach(item => {
            let  globalInfo = document.createElement("div")
            globalInfo.className= "global-stats"
            globalSection.appendChild(globalInfo)

            let info = document.createElement("h1");
            info.innerHTML = item.replace(/([a-z])([A-Z])/g, '$1 $2');
            globalInfo.appendChild(info)
    
            main.insertBefore(globalTitle, globalSection)

            let infoData = document.createElement("h2")
            infoData.innerHTML = global[item];
            globalInfo.appendChild(infoData)
        })

        //Elementos para cada país
        let paises = data.Countries
        let paisesKeys = Object.keys(paises);

        paisesKeys.forEach(item => {
            //Nomes e bandeiras dos países
            let paisInfo = paises[item];
            let paisNome = paisInfo.Country
            let paisCode = paisInfo.CountryCode
            paisCode = paisCode.toLowerCase()

            console.log(paisInfo)

            let pais = document.createElement("div");

            let nomePais = document.createElement("h1");
            nomePais.innerHTML = paisNome;
            pais.appendChild(nomePais)
            pais.className = "pais"
            countrySection.appendChild(pais)
            let bandeira = document.createElement("img");
            bandeira.src = "https://flagcdn.com/" + paisCode + ".svg";
            pais.appendChild(bandeira)

            //Informações sobre os países
            let paisInfoKeys = Object.keys(paisInfo)

            let paisNewDeaths = paisInfo.NewDeaths;
            let paisNewConfirmed = paisInfo.NewConfirmed;
            let paisTotalDeaths = paisInfo.TotalDeaths;
            let paisTotalConfirmed = paisInfo.TotalConfirmed;

            let paisInfoCard = document.createElement("div")
            paisInfoCard.className = "pais-card"
            pais.appendChild(paisInfoCard)

            let newDeaths = document.createElement("h3");
            let newConfirmed = document.createElement("h3");
            let totalDeaths = document.createElement("h3");
            let totalConfirmed = document.createElement("h3");

            newDeaths.innerHTML = paisInfoKeys[6].replace(/([a-z])([A-Z])/g, '$1 $2') + ":" + paisNewDeaths
            newConfirmed.innerHTML =paisInfoKeys[4].replace(/([a-z])([A-Z])/g, '$1 $2') + ":" + paisNewConfirmed
            totalDeaths.innerHTML =paisInfoKeys[7].replace(/([a-z])([A-Z])/g, '$1 $2') + ":" + paisTotalDeaths
            totalConfirmed.innerHTML =paisInfoKeys[5].replace(/([a-z])([A-Z])/g, '$1 $2') + ":" + paisTotalConfirmed

            paisInfoCard.appendChild(newDeaths)
            paisInfoCard.appendChild(newConfirmed)
            paisInfoCard.appendChild(totalDeaths)
            paisInfoCard.appendChild(totalConfirmed)

            pais.addEventListener("click", (e) => {
                paisInfoCard.classList.toggle("country-info")
            })
            
            
        })
    })
    
})
