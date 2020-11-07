import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';


function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let result;
      await axios.get('http://localhost:8000/api/')
                 .then(res => {
                   result = res.data;
                 })
                 .catch(err => {
                   console.log(err);
                 })

      // [...配列名]でディープコピーすることができる
      let newBooks = [...books];
      newBooks = newBooks.concat(result);
      setBooks(newBooks);
    }

    fetchData();
  }, []);
  
  return (
    <div>
      { books.map(item => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.author}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
