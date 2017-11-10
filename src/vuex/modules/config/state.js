export default {
  lista: {
    title: 'Principal',
    refresh: false,
    noHeader: false,
    columnPicker: false,
    leftStickyColumns: 0,
    rightStickyColumns: 0,
    bodyStyle: {
      maxHeight: '500px'
    },
    rowHeight: '50px',
    responsive: false,
    pagination: {
      rowsPerPage: 5,
      options: [5, 10, 15, 30, 50, 100]
    },
    selection: 'multiple',
    messages: {
      noData: '<i class="material-icons">warning</i> Não há dados para exibir.',
      noDataAfterFiltering: '<i class="material-icons">warning</i> Sem resultados. Por favor, redefina suas buscas.'
    },
    // (optional) Override default labels. Useful for I18n.
    labels: {
      columns: 'Colunas',
      allCols: 'Todas',
      rows: 'Linhas',
      selected: {
        singular: 'item selecionado.',
        plural: 'items selecionado.'
      },
      clear: 'limpar',
      search: 'Buscar',
      all: 'Todos'
    }

  },
  pagination: true,
  rowHeight: 50,
  bodyHeightProp: 'auto',
  bodyHeight: 500 
}