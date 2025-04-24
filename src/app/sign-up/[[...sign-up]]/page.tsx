import { SignUp } from "@clerk/nextjs";
import styles from "./page.module.scss";
import { neobrutalism } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignUp appearance={{ baseTheme: neobrutalism }} />
    </div>
  );
}
