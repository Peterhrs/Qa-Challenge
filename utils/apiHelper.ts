import { APIRequestContext, expect, APIResponse } from "@playwright/test";

export const getRequest = async (request: APIRequestContext, url:string) => {
    const response = await request.get(url);
    return response;
}

export const postRequest = async (request: APIRequestContext, url:string, data: object) => {
    const response = await request.post(url, {data});
    return response;
}

export const putRequest = async (request: APIRequestContext, url:string, data: object) => {
    const response = await request.put(url, {data});
    return response;
}

export const deleteRequest = async (request: APIRequestContext, url:string) => {
    const response = await request.delete(url);
    return response;
}

export const checkJsonBody = async (response: APIResponse, expectedProperties: string[]): Promise<void> => {
    const body = await response.json();
    
    body.data.forEach((item: Record<string, any>) => {
        expectedProperties.forEach((prop: string) => {
            // Verifica se a propriedade existe no item
            if (item.hasOwnProperty(prop)) {
                expect(item).toHaveProperty(prop);
            }
        });
    });
};

export const checkStatus = async (response: APIResponse, expectedStatus: number): Promise<void> => {
    expect(response.status()).toBe(expectedStatus);
}

export const validateEmail = async (response: APIResponse): Promise<void> => {
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body.data).toBeInstanceOf(Array);
    body.data.forEach((user: {email: string}) => {
        expect(user.email).toMatch(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    });
}