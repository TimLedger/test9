import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import { transactionAdd, transactionEdit, transactionOne, transactionList } from "../../store/transactionsThunk";
import {Transaction} from '../../types';
import Preloader from '../Preloader/Preloader';
import './TransactionForm.css';
import { categoryList } from '../../store/categoriesThunk';

const TransactionForm: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const transaction = useAppSelector(state => state.transactions.transaction);
  const categories = useAppSelector(state => state.categories.categories);
  const loading = useAppSelector(state => state.categories);
  const dispatch = useAppDispatch();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState('');
  const categoriesArr = categories.filter((category) => category.type === selectedType);
  const [filling, setFilling] = useState<Transaction>({
    type: '',
    category: '',
    amount: 0,
    time: '',
  });

  useEffect(() => {
    dispatch(categoryList());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      dispatch(transactionOne(params.id));
      setEditMode(true);
    } else {
      setFilling({
        type: '',
        category: '',
        amount: 0,
        time: '',
      });
      setEditMode(false);
    }
  }, [dispatch, params.id]);

  useEffect(() => {
      if (editMode && transaction) {
      setFilling(transaction);
      }
  }, [editMode, transaction]);

  const transactionChanged = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      const { name, value } = event.target;
      setFilling(prevState => ({
          ...prevState,
          [name]: value,
      }));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountChanged = filling.type === 'Доход' ? +(filling.amount) : -(filling.amount);
    if (params.id) {
      const transactionData = {
        type: filling.type,
        category: filling.category,
        amount: amountChanged,
        time: filling.time,
      };
      await dispatch(transactionEdit({ id: params.id, data: transactionData }));
    } else {
      const creatTime = new Date().toISOString(); 
      const transactionData = {
        type: filling.type,
        category: filling.category,
        amount: amountChanged,
        time: creatTime,
      };
      await dispatch(transactionAdd(transactionData));
    }
    await dispatch(transactionList());
    navigate('/');
  };

  return (
    <div>
      <div className='modal'>
        <div className='modal-top'>
          <Link className='modal-close' to="/"></Link>
        </div>
        <form onSubmit={onFormSubmit} autoComplete="off" className="form">
          <div className='form-content'>
            <div className='form-inputs'>
              <select
                id="type"
                name="type"
                value={filling.type}
                onChange={(e) => {
                    transactionChanged(e);
                    setSelectedType(e.target.value);
                }}
                className="form-input"
                required
              >
              <option className="form-option" value="">Выберите тип</option>
              <option className="form-option" value="Доход">Доход</option>
              <option className="form-option" value="Расход">Расход</option>
              </select>
              <select
                id="category"
                name="category"
                value={filling.category}
                onChange={transactionChanged}
                className="form-input"
                required
              >
              <option className="form-option" value="">Выберите Категорию</option>
                {categoriesArr.map((category) => (
                    <option key={category.id} value={category.id} className="form-option">
                        {category.name}
                    </option>
                ))}
              </select>
              <div className='input-price'>
                <input
                  id="amount"
                  type="number"
                  name="amount"
                  value={filling.amount}
                  onChange={transactionChanged}
                  className="form-input"
                  placeholder='Категория'
                  required
                  min={0}
                />
                <span className="input-currency">KGS</span>
              </div>
            </div>
          </div>
          { loading.postLoading || loading.editLoading ? (<Preloader />) : (
            <div className='form-bottom'>
              <button type="submit" className='form-btn'>
                {params.id ? 'Сохранить изменения' : 'Создать транзакцию'}
              </button>                  
            </div>
          )}
        </form>
      </div>
      <Link className='modal-backdrop' to="/"></Link>
    </div>
  );
};

export default TransactionForm;