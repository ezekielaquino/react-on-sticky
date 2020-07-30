import { useRef, useEffect } from 'react';
import { sentinels } from './Sentinels';
import Emitter from './Emitter';

export function useOnStickyRoot() {
  const ref = useRef() as React.RefObject<HTMLDivElement>;
  const headerObserver = useRef() as React.MutableRefObject<
    IntersectionObserver
  >;
  const footerObserver = useRef() as React.MutableRefObject<
    IntersectionObserver
  >;

  const observeHeaders = () => {
    headerObserver.current = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const {
            boundingClientRect: targetInfo,
            rootBounds: rootBoundsInfo,
            target,
          } = record;
          const stickyTarget =
            target.parentElement &&
            target.parentElement.querySelector('.sticky');

          if (
            stickyTarget &&
            rootBoundsInfo &&
            targetInfo.bottom < rootBoundsInfo.top
          ) {
            Emitter.emit('sticky-change', {
              isStuck: true,
              targetId: stickyTarget.getAttribute('id'),
            });
          }

          if (
            stickyTarget &&
            rootBoundsInfo &&
            targetInfo.bottom >= rootBoundsInfo.top &&
            targetInfo.bottom < rootBoundsInfo.bottom
          ) {
            Emitter.emit('sticky-change', {
              isStuck: false,
              targetId: stickyTarget.getAttribute('id'),
            });
          }
        }
      },
      { threshold: [0], root: ref.current },
    );

    for (const sentinel of sentinels.header) {
      headerObserver.current.observe(sentinel[1]);
    }
  };

  const observeFooters = () => {
    footerObserver.current = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          const {
            boundingClientRect: targetInfo,
            rootBounds: rootBoundsInfo,
            intersectionRatio: ratio,
            target,
          } = record;
          const stickyTarget =
            target.parentElement &&
            target.parentElement.querySelector('.sticky');

          if (
            stickyTarget &&
            rootBoundsInfo &&
            targetInfo.bottom > rootBoundsInfo.top &&
            ratio === 1
          ) {
            Emitter.emit('sticky-change', {
              isStuck: true,
              targetId: stickyTarget.getAttribute('id'),
            });
          }

          if (
            stickyTarget &&
            rootBoundsInfo &&
            targetInfo.top < rootBoundsInfo.top &&
            targetInfo.bottom < rootBoundsInfo.bottom
          ) {
            Emitter.emit('sticky-change', {
              isStuck: false,
              targetId: stickyTarget.getAttribute('id'),
            });
          }
        }
      },
      { threshold: [1], root: ref.current },
    );

    for (const sentinel of sentinels.footer) {
      footerObserver.current.observe(sentinel[1]);
    }
  };

  useEffect(() => {
    observeHeaders();
    observeFooters();
  }, []);

  return [ref];
}
