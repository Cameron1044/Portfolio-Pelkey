const getSupportedVideoExtension = () => {
  const video = document.createElement('video');
  return video.canPlayType('video/webm; codecs="vp8, vorbis"') ? '.webm' : '.mp4';
}

const preloadMedia = (urls: string[]) => {
  const supportedVideoExtension = getSupportedVideoExtension();

  const promises = urls.map((url: string) => {
    // If URL ends with a placeholder '.ext', replace it with the supported video extension
    if (url.endsWith('.ext')) {
      url = url.replace('.ext', supportedVideoExtension);
    }

    if (((supportedVideoExtension === '.webm') && (url.endsWith('.webm'))) || ((supportedVideoExtension === '.mp4') && (url.endsWith('.mp4')))) {
      // Preload video
      return new Promise<void>((resolve, reject) => {
        const video = document.createElement('video');
        video.onloadeddata = () => {
          resolve();
        };
        video.onerror = () => {
          reject(new Error(`Failed to load video: ${url}`));
        };
        video.src = url;
      });
    } else {
      // Preload image
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve();
        };
        img.onerror = () => {
          reject(new Error(`Failed to load image: ${url}`));
        };
        img.src = url;
      });
    }
  });

  return Promise.all(promises);
}

export { preloadMedia };