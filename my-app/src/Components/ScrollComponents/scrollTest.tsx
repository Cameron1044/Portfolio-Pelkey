import React, { useEffect, useState } from 'react';
import styles from '../../Styles/Scroll.module.scss';
import { throttle } from 'lodash';
import { easeCubic } from 'd3-ease';

function ScrollComponent() {
  const [opacity, setOpacity] = useState(0.15);
  const [opacity2, setOpacity2] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);
  const [fullScreen, setFullScreen] = useState(false);

  function lerp(
    value1: number, 
    value2: number, 
    scrollStart: number, 
    scrollEnd: number,
    scrollPosition: number,
  ): number {
    let t = (scrollPosition - scrollStart) / (scrollEnd - scrollStart);
    t = easeCubic(Math.max(0, Math.min(1, t)));
    return (1 - t) * value1 + t * value2;
  }
  function swoop(
    amplitude: number,
    frequency: number,
    phase: number,
    scrollStart: number,
    scrollEnd: number,
    scrollPosition: number
  ): number {
    let t = (scrollPosition - scrollStart) / (scrollEnd - scrollStart);
    t = easeCubic(Math.max(0, Math.min(1, t)));
    return amplitude * Math.sin(frequency * (t + phase));
  }

  useEffect(() => {
    const scrollListener = throttle(() => {
      let scrollPosition = window.pageYOffset;
      const opacityOffset = 800;
      const titleOffset = 2000;
      const opacity2Offset = 800;
      const doNothingOffset = 100;
      const offsetSum = opacityOffset + doNothingOffset;
      const offsetSum2 = titleOffset + offsetSum;
      const offsetSum3 = opacity2Offset + offsetSum2;

      if (scrollPosition <= opacityOffset) {
        setScale(1)
        setOpacity(lerp(0.15, 1, 0, opacityOffset, scrollPosition));
        setOpacity2(0);
        setHeight(0)
      } else if (scrollPosition > opacityOffset && scrollPosition <= offsetSum) {
        setScale(1)
        setOpacity(1);
        setOpacity2(0);
        setHeight(0)
      } else if (scrollPosition > offsetSum && scrollPosition <= offsetSum2) {
        setScale(lerp(1, 150, offsetSum, offsetSum2, scrollPosition));
        setHeight(swoop(1000, 5, 0, offsetSum, offsetSum2, scrollPosition));
        setOpacity(1);
        setOpacity2(0);
        setFullScreen(false);
      } else if (scrollPosition > offsetSum2 && scrollPosition < offsetSum3) {
        setOpacity2(lerp(0, 1, offsetSum2, offsetSum3, scrollPosition));
        setHeight2(lerp(-100, 0, offsetSum2, offsetSum3, scrollPosition));
        setHeight(0)
        setOpacity(1)
        setScale(150)
        setFullScreen(true);
      }
    }, 0);

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // const fullscreenStyle = fullScreen ? {} : {
  //   opacity: opacity,
  //   transition: 'transform 0s',
  //   transform: `matrix(${scale}, 0, 0, ${scale}, 0, 0)`,
  // };

  // const whiteText = {
  //   opacity: opacity2,
  //   transition: 'transform 0s',
  // }

  const renderInitialText = (text: string) => {
    return (
      <h1 className={`${styles['h1-scroll']} ${styles['initial']}`} style={{opacity: opacity, transform: `matrix(${scale}, 0, 0, ${scale}, 0, ${height})`}}>
        {text}
      </h1>
    )
  };

  const renderWhiteText = (text: string) => {
    return (
      <h1 className={`${styles['h1-scroll']} ${styles['secondary']}`} style={{opacity: opacity2, transform: `matrix(1, 0, 0, 1, 0, ${height2})`}}>
        {text}
      </h1>
    )
  };

  return (
    <body>
      <div className={`${styles['fade-in']} ${fullScreen ? styles['fullScreen'] : ''}`}>
        {!fullScreen ? renderInitialText('BANANA BYTE') : renderWhiteText(
          'Here is some content yummy very yummy yes yes yes this content is so very yummy'
        )}
        {renderWhiteText(
          'Here is some content yummy very yummy yes yes yes this content is so very yummy'
        )}
        {renderWhiteText(
          'Here is some content yummy very yummy yes yes yes this content is so very yummy'
        )}
        {renderWhiteText(
          'Here is some content yummy very yummy yes yes yes this content is so very yummy'
        )}
      </div>
    </body>
  );
}

export default ScrollComponent;
