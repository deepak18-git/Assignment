import { useState, useEffect, useMemo } from 'react';
import getData from './api';
import { calculateResult } from './utils';
import Table from './components/Table';

const App = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'name'
      },
      {
        Header: 'Month',
        accessor: 'month'
      },
      {
        Header: 'Number of Transactions',
        accessor: 'numTransactions'
      },
      {
        Header: 'Reward Points',
        accessor: 'points'
      }
    ],
    []
  );

  const totalsByColumns = useMemo(
    () => [
      {
        Header: 'Customer',
        accessor: 'name'
      },
      {
        Header: 'Points',
        accessor: 'points'
      }
    ],
    []
  );

  const [transaction, setTransaction] = useState(null);
  const [summaryByCustomer, setSummaryByCustomer] = useState(null);
  const [totalPointsByCustomer, setTotalPointsByCustomer] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getData();
      const results = calculateResult(res);
      setTransaction(results);
      setSummaryByCustomer(results.summaryByCustomer);
      setTotalPointsByCustomer(results.totalPointsByCustomer);
    })();
  }, []);

  return transaction === null ? (
    <div>Loading...</div>
  ) : (
    <div className="mt-5 d-flex flex-column align-items-center">
      <div>
        <div className="row m-5">
          <h2>Points Rewards System Totals by Customer Months</h2>
        </div>
        <div className="row">
          {summaryByCustomer && (
            <Table columns={columns} data={summaryByCustomer} />
          )}
        </div>
      </div>
      <div className='mt-5'>
        <div className="row">
          <h2>Points Rewards System Totals by Customer</h2>
        </div>
        <div className="row m-5">
          {totalPointsByCustomer && (
            <Table columns={totalsByColumns} data={totalPointsByCustomer} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
