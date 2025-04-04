import { SignUp } from "@clerk/nextjs";
import styles from "./page.module.scss";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <SignUp />
    </div>
  );
}
