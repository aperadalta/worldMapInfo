var countries = '';
var data = '';

function getCountryInfo(){
  $.ajax({
    url:'https://restcountries.eu/rest/v2/all',
    type:'get',
    success:function(res){
      data = res;
    }
  });
}
getCountryInfo();

function getCountryData(){
  $.ajax({
    url:'countries.json',
    type:'get',
    success:function(res){
      countries = res;
    }
  });
}
getCountryData();

$(document).ready(function(){
  $("#vmap").vectorMap({
    map: 'world_en',
    backgroundColor:'#222',
    borderColor:'#555',
    color:'#555',
    hoverOpacity:0.7,
    selectedColor:'#666666',
    enableZoom:true,
    enableDrag:true,
    showTooltip:true,
    normalizeFunction:'polynomial',
    onLabelShow:function(event,label,code){
      code = code.toUpperCase();
      country_name = countries[code];
      label.html('<strong>'+country_name+'</strong>');
    },
    onRegionClick:function(){
      var info = ''
      console.log(data);
      // Converting info into the object of the country
      function findCountries(country) {
          if(country_name == "United States") country_name = "United States of America";
          if(country_name == "Russia") country_name = "Russian Federation";
          if(country_name == "Iran") country_name = "Iran (Islamic Republic of)";
          return country.name === country_name;
      }
      info = data.find(findCountries);

      // Correcting numbers: 1000 -> 1.000
      function dotNumbers (num) {
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
      }
      var population = dotNumbers(info.population);
      var area = dotNumbers(info.area);
      var density = dotNumbers(Math.ceil(info.population/info.area));
      
      console.log(info);
      var HTMLinfo = `
          <h3>Name: ${info.name}<h3>
          <p>Native name: ${info.nativeName}<p>
          <hr>
          <p>Flag:</p>
          <img src="${info.flag}">
          <hr>
          <p>Population: ${population}<p>
          <p>Area: ${area} km<sup style="font-size: 0.7rem">2</sup></p>
          <p>Density: ${density} hab/km<sup style="font-size: 0.7rem">2</sup><p>
          <hr>
          <p>Region: ${info.region}<p>
          <p>Currencies: ${info.currencies[0].name} (${info.currencies[0].symbol})</p>
      `;
      
      var origin =  document.getElementById('info');
      origin.innerHTML = HTMLinfo;
    }
  });  
});