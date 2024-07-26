'use client'

import { useApplication } from '@/app/app/_hooks/application.hook'
import { useAction } from '@/services/actions/lib/client'
import { useDictionary } from '@/services/internationalization/hooks/dictionary.hook'
import { Button, ButtonIcon } from '@design-system/react/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@design-system/react/components/ui/card'
import { Separator } from '@design-system/react/components/ui/separator'
import { cn } from '@design-system/react/helpers/cn'
import { useBoolean } from '@design-system/react/hooks/use-boolean'
import { useClipboard } from '@design-system/react/hooks/use-clipboard'
import { Check, Copy, Eye, EyeOff, RefreshCcwIcon } from 'lucide-react'
import { regenerateTokenAction } from '../actions'
import {
  Alert,
  AlertDescription,
} from '@design-system/react/components/ui/alert'

export function ApiTokenCard() {
  const application = useApplication()
  const regenerateToken = useAction(regenerateTokenAction)
  const tokenClipboard = useClipboard(
    application.session.tenant.settings.integrations.external.token,
  )

  const { dict } = useDictionary()

  const tokenIsVisible = useBoolean({
    defaultValue: true,
    timeout: 5000,
  })

  const hasExternalToken = !!tokenClipboard.value

  const handleRegenerateToken = async () => {
    if (hasExternalToken) {
      if (
        !confirm(
          dict.dashboard.settings.integrations.form.messages
            .confirmRegenerateToken,
        )
      ) {
        return
      }
    }

    const token = await regenerateToken.execute({})
    tokenClipboard.setValue(token)
    tokenIsVisible.onToggle()
  }

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center pb-2 pt-4">
        <CardTitle className="text-sm">
          {dict.dashboard.settings.integrations.form.fields.apiKey.label}
        </CardTitle>

        <Button variant="link" onClick={handleRegenerateToken}>
          <ButtonIcon
            icon={RefreshCcwIcon}
            isLoading={regenerateToken.isSubmitting}
            className="w-4 h-4 mr-3"
          />
          Regenerate
        </Button>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="flex items-center justify-between">
        {!tokenClipboard.value && (
          <Alert className="w-full flex text-center items-center justify-center">
            <AlertDescription className="my-0">
              {
                dict.dashboard.settings.integrations.form.fields.alert
                  .description
              }
            </AlertDescription>
          </Alert>
        )}

        {tokenClipboard.value && (
          <>
            <strong
              className={cn([
                'transition-all ease-in-out duration-700 line-clamp-1',
                tokenIsVisible.value
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-500/80 bg-background blur-sm pointer-events-none'
                  : '',
              ])}
            >
              {tokenClipboard.value}
            </strong>
            <div className="flex items-center  space-x-4">
              {hasExternalToken && (
                <>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={tokenIsVisible.onToggle}
                  >
                    {tokenIsVisible.value ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={tokenClipboard.onCopy}
                  >
                    {tokenClipboard.isCopied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
