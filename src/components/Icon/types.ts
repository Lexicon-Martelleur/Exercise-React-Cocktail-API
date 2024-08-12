export type IconSizeType = "small" | "medium" | "large" | "xlarge";

export interface IIcon {
    light: IIconSource;
    dark: IIconSource;
}

export interface IIconSource {
    src: string;
    alt: string;
    title: string;
}
