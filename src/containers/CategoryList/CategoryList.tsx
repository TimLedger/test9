import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { categoryDelete, categoryList } from "../../store/categoriesThunk";
import { Link, Outlet } from 'react-router-dom';
import Preloader from "../../components/Preloader/Preloader";
import BtnPreloader from "../../components/Preloader/BtnPreloader";
import './CategoryList.css';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  const deleteCategory = async (id: string) => {
    if (confirm('Вы точно хотите удалить эту категорию?')) {
      await dispatch(categoryDelete(id));
      await dispatch(categoryList());
    }
  };

  return (
    <div>
      <div className="menu-inner">
          <h3 className="menu-title">Категории</h3>
          <Link to="/categories/add-categories" className="menu-add">Добавить категорию</Link>
      </div>
      {loading.getLoading ? (
        <Preloader />
      ) : (
        <ul className="category-list">
          {categories.length < 1 ? (
            <h2>Категорий еще нет!</h2>
          ) : (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <h3 className="category-name">{category.name}</h3>
                <div className="category-item-inner">
                  <span className="category-type">{category.type}</span>
                  <div className="category-btns">
                    <Link className="category-btn" to={'/categories/' + category.id + '/edit'}>Изменить</Link>
                    <button className="category-btn delete-btn" onClick={() => deleteCategory(category.id)}>
                      {loading.deleteLoading ? <BtnPreloader /> : 'Удалить'}
                    </button>
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