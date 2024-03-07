import styles from './styles/StarRating.module.css'

function StarRating({ rating }) {
  const filledStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(
    (5 - rating) < 0? 0 : (5 - rating)
  );

  return (
    <div className={styles.StarRating}>
      {filledStars}
      {emptyStars}
    </div>
  );
}

export default StarRating;