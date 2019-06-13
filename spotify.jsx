import { run, css } from 'uebersicht';

export const command = 'sh ./nerdbar.widget/scripts/spotify.sh';

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
  const values = output.split('@');

  let artist = cutWhiteSpace(values[0]);
  let song = cutWhiteSpace(values[1]);
  let elapsed = values[2];
  const total = values[3];
  const status = cutWhiteSpace(values[4]);

  if (artist.length >= 14) {
    artist = artist.substring(0, 13);
    artist = cutWhiteSpace(artist);
    song = song + '…';
  }

  if (song.length >= 14) {
    song = song.substring(0, 13);
    song = cutWhiteSpace(song);
    song = song + '…';
  }

  const elaspedValues = elapsed.split(':');
  const elaspedSeconds =
    60 * parseInt(elaspedValues[0]) + parseInt(elaspedValues);

  const totalValues = total.split(':');
  const totalSeconds = 60 * parseInt(totalValues[0]) + parseInt(totalValues);

  elapsed = elaspedSeconds / totalSeconds;

  const emptySpace = (70 - artist.length - song.length - 3) / 2;

  const elapsedCounter = parseInt((elapsed * emptySpace) / 100);
  const remainingCounter = emptySpace - elapsedCounter - 1;

  let progressString = '';
  for (let i = 0; i <= elapsedCounter; i++) progressString += ' ● ';

  let remainingString = '';
  for (let i = 0; i <= remainingCounter; i++) remainingString += ' ● ';

  return (
    <div>
      <link
        rel="stylesheet"
        type="text/css"
        href="/nerdbar.widget/colors.css"
      />
      <div class="spotify">
        <span class="icon switch"></span>

        <span class="white">
          &nbsp;{artist} - {song}&nbsp;
        </span>

        <span>{progressString}</span>
        <span class="grey">{remainingString}&nbsp;</span>

        <span class="sicon prev" onClick={prev}>
          &nbsp;&nbsp;
        </span>

        {status === 'playing' ? (
          <span class="sicon pause" onClick={pause}>
            &nbsp;&nbsp;
          </span>
        ) : (
          <span class="sicon play" onClick={play}>
            &nbsp;&nbsp;
          </span>
        )}

        <span class="sicon next" onClick={next}>
          &nbsp;&nbsp;
        </span>
      </div>
    </div>
  );
};

const cutWhiteSpace = text => {
  return text.replace(/^\s+|\s+$/g, '');
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
