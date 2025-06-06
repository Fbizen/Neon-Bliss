function logicManager() {
  const windowsEl = document.getElementById('windows');
  const taskbarEl = document.getElementById('taskbar');
  const iconsEl = document.getElementById('icons');

  function createWindow(app) {
    const windowId = `window-${app.id}`;
    if (document.getElementById(windowId)) return;

    const win = document.createElement('div');
    win.id = windowId;
    win.className = `win98 absolute left-20 top-20 w-96 h-64 flex flex-col overflow-hidden`;
    windowsEl.appendChild(win);

    win.innerHTML = `
      <div class='title-bar'>
        <span>${app.title}</span>
        <div>
          <button class='window-btn min-btn'>🗕</button>
          <button class='window-btn max-btn'>🗖</button>
        </div>
      </div>
      <div class='flex-1 bg-white text-black p-1'>${app.content}</div>
    `;

    const closeBtn = win.querySelector('.max-btn');
    closeBtn.addEventListener('click', () => {
      win.remove();
      const task = document.getElementById(`task-${app.id}`);
      if (task) task.remove();
    });

    const minBtn = win.querySelector('.min-btn');
    minBtn.addEventListener('click', () => {
      win.style.display = 'none';
    });

    const header = win.querySelector('.title-bar');
    makeDraggableWithClick(header, () => win.scrollIntoView({ behavior: 'smooth', block: 'center' }));

    const taskBtn = document.createElement('button');
    taskBtn.id = `task-${app.id}`;
    taskBtn.className = 'bg-slate-700 rounded px-2 py-1 hover:bg-slate-600';
    taskBtn.textContent = app.title;
    taskBtn.onclick = () => {
      if (win.style.display === 'none') {
        win.style.display = '';
      }
      win.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
