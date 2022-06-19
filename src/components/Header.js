import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/logo.svg"
function Header({ isLoggedIn, userEmail, onSignOut }) {
	const location = useLocation();

	return (
		<header className="header">
			<img className="header__logo" src={logoPath} alt="Логотип" />
			<div className="registration registration_header">
				{isLoggedIn &&
					<>
						<p className="registration__text">{userEmail}</p>
						<span className="registration__link" onClick={onSignOut}>Выйти</span>
					</>
				}
				{!isLoggedIn && location.pathname === '/sign-in' &&
					<Link to="/sign-up" className="registration__link">Регистрация</Link>
				}
				{!isLoggedIn && location.pathname === '/sign-up' &&
					<Link to="/sign-in" className="registration__link">Вoйти</Link>
				}
			</div>
		</header>
	)
};

export default Header;