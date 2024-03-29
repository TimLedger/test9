import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { transactionDelete, transactionList } from "../../store/transactionsThunk";
import { categoryList } from "../../store/categoriesThunk";
import { Link, Outlet } from 'react-router-dom';
import Preloader from "../../components/Preloader/Preloader";
import BtnPreloader from "../../components/Preloader/BtnPreloader";
import dayjs from "dayjs";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.transactions);
  const categories = useAppSelector((state) => state.categories.categories); 
  const loading = useAppSelector((state) => state.transactions);

  const total = transactions.reduce((acc, transaction) => {
    acc += transaction.amount;
    return acc;
  }, 0);

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
          <span className="total-sum" style={{borderColor: total > 0 ? "#369f16" : "#ff0000", color: total > 0 ? "#369f16" : "#ff0000"}}>{total} KGS</span>
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
                    <span className="transaction-time">{dayjs(transaction.time).format('DD.MM.YYYY HH:mm:ss')}</span>
                  </div>
                  <div className="transaction-item-inner">
                    <span className="transaction-type" style={{color: transaction.type === 'Доход' ? "#369f16" : "#ff0000"}}>{transaction.amount} KGS</span>
                    <div className="transaction-btns">
                      <Link className="transaction-btn" to={'/transaction/' + transaction.id + '/edit'}>Изменить</Link>
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