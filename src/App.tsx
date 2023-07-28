import React, { useEffect, useState } from 'react';
import { db } from './config/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';

function App() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState([]);

  const useCollecitonRef = collection(db, 'users');

  const createUser = () => {
    addDoc(useCollecitonRef, {
      name: name,
      email: email,
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(useCollecitonRef);
      setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id }) )); 
    };
    getUsers();
  }, [createUser]); 

  return (
    <>
      <div>
        <input 
          type="text" 
          placeholder="name..." 
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="email..." 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button onClick={createUser}>Criar user</button>

        <ul>
          {
            users.map(user =>
              <div key={user.id}>
                <li>{user.name}</li>
                <li>{user.email}</li>
              </div>
            )
          }
        </ul>
      </div>
    </>
  );
}

export default App;
