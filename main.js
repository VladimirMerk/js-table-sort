{
  const grid = document.getElementById('grid')
  grid.addEventListener('click', sortEvent)
  function sortEvent(e) {
    if (e.target.tagName === 'TH') {
      e.target.dataset.direction = +e.target.dataset.direction ? 0 : 1;
      sortColumn(e.target.cellIndex, e.target.dataset.type, +e.target.dataset.direction)
    }
  }
  function sortColumn(columnIndex = 0, sortType = 'string', direction = 1) {
    const sorts = {
      'string': (rowA, rowB) => {
        return (rowA.cells[columnIndex].textContent > rowB.cells[columnIndex].textContent) ? direction ? 1 : -1 : direction ? -1 : 1;
      },
      'number': (rowA, rowB) => {
        if (direction) {
              return rowA.cells[columnIndex].textContent - rowB.cells[columnIndex].textContent
        } else {
            return rowB.cells[columnIndex].textContent - rowA.cells[columnIndex].textContent
        }
      }
    }
    
    const tbody = grid.querySelector('tbody')
    const allRows = Array.from(tbody.rows);
    const sortTBody = allRows
    .sort(sorts[sortType])
    .reduce(
      (fragment, tr) => {
        fragment.appendChild(tr);
        return fragment
      },
      document.createDocumentFragment()
    )
    
    tbody.innerHTML = '';
    tbody.appendChild(sortTBody);
  }
}
