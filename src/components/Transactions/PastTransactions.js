import React, { useEffect, useState } from 'react'

// Firebase
import { setDoc, onSnapshot, collection, query, orderBy, doc, deleteDoc, limit, getDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import DeleteButton from '../Helpers/DeleteButton';

export default function PastTransactions() {
    const [user] = useAuthState(auth);
    const [transactions, setTransactions] = useState([]);
    const [numTransactionsDisplayed, setNumTransactionsDisplayed] = useState(50);
    const [totalTransactions, setTotalTransactions] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const [sortToggle, setSortToggle] = useState('desc');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [validCategory, setValidCategory] = useState(true); // Track if the selected category has valid documents


    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users', user.uid, 'transactions'),
                orderBy('date', sortToggle),
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
        // pull all transactions from user document
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'transactions')), (snapshot) => {
            setTotalTransactions(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'transactions')), (snapshot) => {
            setTotalTransactions(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    const handleDeleteTransaction = async (id) => {
        // get transaction reference
        const transactionRef = doc(db, 'users', user.uid, 'transactions', id);

        // Confirm deletion with user
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                // pull transaction document
                const transactionDoc = await getDoc(transactionRef);

                // add transaction amount to current balance
                const newBalance = userDoc.currentBalance + transactionDoc.data().amount;

                console.log("Current Balance: ", userDoc.currentBalance);
                console.log("Transaction Amount: ", transactionDoc.data().amount);

                console.log("New Balance: ", newBalance);


                // update user document with new balance
                await setDoc(doc(db, 'users', user.uid), { currentBalance: newBalance }, { merge: true }).then(() => {
                    // delete transaction document
                    deleteDoc(transactionRef);
                });

                console.log('newBalance', newBalance);
            } catch (error) {
                // handle error if any
                console.error('Error retrieving transaction document:', error);
            }
        }
    };


    const handleLoadMoreTransactions = () => {
        setNumTransactionsDisplayed(numTransactionsDisplayed + 50);
    };

    useEffect(() => {
        let unsubscribe;

        const getUserDoc = async () => {
            const docRef = doc(db, 'users', user.uid);
            unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    setUserDoc(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            });
        };

        if (user) {
            getUserDoc();
        }

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [user, user.uid]);


    if (user) {
        return (
            <>
                {userDoc && userDoc.transactionTypes !== null ? (
                    <div className='flex flex-col gap-[.65rem]'>
                        <div>
                            <h2 className="on_desktop:text-header on_mobile:text-large font-semibold">Transactions:</h2>
                            <div className='flex flex-col'>
                                <h3 className='on_mobile:hidden font-semibold text-large'>Sort by:</h3>
                                <div className='flex gap-6 flex-wrap'>
                                    <div className='flex gap-3'>
                                        <h4 className='on_mobile:hidden font-semibold text-small'>Date:</h4>
                                        <div className='flex gap-3'>
                                            <button
                                                onClick={() => setSortToggle('desc')}
                                                className='h-fit border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit hover:rounded-button transition-all duration-300 ease-cubic-bezier'>
                                                Newest
                                            </button>
                                            <button
                                                onClick={() => setSortToggle('asc')}
                                                className='h-fit border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit hover:rounded-button transition-all duration-300 ease-cubic-bezier'>
                                                Oldest
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex gap-3'>
                                        <h4 className='on_mobile:hidden font-semibold text-small'>Category:</h4>
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
                            </div>
                        </div>
                        <div className='on_mobile:w-full on_mobile:overflow-x-auto'>
                            <div className='on_mobile:inline-flex'>
                                {transactions.length === 0 ? (
                                    validCategory ? (
                                        <div>You haven't added any transactions yet</div>
                                    ) : (
                                        <div>No transactions found for the selected category</div>
                                    )
                                ) : (
                                    <div className="grid grid-cols-custom-2 gap-4 w-fit">
                                        <div className="">
                                            <br />
                                            {transactions.map((income, index) => (
                                                <p key={index} className='whitespace-nowrap'>{index + 1}.</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Name</h5>
                                            {transactions.map((income, index) => (
                                                <p key={index} className='whitespace-nowrap'>{income.name}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Business</h5>
                                            {transactions.map((income, index) => (
                                                <p key={index} className='whitespace-nowrap'>{income.business}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Ammount</h5>
                                            {/* Column 3: Amount */}
                                            {transactions.map((income, index) => (
                                                <p key={index} className='whitespace-nowrap'>${parseFloat(income.amount).toFixed(2)}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Category</h5>
                                            {transactions.map((income, index) => (
                                                <p key={index} className='whitespace-nowrap'>{income.category}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Date</h5>
                                            {transactions.map((income, index) => (
                                                <p key={index}>{income.date.toDate().toLocaleDateString('en-US')}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <br />
                                            {transactions.map((income, index) => (
                                                <div key={index}>
                                                    <button onClick={() => handleDeleteTransaction(income.id)}>
                                                        <DeleteButton />
                                                    </button>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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
    } else {
        return (
            <></>
        )
    }
}
