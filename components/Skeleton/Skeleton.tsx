import styles from "./Skeleton.module.css"

function SkeletonCard() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={`${styles.block} ${styles.avatar}`} />
        <div className={styles.headerLines}>
          <div className={`${styles.block} ${styles.lineLong}`} />
          <div className={`${styles.block} ${styles.lineMedium}`} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={`${styles.block} ${styles.lineFull}`} />
        <div className={`${styles.block} ${styles.lineFull}`} />
        <div className={`${styles.block} ${styles.lineShort}`} />
      </div>
    </div>
  )
}

export default function Skeleton({ count = 1 }: { count?: number }) {
  if (count === 1) return <SkeletonCard />

  return (
    <div className={styles.grid}>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
