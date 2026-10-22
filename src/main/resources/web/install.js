(() => {
  const button = document.getElementById('install-app');
  const status = document.getElementById('install-status');
  let promptEvent;
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const showInstalled = () => {
    button.hidden = true;
    status.textContent = 'Opened as a web app. Enjoy your journey!';
  };
  if (standalone()) showInstalled();
  window.addEventListener('beforeinstallprompt', event => {
    if (standalone()) return;
    event.preventDefault();
    promptEvent = event;
    button.hidden = false;
  });
  button.addEventListener('click', async () => {
    if (!promptEvent) return;
    const current = promptEvent;
    promptEvent = null;
    button.hidden = true;
    try {
      await current.prompt();
      const choice = await current.userChoice;
      status.textContent = choice.outcome === 'accepted' ? 'Installation requested. Look for the icon on your device.' : 'You can install later from your browser menu.';
    } catch {
      status.textContent = 'Use your browser menu to add this guide to your Home Screen.';
    }
  });
  window.addEventListener('appinstalled', showInstalled);
})();