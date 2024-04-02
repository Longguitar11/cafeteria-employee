export const decodeBase64String = (thumbnail: string) => {
    try {
      const decodedString = atob(thumbnail);
      const byteArray = new Uint8Array(decodedString.length);
      for (let i = 0; i < decodedString.length; i++) {
        byteArray[i] = decodedString.charCodeAt(i);
      }
      return byteArray;
    } catch (error) {
      console.error('Error decoding base64 string:', error);
      return null;
    }
  };
  