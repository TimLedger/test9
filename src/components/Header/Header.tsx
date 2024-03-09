import { NavLink } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import './Header.css';

const Header = () => {
    return (
        <header className='header'>
            <div className="container">
                <div className="header-inner">
                    <NavLink className={'logo'} to="/" end>
                        <h3>Финансы</h3>
                    </NavLink>
                    <Toolbar />
                </div>
            </div>
        </header>
    );
};

export default Header;
