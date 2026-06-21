import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Lanchinho Feliz" },
      {
        name: "description",
        content: "Como tratamos seus dados ao usar nosso site e atendimento.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="container-page py-12 md:py-16">
      <article className="prose mx-auto max-w-3xl text-foreground">
        <h1 className="font-display text-4xl font-extrabold">Política de Privacidade</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última atualização: a definir. Texto provisório — substituir pelo
          documento oficial revisado.
        </p>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">Quais dados coletamos</h2>
            <p>
              Coletamos apenas as informações necessárias para preparar e
              entregar seu pedido: nome, contato, endereço de entrega e
              observações fornecidas no formulário.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">Como utilizamos</h2>
            <p>
              Os dados são usados para confirmar pedidos, organizar entregas e
              esclarecer dúvidas via WhatsApp. Não compartilhamos suas
              informações com terceiros sem necessidade operacional.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">Armazenamento local</h2>
            <p>
              O carrinho fica salvo apenas no seu navegador (localStorage). Você
              pode esvaziá-lo a qualquer momento.
            </p>
          </section>
          <section>
            <h2 className="font-display text-lg font-bold text-foreground">Contato</h2>
            <p>
              Em caso de dúvidas, entre em contato pelo WhatsApp para que
              possamos atendê-lo individualmente.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
