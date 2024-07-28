# Documentação das Entidades do Sistema

Este documento explica as principais entidades do nosso sistema e como elas se relacionam.

## Usuário (User)

O Usuário é a pessoa que usa o sistema. Cada usuário tem:
- Um e-mail único
- Um nome (opcional)
- Uma imagem de perfil (opcional)
- Um nome de usuário (opcional)
- Configurações personalizadas
- Uma função (usuário normal, administrador ou super administrador)

Os usuários podem fazer parte de vários times (Tenants) através de Associações (Memberships).

## Time (Tenant)

Um Time representa uma empresa ou grupo no sistema. Cada time tem:
- Um nome
- Um logotipo (opcional)
- Um endereço web único (slug)
- Configurações personalizadas

Os times podem ter vários membros, contratos de publicidade, disputas e transações.

## Associação (Membership)

A Associação conecta um Usuário a um Time. Cada associação tem:
- Uma função (proprietário, membro ou cliente)
- Configurações específicas para esse usuário nesse time

## Contrato de Publicidade (Contract)

Um Contrato de Publicidade representa um acordo entre o time e um cliente. Cada contrato de publicidade tem:
- Um status (pendente, ativo, concluído, em disputa ou cancelado)
- Um status de pagamento (pendente, pago ou liberado)
- Um valor
- Uma descrição
- Datas de início e fim
- Transações, avaliações e mensagens relacionadas

## Negociação (Negotiation)

Uma Negociação é o processo que leva a um Contrato de Publicidade. Cada negociação tem:
- Um status (pendente, aceita ou rejeitada)
- Um valor proposto (opcional)
- Uma descrição (opcional)

## Disputa (Dispute)

Uma Disputa é criada quando há um problema com um Contrato de Publicidade. Cada disputa tem:
- Um motivo
- Uma resolução (quando resolvida)
- Anexos (opcional)
- Um status (aberta, resolvida a favor do cliente, resolvida a favor do influenciador, ou fechada)

## Transação (Transaction)

Uma Transação representa um movimento financeiro no sistema. Cada transação tem:
- Um valor
- Um tipo (receita, saque, taxa ou reembolso)
- Um status (pendente, concluída, falha ou cancelada)
- Um método de pagamento (opcional)
- Detalhes do pagamento (opcional)
- Uma descrição (opcional)

## Avaliação (Review)

Uma Avaliação é feita após a conclusão de um Contrato de Publicidade. Cada avaliação tem:
- Uma nota
- Um comentário (opcional)

## Mensagem (Message)

Uma Mensagem permite a comunicação entre as partes de um Contrato de Publicidade. Cada mensagem tem:
- Um conteúdo
- Um remetente
- Um destinatário

## Como as entidades se conectam

1. Usuários podem fazer parte de vários Times através de Associações.
2. Times podem ter vários Contratos de Publicidade com seus clientes.
3. Cada Contrato de Publicidade começa como uma Negociação.
4. Se houver problemas, uma Disputa pode ser aberta para um Contrato de Publicidade.
5. Transações são registradas para acompanhar os pagamentos dos Contratos de Publicidade.
6. Após a conclusão de um Contrato de Publicidade, Avaliações podem ser feitas.
7. Mensagens podem ser trocadas no contexto de um Contrato de Publicidade.

## Recursos possíveis

Com essa estrutura, podemos oferecer:

1. Gerenciamento de múltiplos times para um único usuário.
2. Sistema completo de contratos de publicidade, desde a negociação até a avalação final.
3. Acompanhamento financeiro detalhado com transações.
4. Sistema de resolução de disputas.
5. Comunicação integrada entre as partes de um contrato de publicidade.
6. Diferentes níveis de acesso (funções) para usuários em cada time.
7. Personalização de configurações para usuários e times.
8. Sistema de convites para adicionar novos membros aos times.

Esta estrutura permite criar um sistema robusto para gerenciar relações entre times e seus clientes ou colaboradores, com foco em contratos de publicidade, pagamentos e comunicação.