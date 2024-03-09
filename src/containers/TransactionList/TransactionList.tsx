import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { transactionDelete, transactionList } from "../../store/transactionsThunk";
import { categoryList } from "../../store/categoriesThunk";
import { Link, Outlet } from 'react-router-dom';
import Preloader from "../../components/Preloader/Preloader";
import BtnPreloader from "../../components/Preloader/BtnPreloader";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const categories = useAppSelector((state) => state.categories.categories); 
  const loading = useAppSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(transactionList());
    dispatch(categoryList());
  }, [dispatch]);

  const deleteCategory = async (id: string) => {
    if (confirm('Вы точно хотите удалить эту транзакцию?')) {
      await dispatch(transactionDelete(id));
      await dispatch(transactionList());
    }
  };

  return (
    <div>
      <div className="menu-inner">
          <h3 className="menu-title">Транзакции</h3>
          <span className="total-sum">Итог</span>
      </div>
      {loading.getLoading ? (
        <Preloader />
      ) : (
        <ul className="transaction-list">
          {transactions.length < 1 ? (
            <h2>Транзакций еще нет!</h2>
          ) : (
            transactions.map((transaction) => {
              const category = categories.find((category) => transaction.category === category.id);
              return (
                <li key={transaction.id} className="transaction-item">                  
                  <div className="transaction-btns">
                    <h3 className="transaction-name">{category ? category.name : ''}</h3>
                    <span className="transaction-time">{transaction.time}</span>
                  </div>
                  <div className="transaction-item-inner">
                    <span className="transaction-type">{transaction.amount}</span>
                    <div className="transaction-btns">
                      <Link className="transaction-btn" to={'/categories/' + transaction.id + '/edit'}>Изменить</Link>
                      <button className="transaction-btn delete-btn" onClick={() => deleteCategory(transaction.id)}>
                        {loading.deleteLoading ? <BtnPreloader /> : 'Удалить'}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      )}
      <Outlet />
    </div>
  );
};

export default TransactionList;