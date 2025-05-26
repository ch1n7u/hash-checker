import { useCallback } from 'react';
import styles from '../styles/Home.module.css';

export default function FileUpload({ setHashResults, setIsLoading }) {
  const handleFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/hash', {
        method: 'POST',
        body: formData
      });

      const results = await response.json();
      setHashResults({ ...results, fileName: file.name, fileSize: file.size });
    } catch (error) {
      console.error('Error calculating hashes:', error);
      setHashResults({ error: 'Failed to calculate hashes' });
    } finally {
      setIsLoading(false);
    }
  }, [setHashResults, setIsLoading]);

  return (
    <div className={styles.uploadContainer}>
      <input 
        type="file" 
        id="file-upload" 
        className={styles.fileInput} 
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className={styles.uploadLabel}>
        <div className={styles.uploadBox}>
          <svg className={styles.uploadIcon} viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          <p>Choose a file or drag it here</p>
          <span className={styles.uploadHint}>Supports any file type</span>
        </div>
      </label>
    </div>
  );
}