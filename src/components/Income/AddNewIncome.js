import React, { useState, useEffect } from 'react'

// Firebase
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { Link } from 'react-router-dom';

export default function AddNewIncome() {
    const [incomeName, setIncomeName] = useState('');
    const [IncomeAmmount, setIncomeAmmount] = useState('');
    const [IncomeCategory, setIncomeCategory] = useState('');
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const [userDoc, setUserDoc] = useState(null);

    // pull user document using subbscribe so that it updates in real time
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

    const addIncome = async (e) => {
        e.preventDefault();

        // check if ammount or name is empty
        if (IncomeAmmount === '' || incomeName === '' || IncomeCategory === '' || (!selectedDate)) {
            alert('Please enter a name, category, amount, and date for the income');
            return;
        }

        // convert date to timestamp
        var dateCache = selectedDate.split('-');
        var month = dateCache[1];
        var day = dateCache[2];
        var year = dateCache[0];
        var dateTimestamp = new Date(year, month - 1, day);

        const income = {
            name: incomeName,
            amount: IncomeAmmount,
            category: IncomeCategory,
            date: dateTimestamp,
            dateAdded: currentDate,
        };

        // add transaction to collection within user document called transactions
        await setDoc(doc(db, 'users', user.uid), {
            transactions: [...userDoc.transactions, income],
        }, { merge: true });

        // reset form
        setIncomeName('');
        setIncomeAmmount('');
        setIncomeCategory('');
        setSelectedDate('');
    };

    const ClearForm = () => {
        setIncomeName('');
        setIncomeAmmount('');
        setIncomeCategory('');
        setSelectedDate('');
    };



    return (
        <div className='flex flex-col gap-3'>
            <h2 className='text-header font-semibold'>
                Add New Income
            </h2>
            {userDoc && userDoc.incomeSources !== null ? (
                <form className='flex flex-col gap'>
                    <div className='grid on_desktop:grid-cols-2 w-fit gap-y-4 gap-x-5 font-semibold'>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor='incomeName'>Name:</label>
                            <input
                                type='text'
                                id='incomeName'
                                placeholder='Income Name'
                                name='incomeName'
                                value={incomeName}
                                onChange={(e) => setIncomeName(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor='incomeAmmount'>Ammount:</label>
                            <input
                                type='number'
                                id='incomeAmmount'
                                placeholder='Income Ammount'
                                name='incomeAmmount'
                                value={IncomeAmmount}
                                onChange={(e) => setIncomeAmmount(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor='incomeCategory'>Category:</label>
                            <select
                                id='incomeCategory'
                                name='incomeCategory'
                                value={IncomeCategory}
                                onChange={(e) => setIncomeCategory(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                <option value=''>Select a Category</option>
                                {userDoc.incomeSources.map((source) => (
                                    <option key={source} value={source}>
                                        {source}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Link
                            to='/account-settings'
                            className='border-b-[2px] on_desktop:hidden hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit font-semibold transition-all duration-300 ease-cubic-bezier'>
                            <button >
                                Add New Category
                            </button>
                        </Link>
                        <div className='flex gap-3 flex-nowrap'>
                            <label htmlFor='incomeDate'>Date:</label>
                            <input
                                type='date'
                                id='incomeDate'
                                name='incomeDate'
                                value={selectedDate}
                                onChange={handleDateChange}
                                className='rounded-md outline-none text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <Link
                            to='/account-settings'
                            className='border-b-[2px] on_mobile:hidden hover:bg-menu_button_hover hover:px-5 py-[.1rem] w-fit font-semibold transition-all duration-300 ease-cubic-bezier'>
                            <button >
                                Add New Category
                            </button>
                        </Link>
                    </div>
                    <div className='flex gap-3'>
                        <button type="submit" onClick={addIncome} className='border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-1 hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>
                            Add Income
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
