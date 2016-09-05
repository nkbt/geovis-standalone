'use strict';


const {app, Menu, BrowserWindow} = require('electron');


// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed() {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}


function createMainWindow() {
  const win = new BrowserWindow({
    title: 'OMG',
    width: 600,
    height: 400,
    backgroundColor: '#282828',
    darkTheme: true
  });

  win.loadURL(`file://${__dirname}/index.html`);
  win.on('closed', onClosed);

  win.on('enter-full-screen', function () {
    win.setMenuBarVisibility(false);
  });

  win.on('leave-full-screen', function () {
    win.setMenuBarVisibility(true);
  });


  function toggleFullScreen(flag) {
    if (!win || !win.isVisible()) {
      return;
    }

    if (flag == null) {
      flag = !win.isFullScreen();
    }

    if (flag) {
      // Fullscreen and aspect ratio do not play well together. (OS X)
      win.setAspectRatio(0);
    }

    win.setFullScreen(flag);
  }


  const menu = Menu.buildFromTemplate([
    {label: 'GeoVis', submenu: [{role: 'about'}]},
    {label: 'File', submenu: [{role: 'quit'}]},
    {
      label: 'View',
      submenu: [
        {
          label: 'Full Screen',
          type: 'checkbox',
          accelerator: process.platform === 'darwin'
            ? 'Ctrl+Command+F'
            : 'F11',
          click: () => toggleFullScreen()
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();
});


app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});
