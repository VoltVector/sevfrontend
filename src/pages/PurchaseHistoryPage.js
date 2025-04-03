import React, { useEffect, useState } from 'react';

function PurchaseHistoryPage() {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('purchaseHistory');
    if (savedHistory) {
      setPurchaseHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="purchase-history-page">
      <header
        className="purchase-history-header"
        style={{
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 className="text-4xl font-bold">Purchase History</h1>
        <p className="text-lg mt-2">Review all your purchased items below.</p>
      </header>

      <main className="purchase-history-main" style={{ padding: '2rem' }}>
        {purchaseHistory.length === 0 ? (
          <p>No purchases yet.</p>
        ) : (
          <ul className="purchase-list" style={{ listStyle: 'none', padding: 0 }}>
            {purchaseHistory.map((purchase, index) => (
              <li
                key={index}
                className="purchase-item"
                style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  background: 'white',
                }}
              >
                <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {purchase.flowerName}
                </p>
                <p style={{ color: '#666', marginTop: '0.5rem' }}>
                  Price: ${purchase.price}
                </p>
                <p style={{ color: '#999', marginTop: '0.5rem' }}>
                  Date: {new Date(purchase.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default PurchaseHistoryPage;
