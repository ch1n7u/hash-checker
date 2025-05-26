import styles from '../styles/Home.module.css';

const HashResult = ({ results }) => {
  if (results.error) {
    return <div className={styles.error}>{results.error}</div>;
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.fileInfo}>
        <h3>{results.fileName}</h3>
        <p>{(results.fileSize / 1024).toFixed(2)} KB</p>
      </div>

      <div className={styles.hashResults}>
        <div className={styles.hashItem}>
          <span className={styles.hashType}>MD5</span>
          <code className={styles.hashValue}>{results.md5}</code>
        </div>
        <div className={styles.hashItem}>
          <span className={styles.hashType}>SHA-1</span>
          <code className={styles.hashValue}>{results.sha1}</code>
        </div>
        <div className={styles.hashItem}>
          <span className={styles.hashType}>SHA-256</span>
          <code className={styles.hashValue}>{results.sha256}</code>
        </div>
      </div>

      <button 
        className={styles.copyButton}
        onClick={() => {
          navigator.clipboard.writeText(JSON.stringify(results, null, 2));
          alert('All hashes copied to clipboard!');
        }}
      >
        Copy All Hashes
      </button>
    </div>
  );
};

export default HashResult;