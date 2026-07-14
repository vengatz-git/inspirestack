export interface NavigationItem {
    label: string;
    href: string;
}

export const navigation: NavigationItem[] = [
    {
        label: "Explore",
        href: "/explore",
    },
    {
        label:"Collections",
        href: "/collections",
    },
];