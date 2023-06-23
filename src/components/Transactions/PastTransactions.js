import React, { useEffect, useState } from 'react'

// Firebase
import { onSnapshot, collection, query, orderBy, doc, deleteDoc, limit, getDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'

export default function PastTransactions() {
    const [user] = useAuthState(auth);
    const [transactions, setTransactions] = useState([]);
    const [numTransactionsDisplayed, setNumTransactionsDisplayed] = useState(50);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [sortToggle, setSortToggle] = useState('desc');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [validCategory, setValidCategory] = useState(true); // Track if the selected category has valid documents

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users', user.uid, 'transactions'),
                orderBy('transactionDate', sortToggle),
                ...(transactionCategory ? [where('category', '==', transactionCategory)] : []),
                limit(numTransactionsDisplayed)
            ),
            (snapshot) => {
                if (snapshot.empty) {
                    setTransactions([]);
                    setValidCategory(false); // Set validCategory to false if no valid documents found
                } else {
                    setTransactions(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setValidCategory(true); // Set validCategory to true if valid documents found
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, [user, numTransactionsDisplayed, sortToggle, transactionCategory]);


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

    const [userDoc, setUserDoc] = useState(null);

    useEffect(() => {
        const getUserDoc = async () => {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUserDoc(docSnap.data());
            } else {
                console.log('No such document!');
            }
        };

        if (user) {
            getUserDoc();
        }
    }, [user, user.uid]);

    if (user) {
        return (
            <>
                {userDoc && userDoc.transactionTypes !== null ? (
                    <div>
                        <div>
                            <h2 className="text-sheader font-semibold">Transactions:</h2>
                            <div className='flex gap-3'>
                                <h3 className='font-semibold'>Sort by:</h3>
                                <button
                                    onClick={() => setSortToggle('desc')}
                                    className='h-fit on_mobile:hidden hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit rounded-button transition-all duration-300 ease-cubic-bezier'>
                                    Newest
                                </button>
                                <button
                                    onClick={() => setSortToggle('asc')}
                                    className='h-fit on_mobile:hidden hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit rounded-button transition-all duration-300 ease-cubic-bezier'>
                                    Oldest
                                </button>
                                <select
                                    id="transactionCategory"
                                    name="transactionCategory"
                                    value={transactionCategory}
                                    onChange={(e) => setTransactionCategory(e.target.value)}
                                    className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                    <option value="">All Categories</option>
                                    {userDoc.transactionTypes.map((transactionType, index) => (
                                        <option key={index} value={transactionType}>
                                            {transactionType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                {transactions.length === 0 ? (
                                    validCategory ? (
                                        <div>You haven't added any transactions yet</div>
                                    ) : (
                                        <div>No transactions found for the selected category</div>
                                    )
                                ) : (
                                    <>
                                        {transactions.map((transaction, index) => (
                                            <div key={transaction.id} className="flex gap-4">
                                                <p>{index + 1}.</p>
                                                <p>{transaction.name}</p>
                                                <p>${parseFloat(transaction.amount).toFixed(2)}</p>
                                                {transaction.business === '' ? <></> : <p>{transaction.business}</p>}
                                                <p>{transaction.category}</p>
                                                <p>{transaction.transactionDate.toDate().toLocaleDateString('en-US')}</p>
                                                <button onClick={() => handleDeleteTransaction(transaction.id)}>
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                            {numTransactionsDisplayed < totalTransactions ? (
                                <button
                                    onClick={handleLoadMoreTransactions}
                                    className="hover:bg-menu_button_hover hover:px-5 py-1 rounded-button font-semibold transition-all duration-300 ease-cubic-bezier"
                                >
                                    Load More
                                </button>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    }
}
