import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T> (key: string, initialValue: T): [T, SetValue<T>] {
  
    const readValue = (): T => {
        try {
            const item = window.localStorage.getItem(key);
            return item? (JSON.parse(item) as T) : initialValue;
        } catch(error) {
            console.warn(`Error reading localStorage key ${key}:`, error);
            return initialValue;
        }
    }

    const [storedValue, setStoredValue] = useState(readValue)

    const setValue: SetValue<T> = value => {
        try {
            const newValue = value instanceof Function? value(storedValue) : value;
            window.localStorage.setItem(key, JSON.stringify(newValue));
            setStoredValue(newValue);
            window.dispatchEvent(new Event("local-storage"));
        } catch(error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }

    useEffect(() => {
        setStoredValue(readValue())
    }, [])

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue())
        }

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('local-storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('local-storage', handleStorageChange);
        }
    }, [])

    return [storedValue, setValue]
}

export default useLocalStorage
