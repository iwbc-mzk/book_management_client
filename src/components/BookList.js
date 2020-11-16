import axios from 'axios'
import { useEffect, useState } from 'react';


function BookList() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        let result;
        await axios.get('http://localhost:8000/api/books/')
                   .then(res => {
                     result = res.data;
                   })
                   .catch(err => {
                     console.log(err);
                   })
  
        // [...配列名]でディープコピーすることができる
        console.log(result);
        let newBooks = [...books];
        console.log(result);
        newBooks = newBooks.concat(result);
        setBooks(newBooks);
      }
  
      fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
    return (
      <table border="1" cellspacing="0">
        <tr>
          <th bgcolor="#EE0000">タイトル</th>
          <th bgcolor="#EE0000">著者</th>
          <th bgcolor="#EE0000">シリーズ名</th>
          <th bgcolor="#EE0000">出版社</th>
          <th bgcolor="#EE0000">媒体</th>
        </tr>
        { books.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.series}</td>
            <td>{book.publisher}</td>
            <td>{book.medium}</td>
          </tr>
        ))}
      </table>
    );
  }

  export default BookList;