import { css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/stats';

export const refreshFrequency = 5000; // every 5 seconds

export const className = css`
  right: 12px;
  bottom: 10px;
  height: 13;
`;

export const render = ({ output }) => {
  if (!output) return '';
  const values = output.split('@');

  const cpu = values[0];
  const mem = values[1];
  const down = values[2];
  const up = values[3];
  const free = values[4].replace(/[^0-9]/g, '');

  return (
    <div class="stats">
      {getNetTraffic(down, up)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {getMem(mem)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {getCPU(cpu)}
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      {getFreeSpace(free)}
    </div>
  );
};

const getCPU = cpu => {
  let cpuNum = parseFloat(cpu);
  // I have four cores, so I divide my CPU percentage by four to get the proper number
  cpuNum = cpuNum / 4;
  cpuNum = cpuNum.toFixed(1);
  let cpuString = cpuNum;
  if (cpuNum < 10) cpuString = '0' + cpuString;
  return (
    <span>
      <span class="icon">&nbsp;</span>
      <span class="white">{cpuString}%</span>
    </span>
  );
};

const getMem = mem => {
  let memNum = parseFloat(mem);
  memNum = memNum.toFixed(1);
  let memString = memNum;
  if (memNum < 10) memString = '0' + memString;
  return (
    <span>
      <span class="icon">&nbsp;</span>
      <span class="white">{memString}%</span>
    </span>
  );
};

const getNetTraffic = (down, up) => {
  const downString = convertBytes(parseInt(down));
  const upString = convertBytes(parseInt(up));

  return (
    <span>
      <span class="icon blue"></span>
      <span class="white">{downString}</span>
      <span class="cyan">&nbsp;⎢&nbsp;</span>
      <span class="icon orange"></span>
      <span class="white">{upString}</span>
    </span>
  );
};

const getFreeSpace = space => {
  return (
    <span>
      <span class="icon"></span>
      <span class="white">{space}gb</span>
    </span>
  );
};

const usageFormat = kb => {
  const mb = kb / 1024;
  if (mb < 0.01) return '0.00mb';
  return `${parseFloat(mb.toFixed(2))}MB`;
};

const convertBytes = bytes => {
  return usageFormat(bytes / 1024);
};
