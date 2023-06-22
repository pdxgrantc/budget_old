import React, { useEffect, useState } from 'react'

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'

export default function PastTransactions() {
    const [user] = useAuthState(auth)
    const [transactions, setTransactions] = useState([])

    // pull the last 50 transactions from the database at /users/{user.uid}/transactions
    const useEffect(() => {
        const unsubscribe = db
            .collection('users')
            .doc(user.uid)
            .collection('transactions')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .onSnapshot((snapshot) => {
                setTransactions(snapshot.docs.map((doc) => doc.data()))
            })

        return unsubscribe
    }, [])
    
    if (user) {
        return (
            <div>PastTransactions</div>
        )
    }
}
