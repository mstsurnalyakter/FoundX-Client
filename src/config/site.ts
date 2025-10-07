export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + HeroUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Found Items",
      href: "/found-items",
    },
     { 
      label: "Contact",
       href: "/contact" 
      },
  ],
  navMenuItems: [
  {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Found Items",
      href: "/found-items",
    }
  ]
};
