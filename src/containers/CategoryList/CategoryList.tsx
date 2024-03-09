import { Link, Outlet } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {

  return (
    <div>
      <div className="menu-inner">
          <h3 className="menu-title">Категории</h3>
          <Link to="/categories/add-categories" className="menu-add">Добавить категорию</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default CategoryList;