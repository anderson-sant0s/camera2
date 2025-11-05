import { useDialogComposition } from "@/components/ui/dialog";
import { useComposition } from "@/hooks/useComposition";
import { cn } from "@/lib/utils";
import * as React from "react";

function Textarea({
  className,
  onKeyDown,
  onCompositionStart,
  onCompositionEnd,
  ...props
}: React.ComponentProps<"textarea">) {
  // Obtém o contexto de composição do diálogo se disponível (no-op se não estiver dentro do Dialog)
  const dialogComposition = useDialogComposition();

  // Adiciona handlers de composição para suportar IME (método de entrada) para línguas CJK.
  const {
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
  } = useComposition<HTMLTextAreaElement>({
    onKeyDown: (e) => {
  // Verifica se é a tecla Enter que deve ser bloqueada
  const isComposing = (e.nativeEvent as any).isComposing || dialogComposition.justEndedComposing();

  // Se a tecla Enter for pressionada enquanto estiver compondo ou logo após o fim da composição,
  // não chamamos o onKeyDown do usuário (isso evita executar a lógica de negócio)
  // Observação: Para textarea, Shift+Enter ainda deve funcionar para novas linhas
      if (e.key === "Enter" && !e.shiftKey && isComposing) {
        return;
      }

      // Otherwise, call the user's onKeyDown
      onKeyDown?.(e);
    },
    onCompositionStart: e => {
      dialogComposition.setComposing(true);
      onCompositionStart?.(e);
    },
    onCompositionEnd: e => {
  // Marca que a composição acabou - isso ajuda a tratar o Enter que confirma o input
      dialogComposition.markCompositionEnd();
  // Atrasar a definição de composing para false para lidar com a ordem de eventos do Safari
  // No Safari, compositionEnd dispara antes do keydown de ESC
      setTimeout(() => {
        dialogComposition.setComposing(false);
      }, 100);
      onCompositionEnd?.(e);
    },
  });

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      onCompositionStart={handleCompositionStart}
      onCompositionEnd={handleCompositionEnd}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

export { Textarea };
