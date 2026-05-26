import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps =
  | ({
      href: string;
      children: React.ReactNode;
    } & React.ComponentPropsWithoutRef<typeof Link>)
  | ({
      href?: undefined;
      children: React.ReactNode;
    } & React.ButtonHTMLAttributes<HTMLButtonElement>);

export default function Button({ children, href, ...props }: ButtonProps) {
  if (href !== undefined) {
    return (
      <Link
        href={href}
        className={styles.btn}
        {...(props as React.ComponentPropsWithoutRef<typeof Link>)}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={styles.btn}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
