import React from 'react';
import PropTypes from 'prop-types';
import { Getter, Template, PluginContainer } from '@devexpress/dx-react-core';
import { tableColumnsWithGrouping } from '@devexpress/dx-grid-core';

export class TableGroupRow extends React.PureComponent {
  render() {
    const {
      groupCellTemplate,
      groupIndentCellTemplate,
      groupIndentColumnWidth,
    } = this.props;

    return (
      <PluginContainer>
        <Getter
          name="tableColumns"
          pureComputed={tableColumnsWithGrouping}
          connectArgs={getter => [
            getter('tableColumns'),
            getter('grouping'),
            getter('draftGrouping'),
            groupIndentColumnWidth,
          ]}
        />

        <Template
          name="tableViewCell"
          predicate={({ column, row }) => row.type === 'groupRow'
            && column.type === 'groupColumn'
            && row.column.name === column.group.columnName}
          connectGetters={getter => ({ expandedGroups: getter('expandedGroups') })}
          connectActions={action => ({ toggleGroupExpanded: action('toggleGroupExpanded') })}
        >
          {({ expandedGroups, toggleGroupExpanded, ...params }) => groupCellTemplate({
            ...params,
            isExpanded: expandedGroups.has(params.row.key),
            toggleGroupExpanded: () => toggleGroupExpanded({ groupKey: params.row.key }),
          })}
        </Template>
        {groupIndentCellTemplate && (
          <Template
            name="tableViewCell"
            predicate={({ column, row }) => (
              column.type === 'groupColumn'
              && (
                !row.type
                || (row.type === 'groupRow' && row.column.name !== column.group.columnName)
              )
            )}
          >
            {groupIndentCellTemplate}
          </Template>
        )}
      </PluginContainer>
    );
  }
}

TableGroupRow.propTypes = {
  groupCellTemplate: PropTypes.func.isRequired,
  groupIndentCellTemplate: PropTypes.func,
  groupIndentColumnWidth: PropTypes.number.isRequired,
};

TableGroupRow.defaultProps = {
  groupIndentCellTemplate: null,
};
