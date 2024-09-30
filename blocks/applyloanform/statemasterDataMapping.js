export const statemasterDataMap = (function () {
    return {
      get(key) {
        return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {};
      },
      set(key, newDataMapping) {
        
        sessionStorage.setItem(key, JSON.stringify(newDataMapping));
        // dataMapping = newDataMapping;
      },
    };
  })();