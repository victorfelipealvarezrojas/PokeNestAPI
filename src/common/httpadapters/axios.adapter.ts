import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { HttpAdapters } from "../interfaces/http-adapter.interface";

@Injectable()
export class AxiosAdapter implements HttpAdapters {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {

            const { data } = await this.axios.get<T>(url);
            return data;
  
        } catch (e) {
            throw new Error(e);
        }
    }

}
