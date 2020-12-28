import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@material-ui/core';

import { getValue } from './utils';
import { setBookList } from '../redux/actions';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.bookList);
  const classes = useStyles();

  const [page, setPage] = useState(1);
  // eslint-disable-next-line
  const [limit, setLimit] = useState(2);
  const [offset, setOffset] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const getPageUrl = (itemLimit, itemOffset) => `http://localhost:8000/books/?limit=${itemLimit}&offset=${itemOffset}`;

  async function fetchBookList(url) {
    let results;
    let count;
    await axios.get(url)
      .then((res) => {
        results = res.data.results;
        count = res.data.count;
      })
      .catch((err) => {
        console.log(err);
      });

    return { results, count };
  }

  const handlePageChange = (event, pageNum) => {
    const nextOffset = limit * (pageNum - 1);

    setOffset(nextOffset);
    setPage(pageNum);

    const url = getPageUrl(limit, nextOffset);
    fetchBookList(url).then(
      (value) => {
        const {
          results, count,
        } = value;

        setTotalCount(count);
        dispatch(setBookList(results));
      },
    );
  };

  useEffect(() => {
    const url = getPageUrl(limit, offset);
    fetchBookList(url).then(
      (value) => {
        const {
          results, count,
        } = value;

        setTotalCount(count);
        dispatch(setBookList(results));
      },
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container maxWidth="false" disableGutters="true">
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="20%">タイトル</StyledTableCell>
              <StyledTableCell width="20%">著者</StyledTableCell>
              <StyledTableCell width="20%">シリーズ</StyledTableCell>
              <StyledTableCell width="20%">出版社</StyledTableCell>
              <StyledTableCell width="20%">媒体</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { books && books.map((book) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell component="th" scope="row">{getValue(book, 'title')}</StyledTableCell>
                <StyledTableCell>{getValue(book.author, 'full_name')}</StyledTableCell>
                <StyledTableCell>{getValue(book.series, 'series_name')}</StyledTableCell>
                <StyledTableCell>{getValue(book.publisher, 'publisher_name')}</StyledTableCell>
                <StyledTableCell>{getValue(book.medium, 'medium_name')}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container justify="center">
        <Pagination
          count={Math.ceil(totalCount / limit)}
          page={page}
          size="large"
          onChange={handlePageChange}
          showFirstButton="true"
          showLastButton="true"
        />
      </Grid>
    </Container>

  );
};

const mapStateToProps = (state) => state.bookList;

export default connect(mapStateToProps)(BookList);
