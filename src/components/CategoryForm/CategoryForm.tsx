import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { categoryAdd } from "../../store/categoriesThunk";
import Preloader from '../../components/Preloader/Preloader';
import { Category } from '../../types';
import './CategoryForm.css';

const CategoryForm = () => {
  const navigate = useNavigate();
  const loading = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
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

  const categoryChanged = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilling(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const categoryId = russianToTranslit(filling.name).toLowerCase().replace(/\s+/g, '-');
    await dispatch(categoryAdd({ id: categoryId, data: filling }));
    
    navigate('/categories');
  };

  return (
    <div>
      <div className='modal'>
        <div className='modal-top'>
          <Link className='modal-close' to="/categories">
            закрыть
          </Link>
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
              <option value="">Выберите тип</option>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
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
          { loading.postLoading ? (<Preloader />) : (
            <div className='form-bottom'>
              <button type="submit" className='form-btn'>Создать Категорию</button>                  
            </div>
          )}
        </form>
      </div>
      <Link className='modal-backdrop' to="/categories"></Link>
    </div>
  );
};

export default CategoryForm;