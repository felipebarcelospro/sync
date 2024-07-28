'use client'

import Link from 'next/link'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@design-system/react/components/ui/button'
import { DataTable } from '@design-system/react/components/ui/data-table'
import { ArrowUpDownIcon, EyeIcon } from 'lucide-react'
import type { Membership } from '@app/modules/src/domain/entities/Membership'

type CustomersDataTableProps = {
  data: Membership[]
}

export function CustomersDataTable({ data }: CustomersDataTableProps) {
  const columns: ColumnDef<Membership>[] = [
    {
      accessorKey: 'user.name',
      header: ({ column }) => (
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDownIcon className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="line-clamp-1">{row.original.user.name}</span>
      ),
    },
    {
      accessorKey: 'user.email',
      header: ({ column }) => (
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDownIcon className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="line-clamp-1">{row.original.user.email}</span>
      ),
    },
    {
      accessorKey: 'publisCount',
      header: ({ column }) => (
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quantidade de Publis
          <ArrowUpDownIcon className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => <span>{row.original._count?.publications || 0}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data de Criação
          <ArrowUpDownIcon className="ml-2 h-3 w-3" />
        </Button>
      ),
      cell: ({ row }) => (
        <span>{row.original.createdAt.toLocaleString('pt-BR')}</span>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="outline" asChild>
          <Link href={`/customers/${row.original.id}`}>
            <EyeIcon className="w-4 h-4 mr-2" />
            Ver detalhes
          </Link>
        </Button>
      ),
    },
  ]

  return <DataTable columns={columns} data={data} searchField="user.email" />
}
