import * as React from 'react';
import { useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sentinels } from './Sentinels';

interface StickyContainerProps {
  component?: string | React.ElementType<any>;
  headerHeight: string;
  headerPosition: string;
  footerHeight: string;
  footerPosition: string;
  children: React.ReactNode;
  isDebug?: boolean;
  [prop: string]: any;
}

export const StickyContainer = React.forwardRef(
  (props: StickyContainerProps, ref) => {
    const {
      className,
      component = 'div',
      headerHeight = '100px',
      headerPosition = '0px',
      footerHeight = '100px',
      footerPosition = '0px',
      isDebug,
      children,
    } = props;
    const headerSentinelRef = useRef() as React.MutableRefObject<
      HTMLDivElement
    >;
    const footerSentinelRef = useRef() as React.MutableRefObject<
      HTMLDivElement
    >;
    const headerId = useRef(uuidv4()) as React.MutableRefObject<string>;
    const footerId = useRef(uuidv4()) as React.MutableRefObject<string>;
    const WrapComponent = component;
    const sentinelBaseCss = {
      position: 'absolute',
      pointerEvents: 'none',
      left: 0,
      right: 0,
      border: isDebug ? '1px solid red' : 0,
    } as React.CSSProperties;

    useEffect(() => {
      sentinels.header.set(headerId.current, headerSentinelRef.current);
      sentinels.footer.set(footerId.current, footerSentinelRef.current);

      return () => {
        sentinels.header.delete(headerId.current);
        sentinels.footer.delete(footerId.current);
      };
    }, []);

    return (
      <WrapComponent ref={ref} className={className} {...props}>
        <div
          ref={headerSentinelRef}
          style={{
            ...sentinelBaseCss,
            height: headerHeight,
            top: headerPosition,
          }}
        ></div>
        <div
          ref={footerSentinelRef}
          style={{
            ...sentinelBaseCss,
            height: footerHeight,
            bottom: footerPosition,
          }}
        ></div>

        {children}
      </WrapComponent>
    );
  },
);
