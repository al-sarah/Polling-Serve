let hash = {}
let counter = 1
export async function blockingGet(key) {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (hash.hasOwnProperty(key) && hash[key].length > 0) {
          clearInterval(intervalId); // Stop checking
          clearTimeout(timeoutId); // Prevent timeout from executing
          resolve(hash[key].pop()); // Resolve with the found value
        }
      }, 100);
  
      // Clear interval and resolve with null if 40 seconds pass
      const timeoutId =  setTimeout(() => {
        clearInterval(intervalId);
        resolve(null); // Resolve with null if the key is not found
      }, 40000);
    });
  }

export async function push(key, data) {
    if(!hash[key]) {
        hash[key] = []
    }
    hash[key].push(counter)
    counter = counter + 1
}