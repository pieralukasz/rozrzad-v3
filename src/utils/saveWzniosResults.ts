export const saveWzniosResults = async (
  name: string,
  content: object
) => {
  try {
      console.log('content', content);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const result = await window.electronAPI.saveJsonFile(content);

    if (!result.success) {
      console.error('Failed to save file.');
    }
  } catch (err) {
    console.error(err);
  }
};
