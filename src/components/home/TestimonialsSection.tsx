import {
    Quote,
    Star,
} from "lucide-react";

interface Testimonial {
    name: string;
    relationship: string;
    testimonial: string;
    image?: string;
}

const productImage = (filename: string) =>
  `/images/testemunhas/${encodeURIComponent(filename)}`;
const TESTIMONIALS: Testimonial[] = [
    {
        name: "Ana Carolina",
        relationship: "Mãe de aluno",
        testimonial:
            "Como mãe do Gabriel, sou muito grata por todo o cuidado com a alimentação dele. Além de receber refeições saudáveis, variadas e preparadas com muito carinho, ele adora a comida e os lanchinhos. Percebi também uma melhora significativa no funcionamento do intestino dele depois que passou a consumir os lanches da manhã e da tarde, o que era uma dificuldade que enfrentávamos. Saber que ele está sendo bem alimentado e recebendo uma nutrição de qualidade me traz muita tranquilidade. Esse trabalho faz toda a diferença na saúde, no desenvolvimento e no bem-estar das nossas crianças.",   
    },
    {
        name: "Techers",
        relationship: "Responsável por escola parceira",
        testimonial:
            "Aqui na TECHERS temos uma lanchonete e os produtos da Nutri4kids são nossas opções saudáveis e ao mesmo tempo muito gostosas. Os alunos amam!",
    
        image: productImage("techers.jpeg"),
    }
];




function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

export function TestimonialsSection() {
    return (<section
        id="depoimentos"
        aria-labelledby="testimonials-section-title"
        className="scroll-mt-24 bg-background py-16 md:py-24"
    > <div className="container-page"> <div className="mx-auto max-w-2xl text-center"> <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"> <Quote
        className="h-6 w-6"
        aria-hidden="true"
    /> </div>

        ```
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Experiências reais
        </p>

        <h2
            id="testimonials-section-title"
            className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
            O que dizem sobre a Nutri4Kids
        </h2>

        <p className="mt-4 leading-relaxed text-muted-foreground">
            Conheça a experiência de famílias, clientes e instituições que
            confiam no nosso trabalho.
        </p>
    </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {TESTIMONIALS.map((item) => (
                    <article
                        key={`${item.name}-${item.relationship}`}
                        className="relative flex h-full flex-col rounded-[2rem] border border-border bg-card p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <Quote
                            className="absolute right-6 top-6 h-9 w-9 text-primary/15"
                            aria-hidden="true"
                        />

                        <div
                            className="flex items-center gap-1 text-primary"
                            aria-label="Avaliação de cinco estrelas"
                        >
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className="h-4 w-4 fill-current"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>

                        <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                            “{item.testimonial}”
                        </blockquote>

                        <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-display text-sm font-bold text-primary">
                                        {getInitials(item.name)}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <p className="truncate font-display font-bold text-foreground">
                                    {item.name}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    {item.relationship}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    </section>


    );
}
