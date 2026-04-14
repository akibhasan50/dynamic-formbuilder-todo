import styles from './TodoItem.module.css';

export default function TodoItem({ todo, index }) {
  const isCompleted = todo.completed;

  return (
    <div className={styles.card}>
      <span className={styles.index}>{index}</span>
      <div className={styles.content}>
        <p className={styles.title}>{todo.title}</p>
        <div className={styles.meta}>
          <span className={styles.userName}>
            <svg className={styles.userIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {todo.userName}
          </span>
        </div>
      </div>
      <span
        className={`${styles.badge} ${isCompleted ? styles.badgeCompleted : styles.badgePending}`}
      >
        <span
          className={`${styles.dot} ${isCompleted ? styles.dotCompleted : styles.dotPending}`}
        />
        {isCompleted ? 'Completed' : 'Pending'}
      </span>
    </div>
  );
}
