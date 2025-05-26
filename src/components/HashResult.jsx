import { useState } from 'react';
import styles from '../styles/Home.module.css';

const HashResult = ({ results }) => {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000); // hides after 2s
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} hash copied!`);
  };

  if (results.error) {
    return <div className={styles.error}>{results.error}</div>;
  }

  return (
    <div className={styles.resultsContainer}>
      {toast && <div className={styles.toast}>{toast}</div>}

      <div className={styles.fileInfo}>
        <h3>{results.fileName}</h3>
        <p>{(results.fileSize / 1024).toFixed(2)} KB</p>
      </div>

      <div className={styles.hashResults}>
        <div className={styles.hashItem}>
          <span className={styles.hashType}>MD5</span>
          <code className={styles.hashValue}>{results.md5}</code>
          <button
            className={styles.copyButton}
            onClick={() => copyToClipboard(results.md5, 'MD5')}
          >
            Copy
          </button>
        </div>

        <div className={styles.hashItem}>
          <span className={styles.hashType}>SHA-1</span>
          <code className={styles.hashValue}>{results.sha1}</code>
          <button
            className={styles.copyButton}
            onClick={() => copyToClipboard(results.sha1, 'SHA-1')}
          >
            Copy
          </button>
        </div>

        <div className={styles.hashItem}>
          <span className={styles.hashType}>SHA-256</span>
          <code className={styles.hashValue}>{results.sha256}</code>
          <button
            className={styles.copyButton}
            onClick={() => copyToClipboard(results.sha256, 'SHA-256')}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default HashResult;
