{
  const tableElement = document.getElementById('grid')
  const tableBody = tableElement.querySelector('tbody')

  tableElement.addEventListener('click', onClickTable)

  function onClickTable(e) {
    if (e.target.tagName === 'TH') {
      const headerCell = e.target;
      headerCell.dataset.direction = +headerCell.dataset.direction ? 0 : 1;
      sortColumn(
        headerCell.cellIndex,
        headerCell.dataset.type,
        +headerCell.dataset.direction
      );
    }
  }

  function sortColumn(columnIndex = 0, sortType = 'string', direction = 1) {
    const tableRows = Array.from(tableBody.rows);
    const sortedRowElements = tableRows
      .sort(sortRowsSequence(columnIndex, sortType, direction))
      .reduce(generateRowsSequence, document.createDocumentFragment());

    tableBody.innerHTML = '';
    tableBody.appendChild(sortedRowElements);
  }

  function sortRowsSequence(columnIndex, sortType, direction) {
    const sorts = getPossibleSortsFunctions(direction);
    return (rowA, rowB) => {
      return sorts[sortType](
        rowA.cells[columnIndex].textContent,
        rowB.cells[columnIndex].textContent
      );
    };
  }

  function getPossibleSortsFunctions(direction) {
    const sorts = {};

    sorts.string = sortString.bind(null, direction);
    sorts.number = sortNumber.bind(null, direction);

    return sorts;
  }

  function sortString(direction, a, b) {
    let result;
    if (a > b) {
      result = direction ? 1 : -1;
    } else {
      result = direction ? -1 : 1;
    }
    return result;
  }

  function sortNumber(direction, a, b) {
    let result;
    if (direction) {
      result = a - b;
    } else {
      result = b - a;
    }
    return result;
  }

  function generateRowsSequence(fragment, tr) {
    fragment.appendChild(tr);
    return fragment;
  }
}
