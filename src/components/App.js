import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });

  function handleCardsChange(data) {
    setCards(data);
  }

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([dataCards, dataUser]) => {
        handleCardsChange(dataCards);
        setCurrentUser(dataUser);
      })
      .catch(err => console.log(err));
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ link: 'reset', name: 'reset' });
  }

  const handleCardClick = ({ link, name }) => {
    setSelectedCard({ link: link, name: name });
    setIsImagePopupOpen(true);
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  const handleCardDelete = (card) => {
    api.removeCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => !(c._id === card._id))
        );
      })
      .catch(err => console.log(err));
  }

  const handleUpdateUser = ({ name, about }) => {
    api.updateUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = (avatar) => {

    api.updateUserAvatar({ image: avatar.avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addCard({ name, link })
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header/>

        <Main
          cards={cards}
          handleCardsChange={handleCardsChange}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer/>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddPlaceSubmit}/>

        <PopupWithForm
          name={'confirm'}
          title={'Вы уверены?'}
          buttonName={'Да'}
        />

        <ImagePopup
          card={selectedCard}
          onCardClick={handleCardClick}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
