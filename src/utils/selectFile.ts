// In your React/Angular/Vue or any frontend code

import { ipcRenderer } from 'electron';

export const selectFile = async () => {
  try {
    const data = await ipcRenderer.invoke('open-file-dialog');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
