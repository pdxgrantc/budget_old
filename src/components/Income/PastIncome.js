import React, { useEffect, useState } from 'react'

// Firebase
import { onSnapshot, collection, query, orderBy, doc, deleteDoc, limit, getDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import { FaRegTrashAlt as TrashIcon } from 'react-icons/fa'

export default function PastIncome() {
    const [user] = useAuthState(auth);
    const [income, setIncome] = useState([]);
    const [numIncomeDisplayed, setNumIncomeDisplayed] = useState(50);
    const [totalIncome, setTotalIncome] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const [sortToggle, setSortToggle] = useState('desc');
    const [incomeCategory, setIncomeCategory] = useState('');
    const [validCategory, setValidCategory] = useState(true); // Track if the selected category has valid documents

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users', user.uid, 'income'),
                orderBy('date', sortToggle),
                ...(incomeCategory ? [where('category', '==', incomeCategory)] : []),
                limit(numIncomeDisplayed)
            ),
            (snapshot) => {
                if (snapshot.empty) {
                    setIncome([]);
                    setValidCategory(false); // Set validCategory to false if no valid documents found
                } else {
                    setIncome(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setValidCategory(true); // Set validCategory to true if valid documents found
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, [user, numIncomeDisplayed, sortToggle, incomeCategory]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'income')), (snapshot) => {
            setTotalIncome(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    const handleDeleteIncome = async (id) => {
        const incomeRef = doc(db, 'users', user.uid, 'income', id);
        // Confirm deletion with user
        if (window.confirm('Are you sure you want to delete this income?')) {
            await deleteDoc(incomeRef);
        }
    };

    const handleLoadMoreIncome = () => {
        setNumIncomeDisplayed(numIncomeDisplayed + 50);
    };

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
                {userDoc && userDoc.incomeSources !== null ? (
                    <>
                        <div className='flex flex-col gap-[.65rem]'>
                            <div>
                                <h2 className="text-header font-semibold">Income:</h2>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold text-large'>Sort by:</h3>
                                    <div className='flex gap-6'>
                                        <div className='flex gap-3'>
                                            <h4 className='font-semibold text-small'>Date:</h4>
                                            <div className='flex gap-3'>
                                                <button
                                                    onClick={() => setSortToggle('desc')}
                                                    className='h-fit on_mobile:hidden border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit hover:rounded-button transition-all duration-300 ease-cubic-bezier'>
                                                    Newest
                                                </button>
                                                <button
                                                    onClick={() => setSortToggle('asc')}
                                                    className='h-fit on_mobile:hidden border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit hover:rounded-button transition-all duration-300 ease-cubic-bezier'>
                                                    Oldest
                                                </button>
                                            </div>
                                        </div>
                                        <div className='flex gap-3'>
                                            <h4 className='font-semibold text-small'>Category:</h4>

                                            <select
                                                id='incomeCategory'
                                                name='incomeCategory'
                                                value={incomeCategory}
                                                onChange={(e) => setIncomeCategory(e.target.value)}
                                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                                <option value="">All Categories</option>
                                                {userDoc.incomeSources.map((source, index) => (
                                                    <option key={index} value={source}>{source}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    {income.length === 0 ? (
                                        validCategory ? (
                                            <div>You haven't added any Income yet</div>
                                        ) : (

                                            <div>No income found for the selected category</div>
                                        )
                                    ) : (
                                        <>
                                            {income.map((income, index) => (
                                                <div key={index} className="flex gap-4">
                                                    <p>{index + 1}.</p>
                                                    <p>{income.name}</p>
                                                    <p>${parseFloat(income.amount).toFixed(2)}</p>
                                                    <p>{income.category}</p>
                                                    <p>{income.date.toDate().toLocaleDateString('en-US')}</p>
                                                    <button onClick={() => handleDeleteIncome(income.id)}>
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </div>
                                {numIncomeDisplayed < totalIncome ? (
                                    <button
                                        onClick={handleLoadMoreIncome}
                                        className="hover:bg-menu_button_hover hover:px-5 py-1 rounded-button font-semibold transition-all duration-300 ease-cubic-bezier"
                                    >
                                        Load More
                                    </button>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )
                }
            </>
        )
    } else {
        return (
            <></>
        )
    }
}
