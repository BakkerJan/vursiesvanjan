import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';

function remarkVursieRegelafbrekingen() {
  return (tree) => {
    let inTekst = false;

    function zetRegelafbrekingen(node) {
      if (!Array.isArray(node.children)) return;

      node.children = node.children.flatMap((kind) => {
        if (kind.type === 'text' && kind.value.includes('\n')) {
          const regels = kind.value.split('\n');
          return regels.flatMap((regel, index) => [
            ...(regel ? [{ ...kind, value: regel }] : []),
            ...(index < regels.length - 1 ? [{ type: 'break' }] : []),
          ]);
        }

        zetRegelafbrekingen(kind);
        return [kind];
      });
    }

    for (const node of tree.children) {
      if (node.type === 'heading' && node.depth <= 2) {
        inTekst = node.depth === 2
          && node.children.some((kind) => kind.type === 'text' && kind.value.trim() === 'Tekst');
        continue;
      }

      if (inTekst) zetRegelafbrekingen(node);
    }
  };
}

export default defineConfig({
  site: 'https://vursiesvanjan.nl',

  markdown: {
    processor: unified({ remarkPlugins: [remarkVursieRegelafbrekingen] }),
  },

  // Het overzicht stond eerst op /vursies/; wie die link nog heeft, komt
  // nu op de voorpagina uit.
  redirects: {
    '/vursies': '/',
  },
});
