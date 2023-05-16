export default interface ClientCookieManager<T> {
    getCookie(): T;
    setCookie(value: T): void;
    deleteCookie(): void;
}
