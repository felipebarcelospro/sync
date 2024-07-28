'use client'

import { parseUnitPrice } from '@/helpers/parse-unit-price'
import { Badge } from '@design-system/react/components/ui/badge'
import { Button } from '@design-system/react/components/ui/button'
import { DataTable } from '@design-system/react/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon } from 'lucide-react'
import Image from 'next/image'

export function ContactPublisDataTable({ publis }: { publis: Publi[] }) {
  const columns: ColumnDef<Publi>[] = [
    {
      accessorKey: 'name',
      size: 80,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Software
            <ArrowUpDownIcon className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const software = row.original
        return (
          <div className="flex items-center space-x-4 line-clamp-1">
            <span className="border border-border h-8 w-8 flex items-center justify-center rounded-full">
              <Image
                src={software.logo ?? ''}
                alt={software.name}
                width={24}
                height={24}
                className="flex h-4 w-4"
              />
            </span>
            <span className="line-clamp-1">{software.name}</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'firstTime',
      accessorFn: (software) => {
        return software.createdAt
      },
      size: 80,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Primeiro acesso
            <ArrowUpDownIcon className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const software = row.original
        return <span>{software.createdAt.toLocaleString()}</span>
      },
    },
    {
      accessorKey: 'lastTime',
      accessorFn: (software) => {
        const log = software.logs[0]
        return log?.createdAt
      },
      size: 80,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Último acesso
            <ArrowUpDownIcon className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const software = row.original
        return <span>{software.logs[0].createdAt.toLocaleString()}</span>
      },
    },
    {
      accessorKey: 'activeUsersPercentage',
      accessorFn: (software) => {
        const activeUsersPercentage =
          (software._count.collaborators / software._count.logs) * 100
        return activeUsersPercentage
      },
      size: 80,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Uso
            <ArrowUpDownIcon className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const software = row.original
        const activeUsersPercentage =
          (software._count.collaborators / software._count.logs) * 100

        const statuses = {
          30: {
            label: 'Baixo',
            className:
              'text-zync-500 bg-zync-100 hover:bg-zync-100 border-zync-200',
          },
          50: {
            label: 'Médio',
            className:
              'text-blue-500 bg-blue-100 hover:bg-blue-100 border-blue-200',
          },
          100: {
            label: 'Alto',
            className:
              'text-orange-500 bg-orange-100 hover:bg-orange-100 border-orange-200',
          },
        }

        let statusKey
        if (activeUsersPercentage < 30) {
          statusKey = 30
        } else if (activeUsersPercentage >= 30 && activeUsersPercentage < 70) {
          statusKey = 50
        } else {
          statusKey = 100
        }

        return (
          <Badge className={statuses[statusKey].className}>
            {statuses[statusKey].label}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'totalPrice',
      accessorFn: (software) => {
        const subscription = software.subscriptions[0]
        return subscription?.price
      },
      size: 80,
      header: ({ column }) => {
        return (
          <Button
            variant="link"
            className="text-muted-foreground"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Vlr. total
            <ArrowUpDownIcon className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const software = row.original
        const subscription = software.subscriptions[0]

        return (
          <span className="line-clamp-1">
            {subscription?.price
              ? parseUnitPrice(
                  subscription.price,
                  subscription.currency,
                  'pt-BR',
                )
              : '-'}
          </span>
        )
      },
    },
  ]

  return (
    <DataTable
      className="pt-0"
      searchField="name"
      columns={columns}
      data={softwares}
    />
  )
}
