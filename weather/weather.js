document.getElementById('location').onkeydown = function(e){
   if(e.keyCode == 13){
     getLocation();
   }
};

function getLocation() {
              	var location = document.getElementById("location").value;

                //create a script and add it to your page
                var script = document.createElement('script');
                script.src = "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + location + "')&format=json&callback=callbackFunction";
                document.body.appendChild(script);
                }

var callbackFunction = function(data) {
	var city = data.query.results.channel.location.city + "," + data.query.results.channel.location.region;
	var cityLabel = document.createElement("h2");
	cityLabel.appendChild(document.createTextNode(city));
	var label = document.getElementById("city");
	view.clearChildren(label);
	label.appendChild(cityLabel);

  var current = data.query.results.channel.item.condition.temp;
  view.clearChildren(document.getElementById("current"));
  document.getElementById("current").appendChild(document.createTextNode(current + "\u00b0"));

	var weather = document.getElementById("weather");
	view.clearChildren(weather);
	//document.getElementById("place").innerHTML = data.query.results.channel.location.city + "," + data.query.results.channel.location.region;
	for (i = 0; i < 5; i++) {
    var forecast = data.query.results.channel.item.forecast[i];
    var day = document.createElement("p");
    var icon = view.createIcon(forecast.code);
    day.appendChild(document.createTextNode(forecast.day + ", " + forecast.date));
    day.appendChild(document.createElement('br'));
    day.appendChild(document.createElement('br'));
    day.appendChild(icon);
    day.appendChild(document.createElement('br'));
    day.appendChild(document.createTextNode("High"));
    day.appendChild(document.createElement('br'));
    day.appendChild(document.createTextNode(forecast.high + "\u00b0"));
    day.appendChild(document.createElement('br'));
    day.appendChild(document.createTextNode("Low"));
    day.appendChild(document.createElement('br'));
    day.appendChild(document.createTextNode(forecast.low + "\u00b0"));
    weather.appendChild(day);
	}


  };

var view = {
	"clearChildren": function (node) {
		while (node.hasChildNodes()) {
    		node.removeChild(node.lastChild);
		}
	},

  "createIcon": function (code) {
    var svg;
    svg = document.createElement("img");
    svg.src = "Cloudy.svg";
    svg.height = "80";
    svg.width = "100";
    console.log(code);
    if (code > 25 && code < 28) {
      svg.src = "Cloudy.svg";
    }

    else if (code > 27 && code < 31) {
      svg.src = "Partly_Cloudy.svg";
    }

    else if ((code > 30 && code < 35) || code == 36)  {
      svg.src = "Sunny.svg";
    }

    else if (code > 7 && code < 13) {
      svg.src = "Rainy.svg";
    }

    else if (code < 8 || code > 36 || (code > 12 && code < 19)) {
      svg.src = "Stormy.svg";
    }

    return svg;
  },

}

var model = {

}
