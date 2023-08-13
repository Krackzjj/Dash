export type NameColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type Sizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

export type Colors = {
    [key: string]: string
}

enum ColorType {
    JPG = 'hsl(200,80%,70%)',
    JPEG = 'hsl(200,80%,70%)',
    PNG = 'hsl(240,70%,70%)',
    GIF = 'hsl(280,80%,75%)',
    BMP = 'hsl(320,70%,65%)',
    SVG = 'hsl(60,70%,65%)',
    WEBP = 'hsl(150,70%,65%)',
    Other = 'hsl(0,0%,60%)'
}

export const Colors: Colors = {
    JPG: ColorType.JPG,
    JPEG: ColorType.JPEG,
    PNG: ColorType.PNG,
    GIF: ColorType.GIF,
    BMP: ColorType.BMP,
    SVG: ColorType.SVG,
    WEBP: ColorType.WEBP,
    Other: ColorType.Other
}