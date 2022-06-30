import { useState, useEffect } from 'react';
import { getFirebaseItems,addFirebaseItem } from '../lib/firebase';

const STORAGE_KEY = 'itss-todo';
function useStorage() {
  const [items, setItems] = useState([]);
  const  getIt = async()=>{
     
     const it = await getFirebaseItems()
     setItems(it);
   }
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
     getIt()
    
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      setItems(JSON.parse(data));
    }
  }, []);

  const putItems = async(item) => {
     await addFirebaseItem(item)
    setItems  ([...items,item]);
  };

  const clearItems = () => {
    setItems([]);
    
  };

  return [items, putItems, clearItems];
}

export default useStorage;