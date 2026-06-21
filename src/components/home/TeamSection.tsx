import { UsersRound } from "lucide-react";

interface TeamMember {
    name: string;
    role: string;
    image?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Nome do integrante 1",
        role: "Cargo na empresa",
    },
    {
        name: "Nome do integrante 2",
        role: "Cargo na empresa",
    },
    {
        name: "Nome do integrante 3",
        role: "Cargo na empresa",
    },
    {
        name: "Nome do integrante 4",
        role: "Cargo na empresa",
    },
];

function getInitials(name: string) {
    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word.charAt(0).toUpperCase())
        .join("");
}

export function TeamSection() {
    return (<section
        id="equipe"
        aria-labelledby="team-section-title"
        className="scroll-mt-24 border-t border-border bg-muted/30 py-16 md:py-24"
    > <div className="container-page"> <div className="mx-auto max-w-2xl text-center"> <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary"> <UsersRound
        className="h-6 w-6"
        aria-hidden="true"
    /> </div>

        ```
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Quem faz acontecer
        </p>

        <h2
            id="team-section-title"
            className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl"
        >
            Conheça a nossa equipe
        </h2>

        <p className="mt-4 leading-relaxed text-muted-foreground">
            Pessoas que trabalham com cuidado, organização e carinho para
            entregar a melhor experiência para famílias e escolas.
        </p>
    </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {TEAM_MEMBERS.map((member) => (
                    <article
                        key={`${member.name}-${member.role}`}
                        className="group rounded-[2rem] border border-border bg-card p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-primary/10 shadow-sm">
                            {member.image ? (
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <span className="font-display text-2xl font-extrabold text-primary">
                                    {getInitials(member.name)}
                                </span>
                            )}
                        </div>

                        <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                            {member.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-primary">
                            {member.role}
                        </p>
                    </article>
                ))}
            </div>
        </div>
    </section>


    );
}
