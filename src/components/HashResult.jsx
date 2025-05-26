import { useState } from 'react';
import styles from '../styles/Home.module.css';

const HashResult = ({ results }) => {
  const [toast, setToast] = useState(null);
  const [inputHash, setInputHash] = useState('');
  const [selectedType, setSelectedType] = useState('md5');
  const [comparisonResult, setComparisonResult] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} hash copied!`);
  };

  const handleCompare = () => {
    const actualHash = results[selectedType];
    if (!inputHash.trim()) {
      setComparisonResult(null);
      return;
    }
    if (inputHash.trim().toLowerCase() === actualHash.toLowerCase()) {
      setComparisonResult('match');
    } else {
      setComparisonResult('mismatch');
    }
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
        {['md5', 'sha1', 'sha256'].map((type) => (
          <div key={type} className={styles.hashItem}>
            <span className={styles.hashType}>{type.toUpperCase()}</span>
            <code className={styles.hashValue}>{results[type]}</code>
            <button
              className={styles.copyButton}
              onClick={() => copyToClipboard(results[type], type.toUpperCase())}
            >
              Copy
            </button>
          </div>
        ))}
      </div>

      <div className={styles.compareSection}>
        <label className={styles.compareLabel}>Compare with original hash:</label>
        <select
          className={styles.hashSelect}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="md5">MD5</option>
          <option value="sha1">SHA-1</option>
          <option value="sha256">SHA-256</option>
        </select>
        <input
          className={styles.compareInput}
          type="text"
          placeholder="Paste original hash here"
          value={inputHash}
          onChange={(e) => setInputHash(e.target.value)}
        />
        <button className={styles.compareButton} onClick={handleCompare}>
          Compare
        </button>

        {comparisonResult && (
          <p
            className={
              comparisonResult === 'match'
                ? styles.compareMatch
                : styles.compareMismatch
            }
          >
            {comparisonResult === 'match' ? '✅ Hash matches!' : '❌ Hash does not match.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default HashResult;
