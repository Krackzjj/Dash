import { formatDate } from '@/utils/date'

const BASE_URL = import.meta.env.VITE_API_URL
export async function get() {
    const response = await fetch(`${BASE_URL}/img`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
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

export async function post(DTO: Record<string, any>) {
    await fetch(`${BASE_URL}/img`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DTO) })
}

export async function delete_(id: string) {
    await fetch(`${BASE_URL}/img/trash/${id}/force`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' } })
}

