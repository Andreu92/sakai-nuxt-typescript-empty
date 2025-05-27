interface LayoutConfig {
    preset: string | null;
    primary: string;
    surface: string | null;
    darkTheme: boolean;
    menuMode: string;
}

interface MenuItem {
    disabled?: boolean;
    to?: string;
    url?: string;
    command?: (args: { originalEvent: MouseEvent; item: MenuItem }) => void;
    items?: MenuItem[];
    icon?: string;
    label?: string;
    class?: string;
    target?: string;
    visible?: boolean;
}

interface ColorPalette {
    [key: string]: string | undefined;
}

interface PrimaryColorOption {
    name: string;
    palette: ColorPalette;
}

interface SurfaceOption {
    name: string;
    palette: ColorPalette;
}