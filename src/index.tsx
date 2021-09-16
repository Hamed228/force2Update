import { useState, useCallback } from 'react';

export const useForceUpdate = (): () => void => {
  const [, force2Update] = useState<{}>(Object.create(null));

  const forceUpdate = useCallback((): void => {
    force2Update(Object.create(null));
  }, [force2Update]);

  return forceUpdate;
}
