import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { setupConsole } from '@devexpress/dx-testing';
import { mountWithStyles } from '../utils/testing';
import { styleSheet, TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should have correct text alignment', () => {
    let mounted = mountWithStyles(
      <TableCell
        column={{}}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeFalsy();

    mounted = mountWithStyles(
      <TableCell
        column={{ align: 'left' }}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeFalsy();

    mounted = mountWithStyles(
      <TableCell
        column={{ align: 'right' }}
      />,
      styleSheet,
    );
    expect(mounted.tree.find(TableCellMUI).hasClass(mounted.classes.cellRightAlign)).toBeTruthy();
  });
});
