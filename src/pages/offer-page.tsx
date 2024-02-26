import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found-page';
import { Helmet } from 'react-helmet-async';
import { Offer } from '../types/offer';
import Gallery from '../components/gallery';
import OfferHost from '../components/offer-host';
import Reviews from '../components/reviews';
import Map from '../components/map';
import PlacesList from '../components/places-list';
import PremiumBadge from '../components/premium-badge';
import Rating from '../components/rating';
import OfferGoods from '../components/offer-goods';

type TOfferPageProps = {
  offers: Offer[];
};

function OfferPage({ offers }: TOfferPageProps) {
  const { id } = useParams();
  const offer = offers.find((item) => item.id === id);

  return offer ? (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        <Gallery images={offer.images} />
        <div className="offer__container container">
          <div className="offer__wrapper">
            <PremiumBadge
              isPremium={offer.isPremium}
              extraClassName="offer__mark"
            />
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <Rating rating={offer.rating} extraClassName="offer" />
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {offer.maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">${offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <OfferGoods offer={offer} />
            </div>
            <OfferHost
              isPro={offer.host.isPro}
              avatarUrl={offer.host.avatarUrl}
              name={offer.host.name}
            />
            <div className="offer__description">
              <p className="offer__text">{offer.description}</p>
            </div>
            <Reviews extraClassName="offer__reviews" />
          </div>
        </div>
        <Map extraClassName="offer__map" />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">
            Other places in the neighbourhood
          </h2>
          <PlacesList offers={offers} extraClassName="near-places__list" />
        </section>
      </div>
    </main>
  ) : (
    <NotFoundPage />
  );
}

export default OfferPage;
