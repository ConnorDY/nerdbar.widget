import { css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/screens2';

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
  const active = parseInt(values[1]);
  const all = values[1].split(' ');
  const start = parseInt(all[0]);
  const total = all.length;

  // apply a proper number tag so that space change controls can be added
  for (let i = start; i < start + total; i++) {
    if (i === active)
      screenhtml.push(
        <span className={`ricon screen${i}`}>&nbsp;&nbsp;</span>
      );
    else
      screenhtml.push(
        <span className={`ricon white screen${i}`}>&nbsp;&nbsp;</span>
      );
  }

  return <div className="kwmmode">{screenhtml}</div>;
};
