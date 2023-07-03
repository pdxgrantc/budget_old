import React, { useState, useEffect } from 'react'

// Firebase
import { onSnapshot, query, collection, where, Timestamp } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

// Components
import LineGraph from '../Helpers/LineGraph'

export default function RecentIncome() {
  const [user] = useAuthState(auth)

  const [todayIncome, setTodayIncome] = useState(0)
  const [yesterdayIncome, setYesterdayIncome] = useState(0)
  const [twoDaysAgoIncome, setTwoDaysAgoIncome] = useState(0)
  const [threeDaysAgoIncome, setThreeDaysAgoIncome] = useState(0)
  const [fourDaysAgoIncome, setFourDaysAgoIncome] = useState(0)
  const [fiveDaysAgoIncome, setFiveDaysAgoIncome] = useState(0)
  const [sixDaysAgoIncome, setSixDaysAgoIncome] = useState(0)

  const [sevenDayIncome, setSevenDayIncome] = useState([])

  // pull the income for each of the last 7 days
  useEffect(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTodayIncome(sum);
      },
      (error) => {
        console.error('Error fetching today\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setYesterdayIncome(sum);
      },
      (error) => {
        console.error('Error fetching yesterday\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setTwoDaysAgoIncome(sum);
      },
      (error) => {
        console.error('Error fetching two days ago\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setThreeDaysAgoIncome(sum);
      },
      (error) => {
        console.error('Error fetching three days ago\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setFourDaysAgoIncome(sum);
      },
      (error) => {
        console.error('Error fetching four days ago\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });
        setFiveDaysAgoIncome(sum);
      },
      (error) => {
        console.error('Error fetching five days ago\'s income:', error);
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
        collection(db, 'users', user.uid, 'income'),
        where('date', '>=', Timestamp.fromDate(startOfDay)),
        where('date', '<=', Timestamp.fromDate(endOfDay))
      ),
      (snapshot) => {
        let sum = 0;
        snapshot.forEach((doc) => {
          sum += doc.data().amount;
        });

        setSixDaysAgoIncome(sum);
      },
      (error) => {
        console.error('Error fetching six days ago\'s income:', error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    // set the sevenDayIncome array to the values of the income from the last 7 days
    setSevenDayIncome([
      sixDaysAgoIncome,
      fiveDaysAgoIncome,
      fourDaysAgoIncome,
      threeDaysAgoIncome,
      twoDaysAgoIncome,
      yesterdayIncome,
      todayIncome,
    ]);
  }, [
    sixDaysAgoIncome,
    fiveDaysAgoIncome,
    fourDaysAgoIncome,
    threeDaysAgoIncome,
    twoDaysAgoIncome,
    yesterdayIncome,
    todayIncome,
  ]);

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='on_desktop:text-header on_mobile:text-sheader font-semibold'>
        Recent income
      </h2>
      <LineGraph label={"Income"} input={sevenDayIncome} />
    </div>
  )
}
