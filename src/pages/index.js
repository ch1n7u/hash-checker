import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import HashResult from '../components/HashResult';
import styles from '../styles/Home.module.css';


export default function Home() {
  const [hashResults, setHashResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.gradientBg} />

        <div className={styles.header}>
          <h1 className={styles.title}>File Hash Checker</h1>
          <p className={styles.description}>
            Upload any file to instantly calculate its hash values
          </p>
          <button
            onClick={toggleTheme}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: 'var(--primary)',
              color: 'var(--text)',
              fontWeight: '600',
            }}
            aria-label="Toggle day and night mode"
          >
            {isDarkMode ? 'Switch to Day Mode' : 'Switch to Night Mode'}
          </button>
        </div>

        <div className={styles.uploadSection}>
          <FileUpload
            setHashResults={setHashResults}
            setIsLoading={setIsLoading}
          />
        </div>

        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.spinner} />
            <p>Calculating hashes...</p>
          </div>
        )}

        {hashResults && <HashResult results={hashResults} />}
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ by Arka Dey</p>
      </footer>
    </div>
  );
}
