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
          onRegionClick:function(event, label, code){
            console.log(country_name)
            var info = ''

            function findCountries(country) {
                return country.name === country_name;
            }

            info = data.find(findCountries);

            var HTMLinfo = `
            <h3>Name: ${info.name}<h3>
            <p>Native name: ${info.nativeName}<p>
            <img src="${info.flag}">
            <p>Population: ${info.population}<p>
            <p>Region: ${info.region}<p>
            `;
           
           var origin =  document.getElementById('info');
           origin.innerHTML = HTMLinfo;
          }
        });  
      });