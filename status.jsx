import { css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/status';

export const refreshFrequency = 10000; // every ten seconds

export const className = css`
  right: 76px;
  top: 6px;
  height: 13;
  .wifi {
    font: 14px FontAwesome;
    top: 1px;
    position: relative;
    left: 10px;
  }
  .wifi.icon {
    margin-right: 12px;
  }
  .charging {
    margin-left: -5px;
    font: 12px FontAwesome;
    position: relative;
    top: 0px;
    left: 12px;
    z-index: 1;
    color: #ffffff;
  }
`;

export const render = ({ output }) => {
  if (!output) return '';
  const values = output.split('@');

  const time = values[0].replace(/^\s+|\s+$/g, '');
  const date = values[1];
  const battery = values[2];
  const isCharging = values[3];
  const netStatus = values[4].replace(/^\s+|\s+$/g, '');
  const netName = values[5];
  const netIP = values[6];
  const reminders = values[7].replace(/^\s+|\s+$/g, '');

  return (
    <div class="compstatus">
      {getWifiStatus(netStatus, netName, netIP)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {batteryStatus(battery, isCharging)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {getReminders(reminders)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {timeAndDate(date, time)}
      <span class="cyan">&nbsp;⎢</span>
    </div>
  );
};

const timeAndDate = (date, time) => {
  // returns the date and time
  return (
    <span>
      <span class="white timeDate">
        <span class="icon"></span>
        {date}&nbsp;
        <span class="icon"></span>
        {time}
      </span>
    </span>
  );
};

const batteryStatus = (battery, state) => {
  // returns the current battery percentage, a representative icon, and adds a lighting bolt if the
  // battery is plugged in and charging
  const batNum = parseInt(battery);
  if (state == 'AC' && batNum >= 90)
    return (
      <span>
        <span class="charging sicon"></span>
        <span class="green icon "></span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (state == 'AC' && batNum >= 50 && batNum < 90)
    return (
      <span>
        <span class="charging sicon"></span>
        <span class="green icon"></span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (state == 'AC' && batNum < 50 && batNum >= 15)
    return (
      <span>
        <span class="charging sicon"></span>
        <span class="yellow icon"></span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (state == 'AC' && batNum < 15)
    return (
      <span>
        <span class="charging sicon"></span>
        <span class="red icon"></span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (batNum >= 90)
    return (
      <span>
        <span class="green icon">&nbsp;</span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (batNum >= 50 && batNum < 90)
    return (
      <span>
        <span class="green icon">&nbsp;</span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (batNum < 50 && batNum >= 25)
    return (
      <span>
        <span class="yellow icon">&nbsp;</span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (batNum < 25 && batNum >= 15)
    return (
      <span>
        <span class="yellow icon">&nbsp;</span>
        <span class="white">{batNum}%</span>
      </span>
    );
  else if (batNum < 15)
    return (
      <span>
        <span class="red icon">&nbsp;</span>
        <span class="white">{batNum}%</span>
      </span>
    );
};

const getWifiStatus = (status, netName, netIP) => {
  if (status === 'Wi-Fi')
    return (
      <span>
        <span class="wifi icon">&nbsp;&nbsp;</span>
        <span class="white">{netName}</span>
      </span>
    );
  else if (
    status === 'USB 10/100/1000 LAN' ||
    status === 'Apple USB Ethernet Adapter'
  )
    return (
      <span>
        <span class="wifi icon">&nbsp;&nbsp;</span>
        <span class="white">{netIP}</span>
      </span>
    );
  else
    return (
      <span>
        <span class="grey wifi icon">&nbsp;&nbsp;</span>
        <span class="white">---</span>
      </span>
    );
};

const getReminders = reminders => {
  return (
    <span>
      <span class="reminders">
        <span class="icon"></span>
      </span>
      <span class="white">{reminders}</span>
    </span>
  );
};
