import Cta from "@/components/utils/Cta";
import styles from "@/styles/Home.module.scss";

export default function index() {
  return (
    <div className={styles.Hero}>
      <div className={styles.content}>
        <h2 className={styles.subheading}>appetizers</h2>
        <h1 className={styles.heading}>Sam Salad Sandwich With poached egg</h1>
        <div className={styles.dateTime}>
          April 30, 2023 <b>&middot;</b> 2 Min Read
        </div>
        <Cta className={styles.cta}>Read more</Cta>
      </div>
    </div>
  );
}
