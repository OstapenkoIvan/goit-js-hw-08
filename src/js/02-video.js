import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const currentTime = localStorage.getItem('videoplayer-current-time');
console.log('file: 02-video.js / line 5 / currentTime', currentTime);

const player = new Player('vimeo-player', {
  id: 236203659,
  width: 640,
});

player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
  }, 1000)
);

if (currentTime) {
  player
    .setCurrentTime(currentTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
