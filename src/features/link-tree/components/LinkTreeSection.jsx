import React from 'react';
import { useLinkTree } from '../hooks/useLinkTree';
import { LinkButton } from './LinkButton';

export function LinkTreeSection({ onAction }) {
  const { links } = useLinkTree();

  return (
    <section className="px-6 py-8 flex flex-col gap-2">
      {links.map((link, index) => (
        <LinkButton 
          key={link.id} 
          {...link} 
          index={index} 
          onClick={onAction}
        />
      ))}
    </section>
  );
}
