import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";


function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
	const currentUser = React.useContext(CurrentUserContext);

	return (
		<main>
			<section className="profile">
				<div className="profile__content-container">
					<div className="profile__avatar-container">
						<img src={currentUser.avatar} alt="Аватар"
							className="profile__avatar" />
						<button className="profile__edit-avatar-button" onClick={onEditAvatar}></button>
					</div>
					<div className="profile__text-container">
						<h1 className="profile__title">{currentUser.name}</h1>
						<button className="profile__edit-button button" onClick={onEditProfile}></button>
						<h2 className="profile__subtitle">{currentUser.about}</h2>
					</div>
				</div>
				<button className="profile__post-button button" onClick={onAddPlace}></button>
			</section>
			<section className="elements" >
				{cards.map((card) =>
					<Card
						onCardDelete={onCardDelete}
						onCardLike={onCardLike}
						onCardClick={onCardClick}
						card={card}
						key={card._id}
						name={card.name}
						link={card.link}
						likes={card.likes}
					/>
				)}
			</section>
		</main>

	)
};
export default Main