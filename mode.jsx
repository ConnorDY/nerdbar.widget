import { css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/screens';

export const refreshFrequency = 500; // every half second

export const className = css`
  left: 10px;
  top: 5px;
  width: 850px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const render = ({ output }) => {
  if (!output) return '';
  const values = output.split('@');

  let screenhtml = [];
  const mode = values[0].replace(/^\s+|\s+$/g, '');
  const active = parseInt(values[1]);
  const total = values[2].split(' ').length;
  const title = values[3];

  // apply a proper number tag so that space change controls can be added
  for (let i = 0; i < total; i++) {
    if (i + 1 === active)
      screenhtml.push(
        <span className={`ricon screen${i}`}>&nbsp;&nbsp;</span>
      );
    else
      screenhtml.push(
        <span className={`ricon white screen${i}`}>&nbsp;&nbsp;</span>
      );
  }

  return (
    <div className="kwmmode">
      <span className="tilingMode icon"></span>
      <span className="tilingMode white">[{mode}]</span>
      <span className="cyan"> ⎢ </span>
      {screenhtml}
      <span>&nbsp;</span>
      {trimWindowName(title)}
    </div>
  );
};

// this is jank and I should re-write it
const trimWindowName = path => {
  let file = '';
  const wins = path;
  let win = '';
  const winseg = wins.split('/');
  file = winseg[winseg.length - 1];
  let j = winseg.length - 1;
  let flag1 = 0;
  let flag2 = 0;

  while (file.length >= 65) {
    file = file.slice(0, -1);
    flag1 = 1;
  }

  if (j > 1) {
    while (j >= 1) {
      j -= 1;
      if ((win + file).length >= 65) {
        win = ' …/' + win;
        break;
      } else win = winseg[j] + '/' + win;
    }
  }

  while (win.length >= 65) {
    win = win.slice(1);
    flag2 = 1;
  }

  if (flag1 >= 1) file += '…';

  if (flag2 >= 1) win = '…' + win;

  if (path === '') win = <span className="white">…</span>;

  return (
    <span>
      <span>{win}</span>
      <span className="white">{file}</span>
    </span>
  );
};
