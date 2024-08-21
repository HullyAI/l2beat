import { createColumnHelper } from '@tanstack/react-table'
import { UpcomingBadge } from '~/app/_components/badge/upcoming-badge'
import { ProjectNameCell } from '~/app/_components/table/cells/project-name-cell'
import {
  TypeCell,
  TypeExplanationTooltip,
} from '~/app/_components/table/cells/type-cell'
import { getCommonProjectColumns } from '~/app/_components/table/common-project-columns'
import { type ScalingSummaryTableRow } from '../../../_utils/to-table-rows'
import { TotalCell } from '../total-cell'

const columnHelper = createColumnHelper<ScalingSummaryTableRow>()

export const summaryLayer3sColumns = [
  ...getCommonProjectColumns(columnHelper),
  columnHelper.accessor('name', {
    cell: (ctx) => <ProjectNameCell project={ctx.row.original} type="layer2" />,
  }),
  columnHelper.accessor('category', {
    header: 'Type',
    cell: (ctx) => <TypeCell>{ctx.getValue()}</TypeCell>,
    meta: {
      tooltip: <TypeExplanationTooltip />,
    },
  }),
  columnHelper.accessor('provider', {
    header: 'Technology',
    cell: (ctx) => {
      const value = ctx.getValue()
      return value === 'Arbitrum' ? 'Arbitrum Orbit' : value
    },
    meta: {
      tooltip: 'The technology stack used.',
    },
  }),
  columnHelper.accessor('hostChain', {
    header: 'Host chain',
    meta: {
      tooltip: 'The technology stack used.',
    },
  }),
  columnHelper.accessor('purposes', {
    header: 'Purpose',
    cell: (ctx) => ctx.getValue().join(', '),
    enableSorting: false,
    meta: {
      tooltip: 'Functionality supported by this project.',
    },
  }),
  columnHelper.accessor('tvl', {
    id: 'total',
    header: 'Total',
    cell: (ctx) => {
      const value = ctx.getValue()
      if (!value.breakdown) {
        return <UpcomingBadge />
      }

      return (
        <TotalCell
          associatedTokenSymbols={value.associatedTokens}
          tvlWarnings={value.warnings}
          breakdown={value.breakdown}
          change={value.change}
        />
      )
    },
    sortUndefined: 'last',
    meta: {
      headClassName: 'justify-end',
      cellClassName: 'justify-end',
      tooltip:
        'Total value locked in escrow contracts on the base chain displayed together with a percentage changed compared to 7D ago. Some projects may include externally bridged and natively minted assets.',
    },
  }),
]
