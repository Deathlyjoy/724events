import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import { useData } from "../../contexts/DataContext";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => {
  const { data } = useData();
  // Tri des événèments par date décroissante
  const filteredEvents = data?.events || [];
  filteredEvents.sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date));
  // Sélection du dernier événement
  const lastEvent = filteredEvents.length > 0 ? filteredEvents[0] : {};
  // Définition des éléments du dernier événement
  const lastImageSrc = lastEvent?.cover || "";
  const lastImageAlt = lastEvent?.description || "";
  const lastTitle = lastEvent?.title || "";
  const lastType = lastEvent?.type || "";

  return (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img
          data-testid="card-image-testid"
          src={imageSrc || lastImageSrc}
          alt={imageAlt || lastImageAlt}
        />
        <div className="EventCard__label">{label || lastType}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title || lastTitle}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string,
};

export default EventCard;
