'use client'

import { Button } from '@design-system/react/components/ui/button'
import { AreaChart, BarChart } from '@design-system/react/components/tremor'
import {
  TabbedChart,
  TabbedChartHeader,
  TabbedChartHeaderTab,
  TabbedChartHeaderTabLabel,
  TabbedChartHeaderTabValue,
  TabbedChartContent,
  TabbedChartContentTab,
} from '@design-system/react/components/shared/dashboard/tabbed-chart'
import {
  BanknoteIcon,
  BarChart3Icon,
  PlusSquareIcon,
  Settings2Icon,
  UserPlus2,
} from 'lucide-react'
import Link from 'next/link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@design-system/react/components/ui/avatar'
import { Card, CardContent } from '@design-system/react/components/ui/card'
import { FeedbackModal } from '../../_components/feedback-modal'
import { APP_CONFIGS } from '@/boilerplate.config'

export function TenantWelcomeCard() {
  return (
    <section>
      <section className="px-8 border-b border-border space-y-8 pb-8">
        <header className="flex items-center gap-4">
          <div className="flex items-center -space-x-4">
            <Avatar>
              <AvatarFallback className="bg-black text-white">
                FS
              </AvatarFallback>
              <AvatarImage src="https://cdn.indier.co/indier/development/31e9b148-6748-4b81-a6cd-8e77b6099362.png" />
            </Avatar>
            <Avatar>
              <AvatarFallback className="border bg-background -z-10">
                FS
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h1 className="text-md">Olá,</h1>
            <h1 className="text-md font-bold">Felipe Barcelos</h1>
          </div>
        </header>
        <main className="flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0">
          <div className="flex items-end gap-4">
            <div>
              <small className="uppercase text-xs opacity-50">
                Saldo disponível
              </small>
              <h1 className="text-2xl font-bold">R$ 80,00</h1>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div>
              <small className="uppercase text-xs opacity-50">
                Saldo bloqueado
              </small>
              <h1 className="text-sm">R$ 20,00</h1>
            </div>
            <div>
              <small className="uppercase text-xs opacity-50">
                Saldo total
              </small>
              <h1 className="text-sm">R$ 100,00</h1>
            </div>

            <Button variant="outline" className="hidden md:flex">
              <BanknoteIcon className="w-4 h-4 mr-3" />
              <span>Efetuar saque</span>
            </Button>
          </div>
        </main>
      </section>

      <section className="px-8 border-b border-border py-8">
        <main className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="flex flex-col h-32 w-32 bg-primary text-primary-foreground rounded-md space-y-2 p-4 justify-end hover:bg-primary/80 transition-colors duration-300"
            >
              <PlusSquareIcon className="w-4 h-4" />
              <span className="text-xs">Começar publi</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col h-32 w-32 bg-primary text-primary-foreground rounded-md space-y-2 p-4 justify-end hover:bg-primary/80 transition-colors duration-300"
            >
              <UserPlus2 className="w-4 h-4" />
              <span className="text-xs">Adicionar cliente</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col h-32 w-32 bg-primary text-primary-foreground rounded-md space-y-2 p-4 justify-end hover:bg-primary/80 transition-colors duration-300"
            >
              <BarChart3Icon className="w-4 h-4" />
              <span className="text-xs">Ver extrato</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col h-32 w-32 bg-primary text-primary-foreground rounded-md space-y-2 p-4 justify-end hover:bg-primary/80 transition-colors duration-300"
            >
              <Settings2Icon className="w-4 h-4" />
              <span className="text-xs">Configurações</span>
            </Link>
          </div>
        </main>
      </section>

      <section className="px-8 py-8 border-b border-border space-y-4">
        <header>
          <small className="uppercase text-xs opacity-50">Resumo</small>
          <h1 className="text-sm">
            Felipe, aqui você pode acompanhar o resumo da sua conta{' '}
            <u className="font-bold underline underline-offset-4">Vibe Dev</u>{' '}
            no período selecionado
          </h1>
        </header>
        <main>
          <TabbedChart defaultTab="revenue">
            <TabbedChartHeader>
              <TabbedChartHeaderTab tab="revenue">
                <TabbedChartHeaderTabLabel>Receita</TabbedChartHeaderTabLabel>
                <TabbedChartHeaderTabValue>R$ 100,00</TabbedChartHeaderTabValue>
              </TabbedChartHeaderTab>
              <TabbedChartHeaderTab tab="publis">
                <TabbedChartHeaderTabLabel>Publis</TabbedChartHeaderTabLabel>
                <TabbedChartHeaderTabValue>2</TabbedChartHeaderTabValue>
              </TabbedChartHeaderTab>
            </TabbedChartHeader>
            <TabbedChartContent>
              <TabbedChartContentTab tab="revenue">
                <BarChart
                  index="date"
                  categories={['Entradas', 'Saídas']}
                  colors={['orange-500', 'orange-300']}
                  yAxisWidth={65}
                  showAnimation={true}
                  showLegend={true}
                  animationDuration={1000}
                  data={Array.from({ length: 30 }, (_, i) => ({
                    date: new Date(
                      Date.now() - i * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString(),
                    Entradas: Math.floor(Math.random() * 1000),
                    Saídas: Math.floor(Math.random() * 1000),
                  }))}
                />
              </TabbedChartContentTab>

              <TabbedChartContentTab tab="publis">
                <BarChart
                  index="date"
                  categories={['Enviadas', 'Aprovadas', 'Recusadas']}
                  colors={['orange-500', 'orange-300', 'orange-100']}
                  yAxisWidth={65}
                  showAnimation={true}
                  showLegend={true}
                  animationDuration={1000}
                  data={Array.from({ length: 30 }, (_, i) => ({
                    date: new Date(
                      Date.now() - i * 24 * 60 * 60 * 1000,
                    ).toLocaleDateString(),
                    Enviadas: Math.floor(Math.random() * 1000),
                    Aprovadas: Math.floor(Math.random() * 1000),
                    Recusadas: Math.floor(Math.random() * 1000),
                  }))}
                />
              </TabbedChartContentTab>
            </TabbedChartContent>
          </TabbedChart>
        </main>
      </section>

      <section className="px-8 pt-8 space-y-4">
        <header>
          <small className="uppercase text-xs opacity-50">Descubra mais</small>
          <h1 className="text-sm">
            Felipe, aqui você encontra alguns links úteis para explorar
          </h1>
        </header>
        <main className="grid grid-cols-3 gap-4">
          <Link href={APP_CONFIGS.app.links.support} target="_blank">
            <Card>
              <div className="bg-primary h-48 rounded-t-md overflow-hidden">
                <img
                  src="/assets/hero/support.jpg"
                  alt="Ajuda"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold">Ajuda</h3>
                <p className="text-md text-muted-foreground">
                  Precisa de ajuda? Visite nosso centro de suporte.
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href={APP_CONFIGS.app.links.blog} target="_blank">
            <Card>
              <div className="bg-primary h-48 rounded-t-md overflow-hidden">
                <img
                  src="/assets/hero/learn.jpg"
                  alt="Blog"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold">Blog</h3>
                <p className="text-md text-muted-foreground">
                  Fique por dentro das últimas novidades e atualizações.
                </p>
              </CardContent>
            </Card>
          </Link>
          <FeedbackModal>
            <Card>
              <div className="bg-primary h-48 rounded-t-md overflow-hidden">
                <img
                  src="/assets/hero/feedback.jpg"
                  alt="Feedback"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-md font-semibold">Feedback</h3>
                <p className="text-md text-muted-foreground">
                  Queremos ouvir sua opinião. Envie seu feedback e sugestões
                </p>
              </CardContent>
            </Card>
          </FeedbackModal>
        </main>
      </section>
    </section>
  )
}
