(function () {
  'use strict';

  // ── Auto-slug from title ──────────────────────────────────────────────────
  const titleInput = document.getElementById('title');
  const slugInput  = document.getElementById('slug');

  function toSlug(str) {
    return str
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')   // strip accents
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  if (titleInput && slugInput) {
    let slugManuallyEdited = slugInput.value.length > 0;

    slugInput.addEventListener('input', () => {
      slugManuallyEdited = true;
    });

    titleInput.addEventListener('input', () => {
      if (!slugManuallyEdited) {
        slugInput.value = toSlug(titleInput.value);
      }
    });

    // also wire up author/category slug fields on other pages
  }

  // Generic slug-from-name for authors/categories forms
  const nameInput = document.getElementById('name');
  const slugNameInput = document.getElementById('slug');
  if (nameInput && slugNameInput && !titleInput) {
    let edited = slugNameInput.value.length > 0;
    slugNameInput.addEventListener('input', () => { edited = true; });
    nameInput.addEventListener('input', () => {
      if (!edited) slugNameInput.value = toSlug(nameInput.value);
    });
  }

  // ── Image URL preview ─────────────────────────────────────────────────────
  const imgUrlInput = document.getElementById('featured_image_url');
  const imgPreview  = document.getElementById('img-preview');
  const imgTag      = document.getElementById('img-preview-tag');

  if (imgUrlInput && imgPreview && imgTag) {
    imgUrlInput.addEventListener('input', () => {
      const url = imgUrlInput.value.trim();
      if (url) {
        imgTag.src = url;
        imgPreview.classList.add('has-img');
      } else {
        imgPreview.classList.remove('has-img');
        imgTag.src = '';
      }
    });
    imgTag.addEventListener('error', () => {
      imgPreview.classList.remove('has-img');
    });
    // Initialise on page load for edit mode
    if (imgTag.src) imgPreview.classList.add('has-img');
  }

  // ── Rich text editor ──────────────────────────────────────────────────────
  const editor     = document.getElementById('rich-editor');
  const bodyHidden = document.getElementById('body-hidden');
  const toolbar    = document.getElementById('editor-toolbar');

  if (!editor || !bodyHidden) return;

  // Sync contenteditable → hidden textarea before form submit
  const form = document.getElementById('article-form');
  if (form) {
    form.addEventListener('submit', () => {
      bodyHidden.value = editor.innerHTML;
    });
  }

  // Placeholder behaviour
  function updatePlaceholder() {
    if (editor.textContent.trim() === '' && editor.innerHTML.replace(/<br\s*\/?>/gi, '') === '') {
      editor.classList.add('is-empty');
    } else {
      editor.classList.remove('is-empty');
    }
  }
  editor.addEventListener('input', updatePlaceholder);
  updatePlaceholder();

  // Sync on every keystroke so the hidden field is always up-to-date
  editor.addEventListener('input', () => {
    bodyHidden.value = editor.innerHTML;
  });

  // Toolbar button handler
  if (toolbar) {
    toolbar.addEventListener('mousedown', (e) => {
      const btn = e.target.closest('[data-cmd]');
      if (!btn) return;
      e.preventDefault(); // keep focus in editor

      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val || null;

      document.execCommand(cmd, false, val);
      editor.focus();
      bodyHidden.value = editor.innerHTML;
      updateActiveStates();
    });

    // Link button
    const btnLink = document.getElementById('btn-link');
    if (btnLink) {
      btnLink.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const selection = window.getSelection();
        const currentHref = (() => {
          const anchor = selection.anchorNode && selection.anchorNode.parentElement.closest('a');
          return anchor ? anchor.href : '';
        })();
        const url = prompt('URL do link:', currentHref || 'https://');
        if (url === null) return;
        if (url === '') {
          document.execCommand('unlink', false, null);
        } else {
          document.execCommand('createLink', false, url);
          // force target=_blank on new links
          const anchor = window.getSelection().anchorNode &&
            window.getSelection().anchorNode.parentElement.closest('a');
          if (anchor) anchor.target = '_blank';
        }
        editor.focus();
        bodyHidden.value = editor.innerHTML;
      });
    }
  }

  // Highlight active toolbar buttons based on current selection
  function updateActiveStates() {
    if (!toolbar) return;
    toolbar.querySelectorAll('[data-cmd]').forEach((btn) => {
      const cmd = btn.dataset.cmd;
      const val = btn.dataset.val;
      try {
        if (val) {
          const block = document.queryCommandValue(cmd);
          btn.classList.toggle('is-active', block === val);
        } else {
          btn.classList.toggle('is-active', document.queryCommandState(cmd));
        }
      } catch (_) {}
    });
  }

  editor.addEventListener('keyup', updateActiveStates);
  editor.addEventListener('mouseup', updateActiveStates);
  editor.addEventListener('selectionchange', updateActiveStates);

  // Tab key → indent inside lists instead of leaving editor
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
    }
  });

})();
