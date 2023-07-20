import React, { useState, useEffect } from 'react'

// Firebase
import { onSnapshot, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'
import { Link } from 'react-router-dom';

export default function AddSpending() {
    const [spendingName, setSpendingName] = useState('');
    const [spendingBusinessName, setSpendingBusinessName] = useState('');
    const [spendingAmount, setSpendingAmount] = useState('');
    const [spendingCategory, setSpendingCategory] = useState('');
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

    // add spendingInstance to collection within user document called spending
    const addSpending = async (e) => {
        e.preventDefault();

        // check if ammount or name is empty
        if (spendingAmount === '' || spendingName === '' || spendingCategory === '' || (!selectedDate)) {
            alert('Please enter a name, category, amount, and date for your spending.');
            return;
        }

        // store the date in format mm/dd/yyyy
        var dateCache = selectedDate.split('-');
        var month = dateCache[1];
        var day = dateCache[2];
        var year = dateCache[0];
        var dateTimestamp = new Date(year, month - 1, day);

        const spendingInstance = {
            name: spendingName,
            business: spendingBusinessName,
            amount: Number(spendingAmount),
            category: spendingCategory,
            dateCreated: currentDate,
            date: dateTimestamp,
        };

        const docRef = doc(db, 'users', user.uid, 'spending', currentDate.toString());
        await setDoc(docRef, spendingInstance);

        // set currentBalance in user document to new balance which is old balance - new spending amount
        const newBalance = userDoc.currentBalance - Number(spendingAmount);
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { currentBalance: newBalance }, { merge: true });


        // clear form
        setSpendingName('');
        setSpendingBusinessName('');
        setSpendingAmount('');
        setSpendingCategory('');
        setSelectedDate('');
    };

    const ClearForm = () => {
        setSpendingName('');
        setSpendingBusinessName('');
        setSpendingAmount('');
        setSpendingCategory('');
        setSelectedDate('');
    };


    return (
        <div className='flex flex-col gap-3'>
            <h2 className='on_desktop:text-header on_mobile:text-large font-semibold'>
                Add New Spending
            </h2>
            {userDoc && userDoc.spendingTypes !== null ? (
                <form className='flex flex-col gap'>
                    <div className='grid on_desktop:grid-cols-2 w-fit gap-y-4 gap-x-5 font-semibold'>
                        <div className='flex gap-3 flex-nowrap'>
                            <label className='on_mobile:hidden' htmlFor="spendingName">Name:</label>
                            <input
                                type="text"
                                id="spendingName"
                                placeholder='Name'
                                name="spendingName"
                                value={spendingName}
                                onChange={(e) => setSpendingName(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label className='on_mobile:hidden' htmlFor="spendingBusiness">Business:</label>
                            <input
                                type="text"
                                id="spendingBusiness"
                                placeholder='Business Name (optional)'
                                name="spendingBusiness"
                                value={spendingBusinessName}
                                onChange={(e) => setSpendingBusinessName(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div className='flex gap-3 flex-nowrap'>
                            <label className='on_mobile:hidden' htmlFor="spendingAmount">Amount:</label>
                            <input
                                type="number"
                                id="spendingAmount"
                                placeholder='Amount'
                                name="spendingAmount"
                                value={spendingAmount}
                                onChange={(e) => setSpendingAmount(e.target.value)}
                                className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'
                            />
                        </div>
                        <div>
                            <div className='flex flex-nowrap gap-3'>
                                <label className='on_mobile:hidden' htmlFor="date">Select Date:</label>
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
                                <label className='on_mobile:hidden' htmlFor="spendingCategory">Category:</label>
                                <select
                                    id="spendingCategory"
                                    name="spendingCategory"
                                    value={spendingCategory}
                                    onChange={(e) => setSpendingCategory(e.target.value)}
                                    className='outline-none rounded-md text-black px-2 py-[0.125rem] font-normal text-xsmall h-fit'>
                                    <option value="">Select a Category</option>
                                    {userDoc.spendingTypes.map((spendingType, index) => (
                                        <option key={index} value={spendingType}>
                                            {spendingType}
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
                        <button type="submit" onClick={addSpending} className='border-b-[2px] hover:bg-menu_button_hover hover:px-5 py-1 hover:rounded-button font-semibold transition-all duration-300 ease-cubic-bezier'>
                            Add Spending
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
