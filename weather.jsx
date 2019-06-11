import { css } from 'uebersicht';

export const command =
  'source $HOME/.bash_profile && /usr/local/bin/python3 ./nerdbar.widget/scripts/weatherscript.py';

export const refreshFrequency = 600000; // ms

export const className = css`
  text-align: center;
  right: -22px;
  top: 1px;
  height: 13;
  cursor: pointer;
  .temp {
    margin-left: 3px;
  }
  table {
    margin: auto;
  }
  .center {
    text-align: center;
  }
  .weather_forecast {
    top: 0px;
    width: 8em;
    background-color: #fff7e4;
    right: 50px;
    opacity: 0;
    position: relative;
    border-radius: 4px;
  }
`;

export const render = ({ output }) => {
  // split the output of the script
  const values = output.split('@');

  const temp = values[0];
  const condition = values[1].trim();

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="./nerdbar.widget/colors.css"
      />
      <div class="compstatus">
        <span class="clickable">
          {getWeatherIcon(condition)}
          <span class="temp"> {colorizeTemp(temp)} </span>
        </span>
      </div>
      <div class="weather_forecast" />
    </div>
  );
};

const colorizeTemp = temp => {
  // returns a formatted html string with the temperature colorized depending on
  // whether it is hot, temperate or cold
  if (temp == '--') return <span class="white">--</span>;

  const tempNum = parseInt(temp);

  if (tempNum >= 90) return <span class="red">{temp}°</span>;
  if (tempNum < 90 && tempNum >= 65) return <span class="yellow">{temp}°</span>;
  if (tempNum < 65) return <span class="blue">{temp}°</span>;
};

const getWeatherIcon = condition => {
  if (condition === 'Clouds') return <span class="cyan weather"></span>;
  else return <span class="blue weather"></span>;

  /*# # Tornados and Hurricanes
   if connum <= 2
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
  #   return "<span></span>"*/
};
