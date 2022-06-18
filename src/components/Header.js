import { Link, useLocation } from "react-router-dom";
import logoPath from "../images/logo.svg"
function Header({ isLoggedIn, userEmail, onSignOut }) {
	const location = useLocation();

	return (
		<header className="header">
			<img className="header__logo" src={logoPath} alt="Логотип" />
			<div className="header__login-info">
				{isLoggedIn &&
					<>
						<p>{userEmail}</p>
						<p onClick={onSignOut}>Выйти</p>
					</>
				}
				{!isLoggedIn && location.pathname === '/sign-in' &&
					<Link to="/sign-up" className="registation__link">Регистрация</Link>
				}
				{!isLoggedIn && location.pathname === '/sign-up' &&
					<Link to="/sign-in" className="registation__link">Вoйти</Link>
				}
			</div>
		</header>
	)
};

export default Header;