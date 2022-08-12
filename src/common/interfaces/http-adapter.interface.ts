
export interface HttpAdapters {
    get<T>(url: string): Promise<T>;
}