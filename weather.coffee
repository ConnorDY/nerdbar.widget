command: "source $HOME/.bash_profile && /usr/local/bin/python3 ./nerdbar.widget/scripts/weatherscript.py"

refreshFrequency: 600000 # ms

render: (output) ->
  """
    <link rel="stylesheet" type="text/css" href="./nerdbar.widget/colors.css" />
    <div class='compstatus'></div>
    <div class='weather_forecast'></div>
  """

style: """
  text-align: center;
  right: -32px;
  top: 1px;
  height: 13;
  cursor: pointer;
  .temp
    margin-left: 6px;
  table
    margin: auto;
  .center
    text-align: center;
  .weather_forecast
    top: 0px;
    width: 8em;
    background-color: #fff7e4;
    right: 50px;
    opacity: 0;
    position: relative;
    border-radius: 4px;
"""

colorizeTemp: (temp) ->
  #returns a formatted html string with the temperature colorized depending on
  # whether it is hot, temperate or cold
  if temp == '--'
    return "<span class='white'>--</span>"

  tempNum = parseInt(temp)
  if tempNum >= 90
    return "<span class='red'>#{temp}°</span>"
  if tempNum < 90 and tempNum >= 65
    return "<span class='yellow'>#{temp}°</span>"
  if tempNum < 65
    return "<span class='blue'>#{temp}°</span>"

# Yahoo has horrible documentation for these codes, the ones on their website
# are incorrect so I'm slowly fixing these by trial and error.

getWeatherIcon: (connum) ->
  return "<span class='blue weather'></span>"
  # # Tornados and Hurricanes
  # if connum <= 2
  #   return "<span class='red weather'></span>"
  # #Thunderstorms
  # if connum > 2 and connum <= 4
  #   return "<span class='yellow weather'></span>"
  # #Freezing Rain / Sleet
  # if (connum >= 5 and connum <= 8) or connum == 10 or connum == 18
  #   return "<span class='blue weather'></span>"
  # #Drizzle
  # if connum == 9
  #   return "<span class='blue weather'></span>"
  # #Rain
  # if connum == 11 or connum == 12
  #   return "<span class='blue weather'></span>"
  # #Snow
  # if connum >= 13 and connum <= 16
  #   return "<span class='blue weather'></span>"
  # #Hail
  # if connum == 17
  #   return "<span class='blue weather'></span>"
  # #Dust, fog, haze, etc
  # if connum >= 19 and connum <= 22
  #   return "<span class='cyan weather'></span>"
  # # Windy
  # if connum == 23 or connum == 24
  #   return "<span class='grey weather'></span>"
  # #cold
  # if connum == 25
  #   return "<span class='cyan weather'></span>"
  # #cloudy
  # if connum == 26
  #   return "<span class='cyan weather'></span>"
  # #mostly cloudy (day) #fixed
  # if connum == 27
  #   return "<span class='grey weather'></span>"
  # #mostly cloudy (day)
  # if connum == 28
  #   return "<span class='grey weather'></span>"
  # #partly cloudy (day) #fixed
  # if connum == 29
  #   return "<span class='grey weather'></span>"
  # #partly cloudy (day)
  # if connum == 30 #fixed
  #   return "<span class='grey weather'></span>"
  # # clear night
  # if connum == 31
  #   return "<span class='yellow weather'></span>"
  # #Sunny
  # if connum == 32
  #   return "<span class='yellow weather'></span>"
  # #Fair, night
  # if connum == 33
  #   return "<span class='yellow weather'></span>"
  # #Mostly Sunny # Fixed
  # if connum == 34
  #   return "<span class='yellow weather'></span>"
  # # mixed rain and hail
  # if connum == 35
  #   return "<span class='blue weather'></span>"
  # #hot
  # if connum == 36
  #   return "<span class='red weather'></span>"
  # #thunder storms
  # if connum >= 37 and connum < 39
  #   return "<span class='yellow weather'></span>"
  # #scattered showers
  # if connum >= 39 and connum <= 40 #fixed
  #   return "<span class='cyan weather'></span>"
  # # snow
  # if connum >= 41 and connum <=43
  #   return "<span class='cyan weather'></span>"
  # #partly cloudy
  # if connum == 44
  #   return "<span class='grey weather'></span>"
  # #thunder showers
  # if connum == 45
  #   return "<span class='cyan weather'></span>"
  # #snow showers
  # if connum == 46
  #   return "<span class='cyan weather'></span>"
  # # isolated thundershowers
  # if connum == 47
  #   return "<span class='yellow weather'></span>"
  # # no internet connection
  # if connum == 99
  #   return "<span></span>"

update: (output, domEl) ->

  # split the output of the script
  values = output.split('@')

  temp = values[0]
  condition = values[1]

  # Five Day Forcast Parsing
  # day0 = [values[2], values[3], values[4], values[5]]
  # day1 = [values[6], values[7], values[8], values[9]]
  # day2 = [values[10], values[11], values[12], values[13]]
  # day3 = [values[14], values[15], values[16], values[17]]
  # day4 = [values[18], values[19], values[20], values[21]]

  # days = [day0, day1, day2, day3, day4]

  # city = values[22]
  # region = values[23]

  # create an HTML string to be displayed by the widget
  htmlString = "<span class='clickable'>" + @getWeatherIcon(condition) + "<span class='temp'>" + @colorizeTemp(temp) + "</span></span>"
  $(domEl).find('.compstatus').html(htmlString)

  # create an HTML string for the forecast widget
  # if condition != ""
  #   forecastString = "<table>"

  #   for day in days
  #       forecastString = forecastString + "<tr>" + "<td class='white'>#{day[3]}</td>" + "<td>" + @getWeatherIcon(parseInt(day[2])) + "</td>" + "<td>" + @colorizeTemp(day[0]) + "</td>" + "<td>" + @colorizeTemp(day[1]) + "</td>" + "</tr>"

  #   forecastString = forecastString + "<tr class='center'><span>" + city + ', ' + region + "</span></tr>"
  #   forecastString = forecastString + "<tr class='center'>" + condition + "</tr></table>"

  # $(domEl).find('.weather_forecast').html(forecastString)
  # # weather forecast script
  # isForecastVisable = false

  # $(".clickable").on "click", ->
  #   console.log("button clicked!")
  #   if isForecastVisable == false
  #     $(".weather_forecast").css("opacity", "1")
  #     isForecastVisable = true
  #   else
  #     $(".weather_forecast").css("opacity", "0")
  #     isForecastVisable = false
