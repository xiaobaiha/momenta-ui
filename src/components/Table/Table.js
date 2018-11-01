import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const OneRow = ({rowData}) => {
    const key = rowData.shift();
    return <TableRow key={key}>
        {rowData.map(cell => (
            <TableCell>{cell}</TableCell>
        ))}
    </TableRow>
}


class MTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    formatTableData(columns, data) {
        const dataIndexes = columns.map(column => column.dataIndex);
        return data.map(item => {
            const arr = [item.key];
            dataIndexes.forEach(dataIndex => arr.push(item[dataIndex]))
            return arr;
        })
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    render() {
        const {columns, data, style, className} = this.props;
        let {pagination} = this.props;
        const formatData = this.formatTableData(columns, data);
        pagination = pagination ? Object.assign(pagination, {
            rowsPerPage: 10,
            page: 0
        }): null;
        return (      
            columns? (
                <Table style={style} className={className}>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (<TableCell style={{width: column.width}} key={column.key}>{column.title}</TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pagination? 
                        formatData.slice(pagination.page * pagination.rowsPerPage, (pagination.page + 1) * pagination.rowsPerPage).map(oneRow => (
                            <OneRow rowData={oneRow}></OneRow>
                        )): 
                        formatData.map(oneRow => (
                            <OneRow rowData={oneRow}></OneRow>
                        ))}
                    </TableBody>
                    {pagination?<TableFooter>
                        <TableRow>
                            {/* <TablePagination
                                colSpan={3}
                                count={data.length}
                                rowsPerPage={pagination.rowsPerPage}
                                page={pagination.page}
                                onChangePage={this.handleChangePage}
                                ActionsComponent={TablePaginationActionsWrapped}
                            /> */}
                            <TablePaginationActionsWrapped onChangePage={this.handleChangePage} />
                        </TableRow>
                    </TableFooter>:null}
                </Table>
            ): null
        );
    }
}

module.exports = MTable;