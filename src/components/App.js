import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import { auth } from "../utils/auth";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute ";
import Register from "./Register";

function App() {
	const history = useHistory();
	const [isEditProfilePopupOpen, setEditProfilePopupState] = React.useState(false);
	const [isAddPlacePopupOpen, setAddPlacePopupState] = React.useState(false);
	const [isEditAvatarPopupOpen, setEditAvatarPopupState] = React.useState(false);
	const [isInfoTooltipPopupOpen, setInfoTooltipPopupState] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(false);
	const [currentUser, setCurrentUser] = React.useState({ name: "", description: "", avatar: '' });
	const [cards, setCards] = React.useState([]);
	const [isLoggedIn, setIsloggedIn] = React.useState(false);
	const [isLoginSuccess, setIsLoginSuccess] = React.useState(false);
	const [userEmail, setUserEmail] = React.useState('');

	function handleEditAvatarClick() {
		setEditAvatarPopupState(true)
	}
	function handleEditProfileClick() {
		setEditProfilePopupState(true)
	}
	function handleAddPlaceClick() {
		setAddPlacePopupState(true)
	}
	function handleCardClick(card) {
		setSelectedCard(card);
	}

	function handleUpdateUser(data) {
		api.setUserInfo(data)
			.then((data) => {
				setCurrentUser(data)
				closeAllPopups();
			})
			.catch((r) =>
				console.log(r))
	}
	function handleAddPlace(data) {
		api.postNewCard(data)
			.then((addedCard) => {
				setCards([addedCard, ...cards])
				closeAllPopups();
			})
			.catch((r) => {
				console.log(r);
			})
	}


	function handleUpdateAvatar(link) {
		api.updateAvatar(link)
			.then((data) => {
				setCurrentUser(data);
				closeAllPopups();
			})
			.catch((r) => {
				console.log(r);
			})
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some((i) =>
			i._id === currentUser._id);
		api.changeLikeCardStatus(card._id, isLiked)
			.then((newCard) => {
				setCards((state) =>
					state.map((c) => c._id === card._id ? newCard : c));
			}).catch((r) => {
				console.log(r);
			});
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
			.then(() => {
				const filteredCards = cards.filter(filteredCard => filteredCard !== card)
				setCards(filteredCards)
			})
			.catch((r) => {
				console.log(r);
			})
	}

	function handleRegistation(password, email) {
		auth.registration(password, email)
			.then(() => {
				setIsLoginSuccess(true);
				setInfoTooltipPopupState(true);
				history.push('/sign-in')
			})
			.catch((r) => {
				setIsLoginSuccess(false);
				setInfoTooltipPopupState(true);
				console.log(r);
			})
	}
	function handleLogin(password, email) {
		auth.authorization(password, email)
			.then((r) => {
				setIsloggedIn(true);
				localStorage.setItem('jwt', r.token)
				history.push('/');
				handleTokenCheck();
			})
			.catch((r) => {
				setIsLoginSuccess(false);
				setInfoTooltipPopupState(true);
				console.log(r);
			})
	}

	const handleTokenCheck = React.useCallback(
		() => {
			const token = localStorage.getItem('jwt');
			auth.checkTokenValidity(token)
				.then((r) => {
					setUserEmail(r.data.email)
					setIsloggedIn(true);
					history.push('/')
				})
				.catch((r) => {
					console.log(r);
				})
		}, [history]
	)

	React.useEffect(
		() => {
			const token = localStorage.getItem('jwt');
			if (token) {
				handleTokenCheck()
			}
		}, [handleTokenCheck]
	)

	function onSignOut() {
		localStorage.removeItem('jwt');
		setIsloggedIn(false);
		history.push("/sign-in");
	}

	function closeAllPopups() {
		setEditAvatarPopupState(false)
		setEditProfilePopupState(false)
		setAddPlacePopupState(false)
		setInfoTooltipPopupState(false)
		setSelectedCard({ name: '', link: '' })
	}

	React.useEffect(() => {
		if (isLoggedIn) {
			api.getUserInfo()
				.then((data) => {
					setCurrentUser(data);
				}).catch((r) => {
					console.log(r);
				})
			api.getInitialCards()
				.then((data) => {
					setCards(data)
				}).catch((r) => {
					console.log(r);
				})
		}
	}, [isLoggedIn])

	return (
		<div className="page__content">
			<CurrentUserContext.Provider value={currentUser}>
				<Header
					isLoggedIn={isLoggedIn}
					userEmail={userEmail}
					onSignOut={onSignOut}
				/>
				<Switch>
					<Route path="/sign-up">
						<Register
							onRegistration={handleRegistation}
						/>
					</Route>
					<Route path="/sign-in">
						<Login
							onLogin={handleLogin} />
					</Route>
					<ProtectedRoute exact path="/"
						component={Main}
						isLoggedIn={isLoggedIn}
						cards={cards}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						onCardDelete={handleCardDelete}
						onEditAvatar={handleEditAvatarClick}
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
					/>
				</Switch>
				<Footer />
				<EditProfilePopup
					isOpen={isEditProfilePopupOpen}
					onClose={closeAllPopups}
					onUpdateUser={handleUpdateUser}
				/>
				<EditAvatarPopup
					isOpen={isEditAvatarPopupOpen}
					onClose={closeAllPopups}
					onUpdateAvatar={handleUpdateAvatar}
				/>
				<AddPlacePopup
					isOpen={isAddPlacePopupOpen}
					onClose={closeAllPopups}
					onAddPlace={handleAddPlace}
				/>
				<PopupWithForm
					name='confirm'
					title='Вы уверены?'
					children={
						<button type="submit" className="form-confirm__submit-button form__submit-button button">
							Да
						</button>
					}
				/>
				<ImagePopup
					card={selectedCard}
					onClose={closeAllPopups}
				/>
				<InfoTooltip
					isOpen={isInfoTooltipPopupOpen}
					onClose={closeAllPopups}
					isLoggedIn={isLoggedIn}
					isLoginSuccess={isLoginSuccess}
				/>
			</CurrentUserContext.Provider>
		</div>
	);
}

export default App;
