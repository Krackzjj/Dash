import { z } from 'zod';
import { imgSchema } from "@/schema/ImgSchema";

const BASE_URL = import.meta.env.VITE_API_URL
export async function get() {
    const response = await fetch(`${BASE_URL}/img`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
    const data = await response.json()
    return z.array(imgSchema).parse(data)
}

export async function post(DTO: Record<string, any>) {
    const response = await fetch(`${BASE_URL}/img`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(DTO) })
}

