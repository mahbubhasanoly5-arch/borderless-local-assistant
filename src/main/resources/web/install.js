(() => {
  const button = document.getElementById('install-app');
  const status = document.getElementById('install-status');
  const help = document.getElementById('install-help');
  if (!button || !status || !help) return;
  let promptEvent = null;
  let busy = false;
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const bn = () => document.getElementById('language')?.value === 'bn';
  const text = (en, bangla) => bn() ? bangla : en;
  const isIOS = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const showHelp = () => {
    help.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    const steps = isIOS()
      ? text('On iPhone/iPad: open this page in Safari → Share → Add to Home Screen → turn on Open as Web App if shown → Add. Safari does not offer this site an automatic install popup.', 'iPhone/iPad-এ Safari দিয়ে খোলো → Share → Add to Home Screen → Open as Web App দেখালে চালু করো → Add। Safari-তে এই button দিয়ে automatic install popup খোলা যায় না।')
      : /Android/i.test(navigator.userAgent)
        ? text('On Android: open this page in Chrome → ⋮ menu → Add to Home screen or Install app. If you are in Messenger or another in-app browser, open the link in Chrome first.', 'Android-এ Chrome দিয়ে খোলো → ⋮ menu → Add to Home screen অথবা Install app। Messenger বা অন্য app-এর browser হলে আগে Chrome-এ link খোলো।')
        : text('On your computer: open the page in Chrome or Edge and look for Install in the address bar or browser menu. Some browsers, private windows and embedded browsers do not support installation. On a Mac, supported Safari versions offer File → Add to Dock.', 'Computer-এ Chrome বা Edge-এর address bar অথবা menu-তে Install খুঁজো। কিছু browser, private window ও embedded browser install support করে না। সমর্থিত Mac Safari-তে File → Add to Dock ব্যবহার করা যায়।');
    help.textContent = steps;
    status.textContent = text('Use the steps below to add the app on this device.', 'এই device-এ app যোগ করতে নিচের ধাপ অনুসরণ করো।');
    help.focus();
  };
  const installed = () => {
    button.hidden = true;
    help.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    status.textContent = text('You are already using the app window.', 'তুমি এখন app window-তেই আছো।');
  };
  const update = () => {
    if (standalone() || location.hostname === 'appassets.androidplatform.net') { installed(); return; }
    button.hidden = false;
    button.textContent = promptEvent ? text('Install web app', 'Web app install করো') : text('Add app to your device', 'Device-এ app যোগ করো');
    if (!help.hidden) showHelp();
  };
  window.addEventListener('beforeinstallprompt', event => {
    if (standalone()) return;
    event.preventDefault();
    promptEvent = event;
    update();
  });
  button.addEventListener('click', async () => {
    if (busy) return;
    if (!promptEvent) { showHelp(); return; }
    const current = promptEvent;
    promptEvent = null;
    busy = true;
    button.disabled = true;
    try {
      await current.prompt();
      const choice = await current.userChoice;
      status.textContent = choice.outcome === 'accepted'
        ? text('Installation requested. Complete any browser confirmation, then look for the app icon.', 'Install request হয়েছে। Browser-এর confirmation শেষ করে app icon দেখো।')
        : text('Installation cancelled. You can try later from your browser menu.', 'Install বাতিল হয়েছে। পরে browser menu থেকে আবার করতে পারবে।');
      if (choice.outcome !== 'accepted') showHelp();
    } catch { showHelp(); }
    finally { busy = false; button.disabled = false; update(); }
  });
  document.getElementById('language')?.addEventListener('change', update);
  window.addEventListener('appinstalled', installed);
  update();
})();