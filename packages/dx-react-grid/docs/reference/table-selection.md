# TableSelection Plugin Reference

This plugin visualizes the selection state within a table by rendering selection checkboxes and highlighting selected rows.

## User Reference

### Dependencies

- [SelectionState](selection-state.md)
- [TableView](table-view.md)

### Properties

Name | Type | Default | Description
-----|------|---------|------------
highlightSelected | boolean | false | If true, selected rows are highlighted
selectByRowClick | boolean | false | If true, a selected row is toggled by click
showSelectAll | boolean | true | If true, the 'select all' checkbox is rendered inside the heading row
showSelectionColumn | boolean | false | If true, selection checkboxes are rendered inside each data row
selectCellTemplate | (args: [SelectCellArgs](#select-cell-args)) => ReactElement | | A component that renders a data row selection checkbox
selectAllCellTemplate | (args: [SelectAllCellArgs](#select-all-cell-args)) => ReactElement | | A component that renders the Select All checkbox
selectionColumnWidth | number | | The selection column's width

## Interfaces

### <a name="select-all-cell-args"></a>SelectAllCellArgs

Describes properties passed to the template that renders a cell with a selection control.

A value with the following shape:

Field | Type | Description
------|------|------------
selectionAvailable | boolean | True if at least one row can be selected
allSelected | boolean | True if all the rows available to select are selected
someSelected | boolean | True if at least one but not all rows available to select are selected
toggleAll | () => void | Selects or deselects all rows

### <a name="select-cell-args"></a>SelectCellArgs

Describes properties passed to a template that renders a cell with the selection control inside the heading row.

A value with the following shape:

Field | Type | Description
------|------|------------
selected | boolean | Specifies whether a row is selected
changeSelected | () => void | Selects or deselects a row

## Plugin Developer Reference

### Imports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Body rows to be rendered
selection | Getter | Array&lt;number &#124; string&gt; | Selected rows
getRowId | Getter | (row: [Row](grid.md#row)) => number &#124; string | The function used to get a unique row identifier
tableExtraProps | Getter | { [key: string]: any } | Additional table properties that can be provided by other plugins
availableToSelect | Getter | Array&lt;[Row](grid.md#row)&gt; | Body rows to be rendered available for selection
setRowSelection | Action | ({ rowId }) => void | Selects a row
setRowsSelection | Action | ({ rowIds }) => void | Selects multiple rows
tableViewCell | Template | { row: [TableRow](table-view.md#table-row), column: [TableColumn](table-view.md#table-column) } | A template that renders a table cell

### Exports

Name | Plugin | Type | Description
-----|--------|------|------------
tableColumns | Getter | Array&lt;[TableColumn](table-view.md#table-column)&gt; | Table columns including the selection column
tableBodyRows | Getter | Array&lt;[TableRow](table-view.md#table-row)&gt; | Body rows to be rendered including the selected ones
tableExtraProps | Getter | { [key: string]: any } | Additional table properties extended with the row onClick event listener
