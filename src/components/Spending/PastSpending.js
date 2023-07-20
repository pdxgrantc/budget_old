import React, { useEffect, useState } from 'react'

// Firebase
import { setDoc, onSnapshot, collection, query, orderBy, doc, deleteDoc, limit, getDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import DeleteButton from '../Helpers/DeleteButton';

export default function PastSpending() {
    const [user] = useAuthState(auth);
    const [spending, setSpending] = useState([]);
    const [numSpendingDisplayed, setNumSpendingDisplayed] = useState(50);
    const [totalSpending, setTotalSpending] = useState(0);
    const [userDoc, setUserDoc] = useState(null);
    const [sortToggle, setSortToggle] = useState('desc');
    const [spendingCategory, setSpendingCategory] = useState('');
    const [validCategory, setValidCategory] = useState(true); // Track if the selected category has valid documents


    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users', user.uid, 'spending'),
                orderBy('date', sortToggle),
                ...(spendingCategory ? [where('category', '==', spendingCategory)] : []),
                limit(numSpendingDisplayed)
            ),
            (snapshot) => {
                if (snapshot.empty) {
                    setSpending([]);
                    setValidCategory(false); // Set validCategory to false if no valid documents found
                } else {
                    setSpending(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    setValidCategory(true); // Set validCategory to true if valid documents found
                }
            }
        );
        return () => {
            unsubscribe();
        };
    }, [user, numSpendingDisplayed, sortToggle, spendingCategory]);

    useEffect(() => {
        // pull all spending from user document
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'spending')), (snapshot) => {
            setTotalSpending(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'users', user.uid, 'spending')), (snapshot) => {
            setTotalSpending(snapshot.docs.length);
        });
        return () => {
            unsubscribe();
        };
    }, [user, user.uid]);

    const handleDeleteSpending = async (id) => {
        // get spending reference
        const spendingRef = doc(db, 'users', user.uid, 'spending', id);

        // Confirm deletion with user
        if (window.confirm('Are you sure you want to delete this spending?')) {
            try {
                // pull spending document
                const spendingDoc = await getDoc(spendingRef);

                // add spending amount to current balance
                const newBalance = userDoc.currentBalance + spendingDoc.data().amount;

                console.log("Current Balance: ", userDoc.currentBalance);
                console.log("Spending Amount: ", spendingDoc.data().amount);

                console.log("New Balance: ", newBalance);


                // update user document with new balance
                await setDoc(doc(db, 'users', user.uid), { currentBalance: newBalance }, { merge: true }).then(() => {
                    // delete spending document
                    deleteDoc(spendingRef);
                });

                console.log('newBalance', newBalance);
            } catch (error) {
                // handle error if any
                console.error('Error retrieving spending document:', error);
            }
        }
    };


    const handleLoadMoreSpending = () => {
        setNumSpendingDisplayed(numSpendingDisplayed + 50);
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
                {userDoc && userDoc.spendingTypes !== null ? (
                    <div className='flex flex-col gap-[.65rem]'>
                        <div>
                            <h2 className="on_desktop:text-header on_mobile:text-large font-semibold">Spending:</h2>
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
                                            id="spendingCategory"
                                            name="spendingCategory"
                                            value={spendingCategory}
                                            onChange={(e) => setSpendingCategory(e.target.value)}
                                            className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                            <option value="">All Categories</option>
                                            {userDoc.spendingTypes.map((spendingType, index) => (
                                                <option key={index} value={spendingType}>
                                                    {spendingType}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='on_mobile:w-full on_mobile:overflow-x-auto'>
                            <div className='on_mobile:inline-flex'>
                                {spending.length === 0 ? (
                                    validCategory ? (
                                        <div>You haven't added any spending yet.</div>
                                    ) : (
                                        <div>No spending found for the selected category</div>
                                    )
                                ) : (
                                    <div className="grid grid-cols-custom-2 gap-4 w-fit">
                                        <div className="">
                                            <br />
                                            {spending.map((spend, index) => (
                                                <p key={index} className='whitespace-nowrap'>{index + 1}.</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Name</h5>
                                            {spending.map((spend, index) => (
                                                <p key={index} className='whitespace-nowrap'>{spend.name}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Business</h5>
                                            {spending.map((spend, index) => (
                                                <p key={index} className='whitespace-nowrap'>{spend.business}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Ammount</h5>
                                            {/* Column 3: Amount */}
                                            {spending.map((spend, index) => (
                                                <p key={index} className='whitespace-nowrap'>${parseFloat(spend.amount).toFixed(2)}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Category</h5>
                                            {spending.map((spend, index) => (
                                                <p key={index} className='whitespace-nowrap'>{spend.category}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <h5 className='whitespace-nowrap font-semibold'>Date</h5>
                                            {spending.map((spend, index) => (
                                                <p key={index}>{spend.date.toDate().toLocaleDateString('en-US')}</p>
                                            ))}
                                        </div>
                                        <div className="">
                                            <br />
                                            {spending.map((spend, index) => (
                                                <div key={index}>
                                                    <button onClick={() => handleDeleteSpending(spend.id)}>
                                                        <DeleteButton />
                                                    </button>
                                                    <br />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {numSpendingDisplayed < totalSpending ? (
                                <button
                                    onClick={handleLoadMoreSpending}
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
