
export default class CacheRequests {
    constructor() {
        this.caches = new Map();
    }

    set(url, response) {
        this.caches.set(url, response);
    }
    
    get(url) {
      return this.caches.get(url);
    }

    has(url) {
      return this.caches.has(url);
    }
}
