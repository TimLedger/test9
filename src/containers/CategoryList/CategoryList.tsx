import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categoryList } from "../../store/categoriesThunk";
import { Link, Outlet } from 'react-router-dom';
import Preloader from "../../components/Preloader/Preloader";
import './CategoryList.css';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  return (
    <div>
      <div className="menu-inner">
          <h3 className="menu-title">Категории</h3>
          <Link to="/categories/add-categories" className="menu-add">Добавить категорию</Link>
      </div>
      {loading.getLoading ? (
        <Preloader />
      ) : (
        <ul>
          {categories.length < 1 ? (
            <h2>Категорий еще нет!</h2>
          ) : (
            categories.map((dish) => (
              <li key={dish.id} className="dish-item">
                <h3 className="dish-name">{dish.name}</h3>
                <div className="dish-item-inner">
                  <span className="dish-type">{dish.type}</span>
                  <div className="dish-btns">
                    <Link className="dish-btn" to={'/admin/' + dish.id + '/edit'}>Изменить</Link>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default CategoryList;