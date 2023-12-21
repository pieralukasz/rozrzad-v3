export const selectFile = async () => {
  try {
    console.log('content');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await window.electronAPI.openFileDialog();
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
