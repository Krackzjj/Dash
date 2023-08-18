export function extract(path: string) {
    const ext = path.split('.')[path.split('.').length - 1]
    return ext
}