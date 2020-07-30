import { useEffect, useState } from 'react';
import Emitter from './Emitter';

export function useIntersectionChange(id: string): [boolean] {
  const [isStuck, setStuck] = useState<boolean>(false);

  const onEmit = (e: any) => {
    if (e.targetId === id) {
      setStuck(e.isStuck);
    }
  };

  useEffect(() => {
    Emitter.on('sticky-change', onEmit);

    return () => {
      Emitter.off('sticky-change', onEmit);
    };
  }, []);

  return [isStuck];
}
