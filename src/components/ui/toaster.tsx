
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Check } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} variant={variant}>
            <div className="grid gap-1">
              {variant === 'success' && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-white bg-opacity-20 rounded-full">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  {title && <ToastTitle>{title}</ToastTitle>}
                </div>
              )}
              
              {variant !== 'success' && title && <ToastTitle>{title}</ToastTitle>}
              
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
