import React from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

import { useState, useCallback } from 'react';


interface IMainModelFactory {
  onControlWillUnmount: (fieldName: string, callBack: () => void) => void;
  controlWillUnmount: (fieldName: string) => void;
}


export const useForceUpdate = (): () => void => {
  const [, force2Update] = useState<{}>(Object.create(null));

  const forceUpdate = useCallback((): void => {
    force2Update(Object.create(null));
  }, [force2Update]);

  return forceUpdate;
}

export const useForceUpdateField = (mainState: IMainModelFactory, fieldName: string): () => void => {
  const [, force2Update] = useState<{}>(Object.create(null));

  useIsomorphicLayoutEffect(() => {
    return () => {
      mainState.controlWillUnmount(fieldName);
    };
  }, [mainState, fieldName]);

  const forceUpdate = useCallback((): void => {
    force2Update(Object.create(null));
  }, [force2Update]);

  return forceUpdate;
}