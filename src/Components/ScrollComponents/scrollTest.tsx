import React, { useEffect, useState } from 'react';
import styles from '../../Styles/Scroll.module.scss';
import { throttle } from 'lodash';
import { easeCubic } from 'd3-ease';
import Project1 from '../../Images/Project1.png';
import IMG1 from '../../Images/IMG1.png';

function ScrollComponent() {
  const [opacity, setOpacity] = useState(0.15);
  const [opacity2, setOpacity2] = useState(0);
  const [opacity3, setOpacity3] = useState(0);
  const [opacity4, setOpacity4] = useState(0);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);
  const [height3, setHeight3] = useState(0);
  const [height4, setHeight4] = useState(0);
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
      const objectiveOffset = 800;
      const resultsOffset = 800;
      const offsetSum = opacityOffset + doNothingOffset;
      const offsetSum2 = titleOffset + offsetSum;
      const offsetSum3 = opacity2Offset + offsetSum2;
      const offsetSum4 = objectiveOffset + offsetSum3;
      const offsetSum5 = resultsOffset + offsetSum4;

      if (scrollPosition <= opacityOffset) {
        setScale(1)
        setOpacity(lerp(0.15, 1, 0, opacityOffset, scrollPosition));
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(0);
        setHeight(0)
        setHeight2(0)
        setHeight3(0)
        setHeight4(0)
      } else if (scrollPosition > opacityOffset && scrollPosition <= offsetSum) {
        setScale(1)
        setOpacity(1);
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(0);
        setHeight(0)
        setHeight2(0)
        setHeight3(0)
        setHeight4(0)
      } else if (scrollPosition > offsetSum && scrollPosition <= offsetSum2) {
        setScale(lerp(1, 150, offsetSum, offsetSum2, scrollPosition));
        setHeight(swoop(1000, 5, 0, offsetSum, offsetSum2, scrollPosition));
        setHeight2(0)
        setHeight3(0)
        setHeight4(0)
        setOpacity(1);
        setOpacity2(0);
        setOpacity3(0);
        setOpacity4(0);
        setFullScreen(false);
      } else if (scrollPosition > offsetSum2 && scrollPosition < offsetSum3) {
        setOpacity2(lerp(0, 1, offsetSum2, offsetSum3, scrollPosition));
        setOpacity3(0);
        setOpacity4(0);
        setHeight(0)
        setHeight2(lerp(-100, 0, offsetSum2, offsetSum3, scrollPosition));
        setHeight3(0)
        setHeight4(0)
        setOpacity(1)
        setScale(150)
        setFullScreen(true);
      } else if (scrollPosition > offsetSum3 && scrollPosition < offsetSum4) {
        setOpacity2(1);
        setHeight2(0);
        setHeight3(lerp(-100, 0, offsetSum3, offsetSum4, scrollPosition));
        setOpacity3(lerp(0, 1, offsetSum3, offsetSum4, scrollPosition));
        setHeight(0)
        setOpacity(1)
        setScale(150)
        setFullScreen(true);
      } else if (scrollPosition > offsetSum4 && scrollPosition < offsetSum5) {
        setOpacity2(1);
        setHeight2(0);
        setHeight3(0);
        setHeight4(lerp(-100, 0, offsetSum4, offsetSum5, scrollPosition));
        setOpacity3(1);
        setOpacity4(lerp(0, 1, offsetSum4, offsetSum5, scrollPosition));
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

  const renderWhiteText = () => {
    return (
      <div className={styles['div-project']}>
        <div className={styles['div-project-left']}>
          <div className={`${styles['div-card']} ${styles['title']}`} style={{opacity: opacity2, transform: `matrix(1, 0, 0, 1, ${height2}, 0)`}}>
            <h1 className={`${styles['h1-scroll']} ${styles['secondary']}`}>
              Project Title
            </h1>
          </div>
          <div className={`${styles['div-card']} ${styles['img']}`} style={{opacity: opacity2, transform: `matrix(1, 0, 0, 1, ${-height2}, 0)`}}>
            <img className={styles['img-project']} src={IMG1} alt="Project1" />
          </div>
        </div>
        <div className={styles['div-project-right']}>
          <div className={`${styles['div-card']} ${styles['objective']}`} style={{opacity: opacity3, transform: `matrix(1, 0, 0, 1, 0, ${-height3})`}}>
            <h2 className={styles['h2-project']}>
              Objective:
            </h2>
            <h3 className={styles['h3-project']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>
          </div>  
          <div className={`${styles['div-card']} ${styles['results']}`} style={{opacity: opacity4, transform: `matrix(1, 0, 0, 1, 0, ${-height4})`}}>
            <h2 className={styles['h2-project']}>
              Results:
            </h2>
            <h3 className={styles['h3-project']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </h3>
          </div>  
        </div>
      </div>
    )
  };

  return (
    <body>
      <div className={`${styles['fade-in']} ${fullScreen ? styles['fullScreen'] : ''}`}>
        {!fullScreen ? renderInitialText('CAMERON PELKEY') : renderWhiteText()}
      </div>
    </body>
  );
}

export default ScrollComponent;
