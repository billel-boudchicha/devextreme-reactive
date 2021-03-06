import React from 'react';
import { setupConsole } from '@devexpress/dx-testing';
import { mountWithStyles } from '../utils/testing';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should use the \'Filter...\' placeholder', () => {
    const tree = mountWithStyles(
      <TableFilterCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('Input').prop('placeholder')).toBe('Filter...');
  });

  it('should not set filter with an empty value', () => {
    const setFilterMock = jest.fn();
    const tree = mountWithStyles(
      <TableFilterCell
        column={{
          name: 'Test',
        }}
        setFilter={setFilterMock}
        value={'abc'}
      />,
    );

    tree.find('input').simulate('change', { target: { value: '' } });
    expect(setFilterMock.mock.calls[0][0]).toBeNull();
  });
});
