import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import TransactionList from './containers/TransactionList/TransactionList';
import CategoryList from './containers/CategoryList/CategoryList';
import TransactionForm from './components/TransactionForm/TransactionForm';
import CategoryForm from './components/CategoryForm/CategoryForm';
import NotFound from './containers/NotFound/NotFound';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <Header  />
      <div className="container">
        <div className="page-body">
          <Routes>
            <Route path="/" element={<TransactionList />}>
              <Route path="add-transaction" element={<TransactionForm />} />
              <Route path="transaction/:id/edit" element={<TransactionForm />} />
            </Route>
            <Route path="/categories" element={<CategoryList />} >
              <Route path="add-categories" element={<CategoryForm />} />
              <Route path="categories/:id/edit" element={<CategoryForm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;