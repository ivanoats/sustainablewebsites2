export interface PageProps {
  params: Record<string, string>;
  searchParams: Record<string, string | string[] | undefined>;
}

export interface CTAButtonProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href?: string;
  children?: React.ReactNode;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navbar: NavLink[];
}
