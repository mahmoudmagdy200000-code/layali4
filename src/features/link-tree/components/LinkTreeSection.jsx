import React from 'react';
import { useLinkTree } from '../hooks/useLinkTree';
import { LinkButton } from './LinkButton';

export function LinkTreeSection() {
  const { links } = useLinkTree();

  return (
    <section className="px-6 py-8 flex flex-col gap-3">
      {links.map((link, index) => (
        <LinkButton key={link.id} {...link} index={index} />
      ))}
    </section>
  );
}
