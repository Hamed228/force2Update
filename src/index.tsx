import React from 'react'

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect

import { useState, useCallback } from 'react';

export const useForceUpdate = (): () => void => {
  const [, force2Update] = useState<{}>(Object.create(null));

  const forceUpdate = useCallback((): void => {
    force2Update(Object.create(null));
  }, [force2Update]);

  return forceUpdate;
}

interface IMainFactoy extends Object {
  forceToUpdate: (componentName: string) => {};
}
export const useForceUpdateComponentName = (mainFactory: IMainFactoy, componentName: string, cleaningCallBack: () => void): void => {
  const [, force2Update] = useState<{}>(Object.create(null));

  const forceUpdate = useCallback((): void => {
    force2Update(Object.create(null));
  }, [force2Update]);

  useEvents(mainFactory, componentName, forceUpdate);

  useIsomorphicLayoutEffect(() => {
    return () => {
      cleaningCallBack();
      delete (mainFactory as any).eventsForForceUpdate;
    };
  }, [mainFactory, componentName]);
}

export const useEvents = (mainFactory: any, componentName: string, forceUpdate: () => void): void => {

  if (typeof mainFactory.eventsForForceUpdate !== 'undefined') {
    mainFactory.eventsForForceUpdate = {};

    mainFactory.forceToUpdate = (cp: string) => trigger(cp);
  }
  const events = mainFactory.eventsForForceUpdate;

  if (!Object.prototype.hasOwnProperty.call(events, componentName)) {
    events[`on${componentName}Change`] = forceUpdate;
  }


  const trigger = (cp: string): void => {
    const handlers = events[`on${cp}Change`];

    if (handlers && typeof handlers === 'function') {
      handlers.apply(null, null)
    }
  };
}