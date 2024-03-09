import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { categoryAdd, categoryEdit, categoryOne, categoryList } from "../../store/categoriesThunk";
import Preloader from '../../components/Preloader/Preloader';
import { Category } from '../../types';
import './CategoryForm.css';

const CategoryForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const category = useAppSelector(state => state.categories.category);
  const loading = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [filling, setFilling] = useState<Category>({
    type: '',
    name: '',
  });
  const russianToTranslit = (text: string) => {
    const rusToEngMap: {[key: string]: string} = { 
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
      'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return text.split('').map(char => rusToEngMap[char] || char).join('');
  };

  useEffect(() => {
    if (params.id) {
      dispatch(categoryOne(params.id));
      setEditMode(true);
    } else {
      setFilling({
        type: '',
        name: '',
      });
      setEditMode(false);
    }
  }, [dispatch, params.id]);

  
  useEffect(() => {
      if (editMode && category) {
        setFilling(category);
      }
  }, [editMode, category]);
  
  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilling(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (params.id) {
      await dispatch(categoryEdit({ id: params.id, data: filling }));
    } else {
      const categoryId = russianToTranslit(filling.name.toLowerCase()).replace(/\s+/g, '-');
      await dispatch(categoryAdd({ id: categoryId, data: filling }));
    }
    await dispatch(categoryList());
    navigate('/categories');
  };

  return (
    <div>
      <div className='modal'>
        <div className='modal-top'>
          <Link className='modal-close' to="/categories"></Link>
        </div>
        <form onSubmit={onFormSubmit} autoComplete="off" className="form">
          <div className='form-content'>
            <div className='form-inputs'>
              <select
                id="type"
                name="type"
                value={filling.type}
                onChange={categoryChanged}
                className="form-input"
                required
              >
              <option className="form-option" value="">Выберите тип</option>
              <option className="form-option" value="Доход">Доход</option>
              <option className="form-option" value="Расход">Расход</option>
              </select>
              <input
                id="name"
                type="text"
                name="name"
                value={filling.name}
                onChange={categoryChanged}
                className="form-input"
                placeholder='Категория'
                required
              />
            </div>
          </div>
          { loading.postLoading || loading.editLoading ? (<Preloader />) : (
            <div className='form-bottom'>
              <button type="submit" className='form-btn'>
                {params.id ? 'Сохранить изменения' : 'Создать Категорию'}
              </button>                  
            </div>
          )}
        </form>
      </div>
      <Link className='modal-backdrop' to="/categories"></Link>
    </div>
  );
};

export default CategoryForm;