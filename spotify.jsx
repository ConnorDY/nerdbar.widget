import { run, css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/spotify';

export const refreshFrequency = 2000; // every 2 seconds

export const className = css`
  color: #66d9ef;
  font: 12px Hack;
  left: 8px;
  bottom: 11px;
  width: 850px;
  height: 16px;
  .switch {
    position: relative;
    left: 5px;
  }
`;

export const render = ({ output }) => {
  if (!output) return '';
  const values = output.split('\n');

  let status = values[0].split(' ')[3];
  status = status.substring(0, status.length - 1);
  let artist = values[1].substring(8);
  let song = values[3].substring(7);
  const prog = values[4].substring(10).split('/');
  const elapsed = prog[0];
  const total = prog[1];

  if (artist.length > 24) {
    artist = artist.substring(0, 24).trim();
    artist = artist + '…';
  }

  if (song.length > 24) {
    song = song.substring(0, 24).trim();
    song = song + '…';
  }

  const elaspedValues = elapsed.split(':');
  const elaspedSeconds =
    60 * parseInt(elaspedValues[0]) + parseInt(elaspedValues[1]);

  const totalValues = total.split(':');
  const totalSeconds = 60 * parseInt(totalValues[0]) + parseInt(totalValues[1]);

  const elapsedRatio = elaspedSeconds / totalSeconds;
  const elapsedCounter = elapsedRatio * 20;

  let i = 0;
  let progressString = '';
  for (; i <= elapsedCounter; i++) progressString += ' ● ';

  let remainingString = '';
  for (; i <= 20; i++) remainingString += ' ● ';

  return (
    <div class="spotify">
      <span class="icon switch"></span>
      <span class="white">
        &nbsp;{artist} - {song}&nbsp;
      </span>
      <span>{progressString}</span>
      <span class="grey">{remainingString}&nbsp;</span>
      <span class="sicon" onClick={prev}>
        &nbsp;&nbsp;
      </span>
      {status === 'playing' ? (
        <span class="sicon" onClick={pause}>
          &nbsp;&nbsp;
        </span>
      ) : (
        <span class="sicon" onClick={play}>
          &nbsp;&nbsp;
        </span>
      )}
      <span class="sicon" onClick={next}>
        &nbsp;&nbsp;
      </span>
    </div>
  );
};

const play = () => {
  run('/usr/local/bin/spotify play');
};

const pause = () => {
  run('/usr/local/bin/spotify pause');
};

const prev = () => {
  run('/usr/local/bin/spotify prev');
};

const next = () => {
  run('/usr/local/bin/spotify next');
};
