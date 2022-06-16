import { Link } from "react-router-dom";
import logoPath from "../images/logo.svg"
function Header({ isLoggedIn, userEmail }) {
	return (
		<header className="header">
			<img className="header__logo" src={logoPath} alt="Логотип" />
			<div className="header__login-info">
				{isLoggedIn ?
					<>
						<p>{userEmail}</p>
						<Link to="/sign-up" className="registation__link">Выйти</Link>
					</>
					: <Link to="/sign-in" className="registation__link">Вoйти</Link>
				}

			</div>
		</header>
	)
};

export default Header;