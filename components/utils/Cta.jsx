import styles from "@/styles/utils/Cta.module.scss";
export default function Cta({ children, className, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={styles.Cta + " " + className}
    >
      {children}
    </button>
  );
}
