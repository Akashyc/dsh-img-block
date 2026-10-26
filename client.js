// dsh-img-block — client half.
//
// The image in a message is not a bare <img>: it sits inside an inline-block
// <button class="_imageButton_..."> (click = open large). That button is what
// owns the inline box / fails to take its own line, so restyling the <img>
// alone changes nothing visible. Fix the button first, then the image in it.
//
// Selectors are attribute based on purpose: the CSS-module class hash
// (_imageButton_1ypvv_446) changes whenever the skin rebuilds.
window.__ModuleLoader__.load({
  id: 'dsh-img-block',
  factory: () => {
    const module = { exports: {} };
    const exports = module.exports;

    const CSS = [
      '/* 1. the image button: block level, own line, shrink to fit */',
      'button[class*="imageButton"],',
      'button[aria-label^="查看大图"], button[title="查看大图"] {',
      '  display: block !important;',
      '  float: none !important;',
      '  width: fit-content !important;',
      '  max-width: 100% !important;',
      '  height: auto !important;',
      '  min-height: 0 !important;',
      '  margin: 6px 0 !important;',
      '  padding: 0 !important;',
      '  border: 0 !important;',
      '  background: transparent !important;',
      '  line-height: 0 !important;',
      '  vertical-align: top !important;',
      '}',
      '/* 2. the image inside the button: back into normal flow */',
      'button[class*="imageButton"] > img,',
      'button[aria-label^="查看大图"] > img, button[title="查看大图"] > img {',
      '  display: block !important;',
      '  position: static !important;',
      '  inset: auto !important;',
      '  width: auto !important;',
      '  height: auto !important;',
      '  max-width: 100% !important;',
      '  margin: 0 !important;',
      '  transform: none !important;',
      '}',
      '/* 3. fallback for attachment images rendered outside that button */',
      'img[data-dsh-claude-part="attachment-image"] {',
      '  display: block !important;',
      '  max-width: 100% !important;',
      '  height: auto !important;',
      '}',
      '/* 4. stickers: readable size */',
      'img[data-dsh-claude-part="attachment-image"][src*="/x-nekowhale-stickers/"] {',
      '  max-height: 260px !important;',
      '  object-fit: contain !important;',
      '}',
      '/* 5. avatars and UI icons stay inline */',
      '[class*="avatar"] img, [data-avatar] img, [class*="icon"] img, [class*="Icon"] img {',
      '  display: inline-block !important;',
      '}',
    ].join('\n');

    const name = 'dsh-img-block';
    const ATTR = 'data-dsh-img-block';

    function inject() {
      try {
        if (document.querySelector('style[' + ATTR + ']')) return;
        const style = document.createElement('style');
        style.setAttribute(ATTR, '');
        style.textContent = CSS;
        (document.head || document.documentElement).appendChild(style);
      } catch (err) {
        try { console.warn('[dsh-img-block]', err); } catch {}
      }
    }

    function apply() { inject(); }

    try {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inject, { once: true });
      }
      inject();
    } catch {}

    module.exports = { name, apply };
    return module.exports;
  },
});
