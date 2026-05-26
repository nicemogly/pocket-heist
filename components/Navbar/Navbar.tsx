"use client";

import { Clock8 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useUser } from "@/providers";
import styles from "./Navbar.module.css";
import Button from "@/components/Button";

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <div className={styles.siteNav}>
      <nav>
        <header>
          <h1>
            <Link href="/heists">
              P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
              cket Heist
            </Link>
          </h1>
          <div>Tiny missions. Big office mischief.</div>
        </header>
        <ul>
          {user && (
            <li className={styles.userInfo}>
              <span className={styles.email}>{user.email}</span>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Log out
              </button>
            </li>
          )}
          <li>
            <Button href="/heists/create">Create Heist</Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
