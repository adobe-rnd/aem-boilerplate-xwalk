export const toBase64 = file => new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = () => {
        resolve(reader.result);
    }
    reader.onerror = reject;
});
