import { useState } from 'react';

export function useActiveCategory(defaultId) {
  const [activeId, setActiveId] = useState(defaultId);

  return { activeId, setActiveId };
}
