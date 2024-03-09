import { NavLink } from 'react-router-dom';
import './Toolbar.css';

const Toolbar = () => {
    return (
        <nav className='main-nav'>
            <ul>
                <li>
                    <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'active-link' : 'link'}>Категории</NavLink>
                </li>
                <li>
                    <NavLink to={'/add-transaction'} className={({ isActive }) => isActive ? 'active-link' : 'link'}>Добавить</NavLink>
                </li>
            </ul>                       
        </nav>
    );
};

export default Toolbar;