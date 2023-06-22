import React, { useEffect, useState } from 'react'

// Firebase
import { onSnapshot, collection, query, orderBy, doc, deleteDoc, limit } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'

export default function PastTransactions() {
    const [user] = useAuthState(auth)
    const [transactions, setTransactions] = useState([]);
    const [numTransactionsDisplayed, setNumTransactionsDisplayed] = useState(50);
    const [totalTransactions, setTotalTransactions] = useState(0);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'transactions'), limit(numTransactionsDisplayed)), (snapshot) => {
            setTransactions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        });
        return () => {
            unsubscribe();
        };
    }, [user, numTransactionsDisplayed]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'transactions')), (snapshot) => {
            setTotalTransactions(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    const handleDeleteTransaction = async (id) => {
        const transactionRef = doc(db, 'users', user.uid, 'transactions', id);
        await deleteDoc(transactionRef);
    };

    const handleLoadMoreTransactions = () => {
        setNumTransactionsDisplayed(numTransactionsDisplayed + 50);
    };


    if (user) {
        return (
            <div>
                <div>
                    <h2 className='text-sheader font-semibold'>
                        Transactions:
                    </h2>
                </div>
                <div>
                    <div>
                        {transactions.length === 0 ? <div>You haven't added any transactions yet</div>
                            :
                            <>
                                {transactions.map((transaction, index) => (
                                    <div key={transaction.id} className='flex gap-4'>
                                        <p>{index}.</p>
                                        <p>{transaction.name}</p>
                                        <p>{transaction.amount}</p>
                                        <p>{transaction.business}</p>
                                        <p>{transaction.category}</p>
                                        <p>{transaction.transactionDate}</p>
                                        <button onClick={() => handleDeleteTransaction(transaction.id)}>
                                            <TrashIcon />
                                        </button>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                    {numTransactionsDisplayed < totalTransactions ?
                        <button onClick={handleLoadMoreTransactions}>Load More</button>
                        :
                        <div></div>
                    }
                </div>
            </div>
        )
    }
}
