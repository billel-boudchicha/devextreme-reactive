import React from 'react';
import {
  RowDetailState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView,
  TableHeaderRow,
  TableRowDetail,
} from '@devexpress/dx-react-grid-bootstrap3';

import {
  generateRows,
} from '../../demo-data/generator';

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 7 }),
      expandedRows: [2, 5],
    };

    this.changeExpandedDetails = expandedRows => this.setState({ expandedRows });
    this.rowTemplate = ({ row }) => <div>Details for {row.name} from {row.city}</div>;
  }
  render() {
    const { rows, columns, expandedRows } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <RowDetailState
          expandedRows={expandedRows}
          onExpandedRowsChange={this.changeExpandedDetails}
        />
        <TableView />
        <TableHeaderRow />
        <TableRowDetail
          template={this.rowTemplate}
        />
      </Grid>
    );
  }
}
