import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1 //Changement du signe < en > afin d'effectuer un défilement des évènements décroissant
  );
  const nextCard = () => {
    // Pour éviter d'avoir une erreur console sur le length d'un élément considéré comme undefined
    if (byDateDesc && byDateDesc.length>0){
      setTimeout(
        // Suppression de la page blanche du slider : ajout du -1 à byDateDesc.length afin index + 1 ne dépasse pas la longueur du tableau
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000
      );
    }
  };
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div> {/*Decalage des mois car l'index commençait à 1 au lieu de 0 -> voir helpers/Date*/}
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${radioIdx + 1}`} // // Modification sinon la key reste fixe dans la boucle car event ne fait pas parti des paramètres
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Remplacement par index, car idx est l'index de la boucle
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
