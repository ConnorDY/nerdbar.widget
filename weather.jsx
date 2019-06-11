import { css } from 'uebersicht';

export const command =
  'source $HOME/.bash_profile && /usr/local/bin/python3 ./nerdbar.widget/scripts/weatherscript.py';

export const refreshFrequency = 60 * 60 * 1000; // ms

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
  condition = parseInt(condition);

  if (condition >= 200 && condition <= 212)
    return <span class="yellow weather"></span>; // thunderstorms
  if (condition === 221) return <span class="yellow weather"></span>; // scattered thunderstorms
  if (condition >= 230 && condition <= 232)
    return <span class="cyan weather"></span>; // thunder showers
  if ((condition >= 300 && condition <= 302) || condition == 500)
    return <span class="blue weather"></span>; // drizzle / light rain
  if (condition === 501) return <span class="blue weather"></span>; // rain
  if (condition >= 600 && condition <= 602)
    return <span class="blue weather"></span>; // snow
  if (condition >= 611 && condition <= 613)
    return <span class="blue weather"></span>; // sleet
  if (condition >= 615 && condition <= 622)
    return <span class="cyan weather"></span>; // snow showers
  if (condition >= 701 && condition <= 762)
    return <span class="cyan weather"></span>; // dust, fog, haze, etc.
  if (condition === 771 || condition === 781)
    return <span class="red weather"></span>; // squall / tornado
  if (condition === 800) return <span class="yellow weather"></span>; // clear / sunny
  if (condition === 801 || condition === 802)
    return <span class="grey weather"></span>; // partly clouds
  if (condition === 803 || condition === 804)
    return <span class="grey weather"></span>; // mostly cloudy

  return <span class="grey weather">?</span>; // other?
};
