export class Cache {

    #cache = new Map<string, CacheEntry<unknown>>();
    #reapIntervalId: NodeJS.Timeout | undefined;
    #interval: number;
    
    constructor(interval: number) {
        this.#interval = interval;

        this.#reapIntervalId = setInterval(() => {
            this.#reap();
            }, this.#interval);
    }

    add<T>(key: string, val: T) {
        this.#cache.set(key, { createdAt: Date.now(), val: val });
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry === undefined){
            return undefined;
        }
        return entry.val as T;
    }
    #reap(){
        for (const [key, entry] of this.#cache) {
            const age = Date.now() - entry.createdAt;
            if (age > this.#interval){
                this.#cache.delete(key);
            }
        }
    }

    stopReapLoop(){
        if (this.#reapIntervalId !== undefined){
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }
    
}

export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};