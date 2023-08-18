import { formatDate } from '@/utils/date'

const BASE_URL = import.meta.env.VITE_API_URL
export async function get(id?: string) {
    const response = await fetch(`${BASE_URL}/img/${id ?? ''}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const data = await response.json()
    return data.map((img: Record<string, any>) => {
        return {
            ...img,
            published: !!img.published,
            external: !!img.external,
            inserted_at: formatDate(img.inserted_at)
        }
    })
}
export async function getInTrash() {
    const response = await fetch(`${BASE_URL}/img/trash`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const data = await response.json()
    return data.map((img: Record<string, any>) => {
        return {
            ...img,
            published: !!img.published,
            external: !!img.external,
            inserted_at: formatDate(img.inserted_at)
        }
    })

}

export async function update(id: string, DTO: Record<string, any>) {
    await fetch(`${BASE_URL}/img/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DTO) })
}

export async function post(DTO: Record<string, any> | Record<string, any>[]) {
    await fetch(`${BASE_URL}/img`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DTO) })
}

export async function delete_(id: string, force?: boolean) {
    await fetch(`${BASE_URL}/img/${id}${force ? '/force' : ''}`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
}
export async function deleteMany(ids: string[]) {
    await fetch(`${BASE_URL}/img`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(ids) })
}

export async function restore(id: string) {
    await fetch(`${BASE_URL}/img/${id}/restore`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(id)
    })
}


