import clsx from 'clsx';
import ReviewsForm from '../reviews-form';
import { Review } from '../../types/review';
import ReviewList from '../review-list';
import { useAuth } from '../../hooks/user-auth';

type TReviewProps = {
  extraClassName?: string;
  reviews: Review[];
  offerId: string;
};

function Reviews({ extraClassName, reviews, offerId }: TReviewProps) {
  const isAuth = useAuth();

  return (
    <section className={clsx('reviews', extraClassName)}>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ReviewList reviews={reviews} />
      {isAuth && <ReviewsForm offerId={offerId} />}
    </section>
  );
}

export default Reviews;
