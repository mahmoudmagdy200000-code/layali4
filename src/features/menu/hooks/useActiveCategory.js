import { useState, useTransition } from 'react';

/**
 * useActiveCategory — Manages active category state with
 * useTransition to defer heavy re-renders during tab switching,
 * keeping the tab animation at 60fps.
 */
export function useActiveCategory(defaultId) {
  const [activeId, setActiveId] = useState(defaultId);
  const [isPending, startTransition] = useTransition();

  const setActiveIdWithTransition = (id) => {
    startTransition(() => {
      setActiveId(id);
    });
  };

  return { activeId, setActiveId: setActiveIdWithTransition, isPending };
}
