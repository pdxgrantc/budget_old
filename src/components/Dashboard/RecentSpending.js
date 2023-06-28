import React, { useState, useEffect } from 'react'

// Firebase
import { onSnapshot, query, collection, where, Timestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import LineGraph from '../Helpers/LineGraph'

export default function RecentSpending() {
  const [user] = useAuthState(auth)

  const [todaySpending, setTodaySpending] = useState(0)
  const [yesterdaySpending, setYesterdaySpending] = useState(0)
  const [twoDaysAgoSpending, setTwoDaysAgoSpending] = useState(0)
  const [threeDaysAgoSpending, setThreeDaysAgoSpending] = useState(0)
  const [fourDaysAgoSpending, setFourDaysAgoSpending] = useState(0)
  const [fiveDaysAgoSpending, setFiveDaysAgoSpending] = useState(0)
  const [sixDaysAgoSpending, setSixDaysAgoSpending] = useState(0)

  const [sevenDaySpending, setSevenDaySpending] = useState([])

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTodaySpending(sum);
      },
      (error) => {
        console.error('Error fetching today\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 1);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 1);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setYesterdaySpending(sum);
      },
      (error) => {
        console.error('Error fetching yesterday\'s spending:', error);
      }

    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 2);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 2);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTwoDaysAgoSpending(sum);
      },
      (error) => {
        console.error('Error fetching two days ago\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 3);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 3);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setThreeDaysAgoSpending(sum);
      },
      (error) => {
        console.error('Error fetching three days ago\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 4);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 4);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setFourDaysAgoSpending(sum);
      },
      (error) => {
        console.error('Error fetching four days ago\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 5);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 5);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setFiveDaysAgoSpending(sum);
      },
      (error) => {
        console.error('Error fetching five days ago\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 6);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    endOfDay.setDate(endOfDay.getDate() - 6);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'transactions'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });

        setSixDaysAgoSpending(sum);
      },
      (error) => {
        console.error('Error fetching six days ago\'s spending:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);


  useEffect(() => {
    // set the sevenDayIncome array to the values of the income from the last 7 days
    setSevenDaySpending([
      sixDaysAgoSpending,
      fiveDaysAgoSpending,
      fourDaysAgoSpending,
      threeDaysAgoSpending,
      twoDaysAgoSpending,
      yesterdaySpending,
      todaySpending,
    ]);
  }, [
    sixDaysAgoSpending,
    fiveDaysAgoSpending,
    fourDaysAgoSpending,
    threeDaysAgoSpending,
    twoDaysAgoSpending,
    yesterdaySpending,
    todaySpending,
  ]);

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-header font-semibold'>
        Recent Spending
      </h2> 
      <LineGraph backgroundColor={"rgba(212, 66, 177, .6)"} borderColor={"rgba(212, 66, 177, 1)"} label={"Spending"} input={sevenDaySpending} />
    </div>
  )
}
