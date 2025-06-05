function logicManager() {
  const windowsEl = document.getElementById('windows');
  const taskbarEl = document.getElementById('taskbar');
  const iconsEl = document.getElementById('icons');

  function createWindow(app) {
    const windowId = `window-${app.id}`;
    let win = document.getElementById(windowId);
    if (win) {
      win.style.display = 'block';
      return;
    }

    win = document.createElement('div');
    win.id = windowId;
    win.className = 'window absolute left-20 top-20 w-96 h-64 bg-white text-black shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-slate-900';
    windowsEl.appendChild(win);

    win.innerHTML = `
      <div class='flex items-center justify-between bg-slate-800 text-white p-2 cursor-move'>
        <span>${app.title}</span>
        <button class='minimize-btn text-sm font-bold rounded w-6 h-6 text-center hover:bg-slate-600'>_</button>
      </div>
      <div class='flex-1 bg-white text-black'>${app.content}</div>
    `;

    const minimizeBtn = win.querySelector('.minimize-btn');
    minimizeBtn.addEventListener('click', () => {
      win.style.display = 'none';
      const icon = document.createElement('div');
      icon.id = `icon-${app.id}`;
      icon.className = 'minimized-icon cursor-pointer text-center text-white hover:bg-slate-700 rounded-lg p-2 w-16';
      icon.innerHTML = `<div class='text-3xl'>${app.icon}</div><div class='text-xs'>${app.title}</div>`;
      icon.onclick = () => {
        win.style.display = 'block';
        icon.remove();
      };
      iconsEl.appendChild(icon);
    });

    const header = win.querySelector('.cursor-move');
    makeDraggableWithClick(header, () => win.scrollIntoView({ behavior: 'smooth', block: 'center' }));

    const taskBtn = document.createElement('button');
    taskBtn.id = `task-${app.id}`;
    taskBtn.className = 'bg-slate-700 rounded px-2 py-1 hover:bg-slate-600';
    taskBtn.textContent = app.title;
    taskBtn.onclick = () => {
      const winEl = document.getElementById(`window-${app.id}`);
      if (winEl) winEl.style.display = winEl.style.display === 'none' ? 'block' : 'none';
    };
    taskbarEl.appendChild(taskBtn);
  }

  function renderAppIcons(apps) {
    apps.forEach((app, index) => {
      const icon = document.createElement('div');
      icon.className = 'absolute cursor-pointer text-center text-white hover:bg-slate-700 rounded-lg p-2 w-16';
      icon.style.left = `${40 + index * 100}px`;
      icon.style.top = `40px`;
      icon.innerHTML = `<div class='text-3xl'>${app.icon}</div><div class='text-xs'>${app.title}</div>`;
      iconsEl.appendChild(icon);

      makeDraggableWithClick(icon, () => createWindow(app));
    });
  }

  renderAppIcons(apps);
}
