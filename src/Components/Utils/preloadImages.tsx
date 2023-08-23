// function preloadImages(urls: string[]) {
//   urls.forEach((url: string) => {
//     const img = new Image();
//     img.src = url;
//   });
// }

// export { preloadImages };

const preloadMedia = (urls: string[]) => {
  let failedUrls: string[] = [];

  const promises = urls.map((url: string) => {
    if (url.endsWith('.mp4') || url.endsWith('.webm')) {
      // Preload video
      return new Promise<void>((resolve, reject) => {
        const video = document.createElement('video');
        video.onloadeddata = () => {
          resolve();
        };
        video.onerror = () => {
          failedUrls.push(url);
          resolve();
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
          failedUrls.push(url);
          resolve();
        };
        img.src = url;
      });
    }
  });

  return Promise.all(promises).then(() => {
    if (failedUrls.length) {
      throw new Error(`Failed to load the following media: ${failedUrls.join(', ')}`);
    }
  });
}

export { preloadMedia };