import React, { useState, useEffect } from 'react'

// Firebase
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { Link } from 'react-router-dom';

export default function AddNewTransaction() {
    const [transactionName, setTransactionName] = useState('');
    const [transactionBusinessName, setTransactonBusinessName] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const [userDoc, setUserDoc] = useState(null);

    // get user document via async/await
    const [user] = useAuthState(auth)

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

    // add transaction to collection within user document called transactions
    const addTransaction = async (e) => {
        e.preventDefault();

        // check if ammount or name is empty
        if (transactionAmount === '' || transactionName === '' || transactionCategory === '' || (!selectedDate)) {
            alert('Please enter a name, category, amount, and date for the transaction');
            return;
        }

        // store the date in format mm/dd/yyyy
        var dateCache = selectedDate.split('-');
        var month = dateCache[1];
        var day = dateCache[2];
        var year = dateCache[0];
        var dateTimestamp = new Date(year, month - 1, day);

        const transaction = {
            name: transactionName,
            business: transactionBusinessName,
            amount: transactionAmount,
            category: transactionCategory,
            dateCreated: currentDate,
            transactionDate: dateTimestamp,
        };

        const docRef = doc(db, 'users', user.uid, 'transactions', currentDate.toString());
        await setDoc(docRef, transaction);

        // clear form
        setTransactionName('');
        setTransactonBusinessName('');
        setTransactionAmount('');
        setTransactionCategory('');
        setSelectedDate('');
    };

    const ClearForm = () => {
        setTransactionName('');
        setTransactonBusinessName('');
        setTransactionAmount('');
        setTransactionCategory('');
        setSelectedDate('');
    };


    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-header font-semibold'>
                Add a New Transaction
            </h2>
            {userDoc && userDoc.transactionTypes !== null ? (
                <form className='flex flex-col gap'>
                    <div className='grid on_desktop:grid-cols-2 w-fit gap-y-4 gap-x-5 font-semibold'>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor="transactionName">Name:</label>
                            <input
                                type="text"
                                id="transactionName"
                                placeholder='Transaction Name'
                                name="transactionName"
                                value={transactionName}
                                onChange={(e) => setTransactionName(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor="transactionName">Business:</label>
                            <input
                                type="text"
                                id="transactionLocation"
                                placeholder='Business Name (optional)'
                                name="transactionLocation"
                                value={transactionBusinessName}
                                onChange={(e) => setTransactonBusinessName(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor="transactionAmount">Amount:</label>
                            <input
                                type="number"
                                id="transactionAmount"
                                placeholder='Transaction Amount'
                                name="transactionAmount"
                                value={transactionAmount}
                                onChange={(e) => setTransactionAmount(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div>
                            <div className='flex flex-nowrap gap-3'>
                                <label htmlFor="date">Select Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className='rounded-md outline-none text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                                />
                            </div>
                        </div>
                        <div>
                            <div className='flex gap-3 flex-nowrap'>
                                <label htmlFor="transactionCategory">Category:</label>
                                <select
                                    id="transactionCategory"
                                    name="transactionCategory"
                                    value={transactionCategory}
                                    onChange={(e) => setTransactionCategory(e.target.value)}
                                    className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                    <option value="">Select a Category</option>
                                    {userDoc.transactionTypes.map((transactionType, index) => (
                                        <option key={index} value={transactionType}>
                                            {transactionType}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Link
                                to='/account-settings'
                                className='text-xxsmall border-b-[1px] font-[400] hover:bg-menu_button_hover hover:px-3 py-[2px] w-fit transition-all duration-300 ease-cubic-bezier'>
                                <button >
                                    Add New Category
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='flex gap'>
                        <button type="submit" onClick={addTransaction} className='border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-1 hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>
                            Add Transaction
                        </button>
                        <button type="reset" onClick={ClearForm} className='border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-1 hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>
                            Clear Form
                        </button>
                    </div>
                </form>
            ) : (
                <></>
            )}
        </div>
    )
}
