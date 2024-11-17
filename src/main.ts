import {app, BrowserWindow, dialog, ipcMain} from 'electron';
import path from 'path';
import fs from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

ipcMain.handle('save-json-file', async (event, content: any) => {
  const options = {
    title: 'Save file',
    defaultPath: path.join(app.getPath('desktop'), 'myFile.json'), // You can change the default path and file name
    buttonLabel: 'Save',
    filters: [
      { name: 'json', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  };

  const { filePath } = await dialog.showSaveDialog(options);

  if (filePath) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    return { success: true };
  } else {
    return { success: false };
  }
});

ipcMain.handle('open-file-dialog', async () => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ['openFile'],
  });

  if (filePaths && filePaths.length > 0) {
    return fs.readFileSync(filePaths[0], 'utf8');
  } else {
    throw new Error('No file selected.');
  }
});

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL('');
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
