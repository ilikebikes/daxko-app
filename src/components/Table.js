import * as React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

/* header */
const headCells = [
  {
    id: 'index',
    numeric: true,
    disablePadding: false,
    label: 'Index',
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: true,
    label: 'Description',
  },
  {
    id: 'sugar',
    numeric: false,
    disablePadding: false,
    label: 'Sugar(g)',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Protein(g)',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Fat(g)',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Carbs(g)',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Calories(g)',
  },
];

/* Table head creation */
const EnhancedTableHead = function createEnhancedTableHead(props) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all food items',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const EnhancedTableToolbar = function createEnhancedTableToolbar(props) {
  const { numSelected, setCartItems, selectedRows } = props;
  const handleCartAdd = () => {
    setCartItems(selectedRows);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Food Items
        </Typography>
      )}
      {numSelected === 1 ? <Typography /> : null}
      {numSelected > 0 ? (
        <Tooltip title="Add">
          <IconButton onClick={handleCartAdd}>
            <AddShoppingCartIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
export const enhanceData = function createEnhancedData(rows) {
  return rows.map((row) => {
    let sugar = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let calories = 0;
    row.foodNutrients.forEach((nutrient) => {
      if (nutrient.number === '203') {
        protein = nutrient.amount;
      } else if (nutrient.nutrientNumber === '203') {
        protein = nutrient.value;
      } else if (nutrient.number === '204') {
        fat = nutrient.amount;
      } else if (nutrient.nutrientNumber === '204') {
        fat = nutrient.value;
      } else if (nutrient.number === '205') {
        carbs = nutrient.amount;
      } else if (nutrient.nutrientNumber === '205') {
        carbs = nutrient.value;
      } else if (nutrient.number === '208') {
        calories = nutrient.amount;
      } else if (nutrient.nutrientNumber === '208') {
        calories = nutrient.value;
      } else if (nutrient.number === '269') {
        sugar = nutrient.amount;
      } else if (nutrient.nutrientNumber === '269') {
        sugar = nutrient.value;
      }
    });

    return { ...row, protein, fat, carbs, calories, sugar };
  });
};
const EnhancedTable = function createTable(props) {
  const { rows, paginationOption, setCartItems } = props;
  const dataRows = enhanceData(rows);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(paginationOption);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataRows.map((n, index) => index);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, index) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (index) => selected.indexOf(index) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataRows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          setCartItems={setCartItems}
          selectedRows={selected}
          dataRows={dataRows}
        />
        <TableContainer>
          <Table
            sx={{ width: '100%' }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'large'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={dataRows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {dataRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(index);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.fdcId}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">{index}</TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.brandOwner
                          ? `${`${row.brandOwner} ${row.description}`}`
                          : row.description}
                      </TableCell>
                      {isItemSelected ? <TableCell align="right">{row.sugar}</TableCell> : null}
                      {isItemSelected ? <TableCell align="right">{row.protein}</TableCell> : null}
                      {isItemSelected ? <TableCell align="right">{row.fat}</TableCell> : null}
                      {isItemSelected ? <TableCell align="right">{row.carbs}</TableCell> : null}
                      {isItemSelected ? <TableCell align="right">{row.calories}</TableCell> : null}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={dataRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
};
EnhancedTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  paginationOption: PropTypes.number.isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default EnhancedTable;
