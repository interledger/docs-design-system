import styles from './LargeImg.module.css'

export default function LargeImg({ src, alt, hasBorder = true }) {
  const border = hasBorder ? styles.border : ''

  return (
    <div className={styles.imgWrapper}>
      <img src={src} alt={alt} className={`${styles.img} ${border}`} />
      <a
        href={src}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.outLink}
      >
        View full image
      </a>
    </div>
  )
}
