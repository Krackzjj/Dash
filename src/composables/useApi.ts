const BASEURL = import.meta.env.VITE_API_URL
interface ResponseAPI {
    response?: Record<string, any> | Record<string, any>[]
    status: number
}

export function useApi(url: string, data?: Record<string, any>) {


    const get = async (): Promise<ResponseAPI> => {
        let response = await fetch(BASEURL + url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
        return {
            response: await response.json(),
            status: response.status,
        }

    }

    async function post(): Promise<ResponseAPI> {
        let response = await fetch(BASEURL + url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        return {
            response: await response.json(),
            status: response.status,
        }
    }

    async function put(data: Record<string, any>): Promise<ResponseAPI> {
        let response = await fetch(BASEURL + url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        return {
            response: await response.json(),
            status: response.status,
        }
    }

    return {
        get,
        post,
        put
    }
}