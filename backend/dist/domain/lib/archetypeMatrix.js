"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArchetypeCompatibility = getArchetypeCompatibility;
// A 'alma' da nossa análise. Uma matriz com interpretações para pares de arcanos.
const matrix = {
    // --- Combinações com O Louco (0) ---
    "0-1": {
        summary: "A união do potencial puro com o poder de manifestação.",
        details: "Uma dupla de poder iniciático. O Louco traz a energia do novo começo e a fé cega, enquanto o Mago oferece as ferramentas e a vontade para transformar esse potencial em realidade. Juntos, eles podem iniciar qualquer projeto com uma força criativa imensa, mas precisam ter cuidado para que a espontaneidade do Louco não disperse o foco do Mago."
    },
    "0-2": {
        summary: "A jornada da alma guiada pela intuição profunda.",
        details: "O Louco representa o salto no desconhecido, e a Sacerdotisa é a guardiã desse desconhecido. É uma relação profundamente intuitiva, onde a jornada externa do Louco é guiada pela sabedoria silenciosa da Sacerdotisa. O desafio é o Louco aprender a parar e ouvir, e a Sacerdotisa aceitar o movimento."
    },
    "0-3": {
        summary: "O potencial que encontra um terreno fértil para florescer.",
        details: "A energia criativa e abundante da Imperatriz oferece um ambiente seguro e nutritivo para a jornada espontânea do Louco. Ele traz novas ideias e ela as transforma em algo tangível e belo. Uma conexão de grande criatividade e crescimento, desde que a impulsividade do Louco não perturbe a paz da Imperatriz."
    },
    "0-4": {
        summary: "O eterno conflito e complemento entre a liberdade e a estrutura.",
        details: "Esta é a dinâmica clássica do espírito livre contra o sistema. O Imperador tenta colocar ordem e regras na jornada caótica do Louco. Se conseguirem se equilibrar, o Imperador dá uma direção segura ao Louco, e o Louco impede que o Imperador se torne rígido demais. É uma relação de constante aprendizado."
    },
    "0-5": {
        summary: "O confronto entre a fé pessoal e a doutrina tradicional.",
        details: "O Louco segue sua própria verdade, enquanto o Hierofante segue as regras e tradições estabelecidas. Esta relação pode ser de grande ensinamento, onde o Hierofante aprende sobre a fé genuína e o Louco aprende com a sabedoria do passado. O risco é um tentar converter o outro, gerando conflito."
    },
    "0-6": {
        summary: "A espontaneidade que encontra uma escolha fundamental do coração.",
        details: "O Louco salta, e os Enamorados precisam escolher para onde saltar. O Louco pode inspirar os Enamorados a fazerem uma escolha mais autêntica e corajosa, enquanto os Enamorados podem dar um propósito e um vínculo ao caminho sem rumo do Louco. Juntos, aprendem sobre a liberdade de escolher com o coração."
    },
    "0-7": {
        summary: "A energia pura do movimento, direcionada ou espontânea.",
        details: "Ambos são arcanos de movimento. O Louco se move pela fé, sem destino certo. O Carro se move com foco e vontade, em direção a uma conquista. O Carro pode dar um objetivo à jornada do Louco, mas corre o risco de tentar controlar demais sua espontaneidade. Se alinhados, o avanço é rápido e destemido."
    },
    // --- Combinações com O Mago (1) ---
    "1-2": {
        summary: "A união do poder ativo e passivo, do consciente e do inconsciente.",
        details: "O Mago age no mundo exterior, enquanto a Sacerdotisa guarda o interior. São as duas faces da mesma moeda mágica. Juntos, eles formam uma aliança poderosa onde a intuição da Sacerdotisa guia a ação do Mago. O desafio é a comunicação entre o que é dito e o que é sentido."
    },
    "1-3": {
        summary: "A parceria de manifestação e criação mais poderosa do Tarô.",
        details: "O Mago traz a faísca da vontade e as ferramentas, enquanto a Imperatriz oferece o útero fértil da criatividade. Juntos, eles podem transformar qualquer ideia em uma realidade abundante e bela. É a união da vontade (masculino) com a criação (feminino)."
    },
    "1-4": {
        summary: "A vontade que se une à estrutura para construir impérios.",
        details: "O Mago tem o poder de iniciar, e o Imperador tem o poder de estruturar e manter. É uma combinação de grande poder e realização no mundo material. O Mago é o arquiteto com a visão, e o Imperador é o engenheiro que constrói a obra. Relação com imenso potencial para o sucesso."
    },
    "1-5": {
        summary: "O poder pessoal em diálogo com a sabedoria tradicional.",
        details: "O Mago manifesta através de sua vontade individual, enquanto o Hierofante ensina através de sistemas estabelecidos. Podem ser grandes aliados, onde o Mago inova sobre as bases que o Hierofante provê. O conflito surge se a vontade do Mago desafiar diretamente os dogmas do Hierofante."
    },
    "1-6": {
        summary: "A ação direcionada que ajuda a resolver a dúvida do coração.",
        details: "O Mago, com seu foco e clareza, pode oferecer aos Enamorados a determinação necessária para fazer uma escolha importante. Os Enamorados, por sua vez, ensinam ao Mago que a vontade deve estar alinhada com os valores do coração. Uma relação que promove clareza e decisões autênticas."
    },
    "1-7": {
        summary: "Uma combinação de pura força de vontade e ação direcionada.",
        details: "Ambos são mestres da vontade. O Mago foca a energia, e o Carro a coloca em movimento para a conquista. É uma dupla de alta performance, focada em objetivos e sucesso. O principal desafio é garantir que ambos estejam indo na mesma direção e não competindo pelo controle."
    },
    "1-8": {
        summary: "O poder da manifestação guiado pela verdade e pela ética.",
        details: "O Mago tem o poder de criar, e a Justiça garante que essa criação seja equilibrada e correta. A Justiça oferece ao Mago a clareza e a ética necessárias para usar seu poder de forma responsável. Juntos, eles podem realizar grandes feitos de forma justa e íntegra."
    },
    "1-9": {
        summary: "A dinâmica entre o poder da ação e a sabedoria da introspecção.",
        details: "O Mago quer agir e manifestar no mundo, enquanto o Eremita busca respostas na solidão. O Eremita pode oferecer a sabedoria que guia as ações do Mago, e o Mago pode ajudar o Eremita a trazer suas descobertas internas para o mundo real de forma prática."
    },
    // --- Combinações com A Sacerdotisa (2) ---
    "2-3": {
        summary: "A união dos dois grandes arquétipos do feminino: o intuitivo e o criativo.",
        details: "A Sacerdotisa representa a sabedoria interior e o potencial não manifesto, enquanto a Imperatriz é a manifestação da criação no mundo. Juntas, elas formam um ciclo completo de concepção (Sacerdotisa) e nascimento (Imperatriz). É uma relação de profunda nutrição e criatividade intuitiva."
    },
    "2-5": {
        summary: "O encontro entre a fé interior e a religião exterior.",
        details: "A Sacerdotisa guarda o conhecimento esotérico (oculto), enquanto o Hierofante ensina o conhecimento exotérico (revelado). É uma relação que explora a espiritualidade por dois caminhos complementares. O perigo está no conflito entre a intuição pessoal e o dogma institucional."
    },
    "2-6": {
        summary: "A escolha do coração guiada pela voz silenciosa da intuição.",
        details: "Os Enamorados enfrentam uma escolha, e a Sacerdotisa detém a sabedoria subconsciente para guiá-los. Esta conexão favorece decisões profundas e verdadeiras, que vão além da lógica superficial. A Sacerdotisa ensina aos Enamorados a ouvir a voz interior."
    },
    "2-7": {
        summary: "A tensão entre o movimento interior e a ação exterior.",
        details: "O Carro quer avançar a todo custo, enquanto a Sacerdotisa pede pausa e reflexão. É uma dinâmica desafiadora que ensina o equilíbrio. O Carro precisa aprender a consultar seu guia interior (Sacerdotisa) antes de partir, para garantir que está indo na direção certa."
    },
    "2-9": {
        summary: "Uma conexão de profundo silêncio, sabedoria e introspecção.",
        details: "Ambos são mestres do mundo interior. Esta é uma relação de almas que não precisa de muitas palavras. Eles se entendem no silêncio e na busca por conhecimento. O desafio é garantir que a relação não se torne tão internalizada a ponto de se desconectar do mundo prático."
    },
    // --- Combinações com A Imperatriz (3) ---
    "3-4": {
        summary: "A união arquetípica da Mãe e do Pai, da criação e da estrutura.",
        details: "A Imperatriz cria e nutre, enquanto o Imperador estrutura e protege. Juntos, eles formam o alicerce de qualquer projeto, família ou império. É uma parceria de estabilidade e crescimento, onde a abundância encontra a ordem para prosperar de forma segura e duradoura."
    },
    "3-5": {
        summary: "A criatividade da natureza em harmonia com os valores da tradição.",
        details: "A Imperatriz representa a sabedoria do corpo e da terra, enquanto o Hierofante representa a sabedoria das instituições e do espírito. Juntos, eles podem criar estruturas (famílias, comunidades) com valores fortes e um ambiente nutritivo. A conexão une o sagrado e o terreno."
    },
    "3-6": {
        summary: "A escolha que leva à criação e à abundância nos relacionamentos.",
        details: "A energia nutritiva da Imperatriz apoia os Enamorados a fazerem uma escolha que gere frutos e beleza. É uma combinação que favorece a construção de um relacionamento ou parceria fértil, onde o amor não é apenas uma ideia, mas algo que é cuidado e que cresce no mundo material."
    },
    "3-7": {
        summary: "A união da criatividade abundante com a vontade de conquistar.",
        details: "O Carro fornece a direção e a ambição para levar a criatividade da Imperatriz ao mundo. Ela cria os 'bens', e ele os leva ao 'mercado'. É uma parceria com grande potencial para sucesso material e expansão, desde que a pressa do Carro não atropele o ritmo natural de crescimento da Imperatriz."
    },
    "3-10": {
        summary: "A abundância que flui com os ciclos naturais da vida.",
        details: "A Imperatriz entende os ciclos da natureza, e a Roda da Fortuna representa os ciclos do destino. Esta é uma combinação que ensina a aceitar os altos e baixos. Haverá tempos de colheita farta e tempos de descanso. A sabedoria está em aproveitar a abundância quando ela chega e ter paciência quando a roda gira."
    },
    "3-11": {
        summary: "A união do poder de criar com a coragem de proteger e sustentar.",
        details: "A Imperatriz é a criadora, e a Força é a guardiã resiliente. Juntas, elas representam um poder feminino completo: a capacidade de gerar e nutrir, e a coragem interior para defender suas criações contra qualquer adversidade. É uma combinação de amor e imensa resiliência."
    },
    "3-14": {
        summary: "A criatividade que encontra o equilíbrio e a harmonia perfeitos.",
        details: "A Temperança traz a paciência e o equilíbrio necessários para a energia criativa da Imperatriz se manifestar da forma mais bela e sustentável. Não há excessos, apenas um fluxo constante e harmonioso de criação e cuidado. Uma parceria de grande beleza e serenidade."
    },
    // --- Combinações com O Imperador (4) ---
    "4-7": {
        summary: "Uma aliança poderosa de estrutura e ambição direcionada.",
        details: "O Imperador estabelece o reino e as regras, e o Carro parte para expandir suas fronteiras. É uma combinação de imenso poder e conquista. A estrutura do Imperador dá ao Carro uma base sólida para suas campanhas, garantindo que suas vitórias sejam duradouras."
    },
    "4-8": {
        summary: "A união da lei e da ordem com a verdade e a ética.",
        details: "Esta é a base de um sistema justo. O Imperador cria as leis, e a Justiça garante que elas sejam aplicadas com imparcialidade e clareza. É uma relação baseada em lógica, fatos e responsabilidade. Juntos, eles criam estruturas que são não apenas fortes, mas também corretas."
    },
    "4-10": {
        summary: "A estrutura que enfrenta o desafio da mudança inevitável.",
        details: "O Imperador busca a estabilidade e o controle permanentes, enquanto a Roda da Fortuna representa a impermanência e os ciclos do destino. Esta é uma relação de aprendizado, onde o Imperador precisa aprender a adaptar suas estruturas para sobreviver às reviravoltas da vida."
    },
    // --- Combinações com O Hierofante (5) ---
    "5-6": {
        summary: "A escolha do coração confrontada ou abençoada pela tradição.",
        details: "O Hierofante representa as regras e o caminho tradicional, enquanto os Enamorados representam a escolha pessoal baseada em valores internos. Esta dinâmica questiona: a sua escolha se alinha com o que é esperado de você? O Hierofante pode dar um senso de segurança à escolha, mas também pode representar a pressão social contra uma união 'não convencional'."
    },
    "5-7": {
        summary: "A tradição que dá um propósito ou restringe o avanço.",
        details: "O Carro busca a vitória e o avanço pessoal. O Hierofante oferece um caminho testado e aprovado para essa vitória. Se o condutor do Carro seguir as regras, seu sucesso é quase garantido. Porém, se sua ambição o levar a questionar as tradições, ele pode entrar em conflito direto com as estruturas representadas pelo Hierofante."
    },
    "5-9": {
        summary: "O eterno diálogo entre o conhecimento externo e a sabedoria interna.",
        details: "O Hierofante é o professor que transmite o conhecimento de uma linhagem. O Eremita é o sábio que encontra a verdade na solidão. Juntos, eles representam as duas principais formas de aprendizado. É uma relação de profundo respeito intelectual, onde um busca fora e o outro, dentro, para chegar às mesmas verdades universais."
    },
    "5-16": {
        summary: "A quebra dogmática: quando a tradição é abalada pela verdade súbita.",
        details: "O Hierofante representa a estrutura de crenças sólida. A Torre é o raio que destrói essa estrutura se ela for falsa ou rígida demais. É uma combinação explosiva que representa uma crise de fé, onde dogmas antigos são quebrados por uma revelação chocante, forçando a reconstrução de um novo sistema de valores."
    },
    // --- Combinações com Os Enamorados (6) ---
    "6-7": {
        summary: "A escolha que impulsiona a ação e a conquista.",
        details: "Uma vez que os Enamorados fazem sua escolha de coração, o Carro fornece a energia e a determinação para levar essa decisão adiante com força total. É a união do 'porquê' com o 'como'. Uma parceria que, após a decisão ser tomada, avança de forma imparável."
    },
    "6-9": {
        summary: "A busca interior pela sabedoria para fazer a escolha certa.",
        details: "Os Enamorados precisam fazer uma escolha, e o Eremita se retira para encontrar a verdade. O Eremita oferece aos Enamorados a sabedoria introspectiva necessária para que sua decisão não seja superficial, mas sim profundamente alinhada com a alma. É uma pausa reflexiva antes de um grande passo."
    },
    "6-12": {
        summary: "Uma escolha que exige sacrifício e uma nova perspectiva sobre o amor.",
        details: "Esta combinação indica que a escolha a ser feita não é fácil e exige uma rendição. O Enforcado pede aos Enamorados que pausem e olhem para a situação de um ângulo completamente diferente, talvez sacrificando um desejo egoísta por um bem maior na relação."
    },
    "6-15": {
        summary: "A escolha entre um amor autêntico e uma paixão aprisionadora.",
        details: "Os Enamorados buscam uma união de almas, enquanto o Diabo representa a atração baseada em apego, desejo e codependência. Esta dinâmica testa a natureza do vínculo: é uma escolha livre e baseada em valores, ou uma conexão baseada em necessidade e medo de ficar só?"
    },
    // --- Combinações com O Carro (7) ---
    "7-8": {
        summary: "A ambição guiada pela ética e pela responsabilidade.",
        details: "O Carro quer vencer, e a Justiça garante que a vitória seja justa. A Justiça age como o 'código de conduta' para a ambição do Carro, lembrando que toda ação tem uma consequência. Juntos, eles representam uma conquista ética e bem-sucedida."
    },
    "7-13": {
        summary: "O avanço que leva a uma transformação inevitável.",
        details: "O Carro em seu caminho de conquista encontra a Morte, que simboliza o fim necessário de uma fase. Isso pode significar que o próprio objetivo da conquista precisa mudar, ou que para alcançar a vitória, uma parte antiga de si mesmo deve ser deixada para trás. É o movimento que força a transformação."
    },
    "7-16": {
        summary: "A ambição desenfreada que leva a uma ruptura súbita.",
        details: "Se o Carro avança com excesso de ego e sem considerar as fundações, ele está em rota de colisão com a Torre. Esta combinação alerta para uma crise causada por uma ambição cega. É a queda do conquistador que construiu seu império sobre bases frágeis."
    },
    "7-21": {
        summary: "A jornada de conquista que chega à sua realização plena.",
        details: "Esta é a combinação da jornada e do destino. O Carro representa a determinação para chegar lá, e o Mundo é a chegada triunfante. Juntos, eles simbolizam a conclusão bem-sucedida de um grande projeto ou ciclo de vida através da força de vontade e do esforço direcionado."
    },
    // --- Combinações com A Justiça (8) ---
    "8-9": {
        summary: "A busca pela verdade, tanto no mundo externo quanto no interno.",
        details: "A Justiça busca a verdade através de fatos e lógica, enquanto o Eremita a busca através da introspecção. Juntos, eles formam uma investigação completa. É uma parceria que valoriza a honestidade, a integridade e a sabedoria acima de tudo."
    },
    "8-10": {
        summary: "A lei de causa e efeito em ação através dos ciclos do destino.",
        details: "A Justiça representa o karma ('você colhe o que planta'), e a Roda da Fortuna é o mecanismo que entrega essa colheita. Esta combinação mostra que as mudanças do destino não são aleatórias, mas sim consequências diretas de ações passadas, trazendo equilíbrio ao universo."
    },
    "8-12": {
        summary: "A necessidade de pausar e reavaliar para tomar a decisão correta.",
        details: "A Justiça precisa tomar uma decisão, mas o Enforcado sugere que a perspectiva atual é limitada. É um chamado para suspender o julgamento, olhar a situação de outro ângulo e fazer um sacrifício (talvez do próprio orgulho) para alcançar a verdadeira clareza e tomar uma decisão realmente justa."
    },
    "8-20": {
        summary: "A avaliação racional que leva a um renascimento e absolvição.",
        details: "A Justiça avalia os atos passados com lógica, e o Julgamento oferece a chance de perdão e renascimento a partir dessa avaliação. É uma combinação que fala sobre acertar as contas com o passado de forma honesta para poder seguir para um novo nível de consciência, livre de culpas antigas."
    },
    // --- Combinações com O Eremita (9) ---
    "9-10": {
        summary: "A sabedoria interior que ajuda a navegar as mudanças da vida.",
        details: "A Roda da Fortuna traz mudanças constantes, e o Eremita, com sua luz interior, oferece a sabedoria para entender e navegar esses ciclos. O Eremita não é abalado pelo sobe e desce da Roda, pois sua estabilidade vem de dentro. Uma relação que encontra paz em meio à impermanência."
    },
    "9-12": {
        summary: "Uma dupla de profunda introspecção e inação contemplativa.",
        details: "Ambos os arcanos representam uma retirada do mundo exterior. O Eremita se retira para buscar, e o Enforcado se retira para ver. É uma conexão de grande profundidade espiritual e filosófica. O risco é que ambos fiquem tão imersos na contemplação que a ação no mundo real seja completamente negligenciada."
    },
    "9-18": {
        summary: "A jornada da sabedoria através das profundezas do inconsciente.",
        details: "O Eremita usa sua lanterna (consciência) para iluminar o território misterioso e muitas vezes assustador da Lua (o subconsciente). É uma combinação poderosa para terapia, autoanálise e para trazer à luz medos e padrões ocultos. O Eremita é o guia seguro nesta jornada noturna."
    },
    // --- Combinações com A Roda da Fortuna (10) ---
    "10-13": {
        summary: "A mudança de ciclo que culmina em uma transformação final.",
        details: "A Roda gira, indicando o fim de uma fase, e a Morte vem para oficializar essa conclusão. É um sinal poderoso de que uma mudança significativa não é apenas provável, mas necessária e inevitável para que a renovação possa acontecer. É o fim de um capítulo, decretado pelo destino."
    },
    "10-15": {
        summary: "O ciclo de repetição de padrões e apegos.",
        details: "Esta combinação alerta para o risco de estar preso em um ciclo vicioso. A Roda continua girando, mas o apego representado pelo Diabo impede o verdadeiro progresso, fazendo com que a pessoa repita os mesmos erros e situações. A quebra deste padrão exige uma tomada de consciência."
    },
    "10-20": {
        summary: "Uma virada do destino que força um despertar e uma reavaliação.",
        details: "Uma mudança externa (Roda da Fortuna) aciona um chamado interno profundo (Julgamento). Pode ser um evento inesperado que força uma reavaliação completa da vida, levando a um renascimento e a um novo propósito. O destino chama, e a alma responde."
    },
    // --- Combinações com A Força (11) ---
    "11-13": {
        summary: "A coragem interior para enfrentar e aceitar uma transformação profunda.",
        details: "A Força provê a resiliência e a coragem necessárias para encarar o fim de um ciclo representado pela Morte. Não se trata de lutar contra o inevitável, mas de ter a força espiritual para desapegar com graça e aceitar a renovação que se segue. Uma combinação de imensa resiliência perante as grandes transformações da vida."
    },
    "11-14": {
        summary: "A união do poder interior com o equilíbrio e a moderação.",
        details: "A Força domina as paixões internas, e a Temperança as equilibra. Juntos, eles representam a maestria emocional e espiritual. É a capacidade de usar sua força com paciência e moderação, sem excessos, criando um estado de harmonia e poder controlado."
    },
    "11-15": {
        summary: "A coragem de confrontar e dominar os próprios apegos e sombras.",
        details: "Esta é a batalha direta contra as correntes internas. A Força é a coragem e a compaixão necessárias para domar o 'leão' do Diabo – nossos vícios, medos e apegos. É uma combinação que indica a capacidade de alcançar a libertação através de um profundo trabalho de autoconhecimento e força de vontade."
    },
    "11-17": {
        summary: "A resiliência que alimenta a esperança, e a esperança que renova a força.",
        details: "Após um período de luta e coragem (A Força), vem a cura e a fé renovada (A Estrela). É uma combinação que mostra que a resiliência nos leva a um lugar de paz e inspiração. A força para superar os desafios é recompensada com um período de calma e otimismo."
    },
    // --- Combinações com O Enforcado (12) ---
    "12-13": {
        summary: "A rendição que precede a transformação final.",
        details: "O Enforcado representa a pausa e a rendição, e a Morte é o fim do ciclo que se segue. Esta combinação indica que, para que a transformação ocorra, é preciso primeiro parar de lutar, soltar o controle e aceitar a situação. A rendição voluntária permite que o ciclo termine de forma natural e menos dolorosa."
    },
    "12-14": {
        summary: "A pausa para encontrar uma nova perspectiva de equilíbrio.",
        details: "Ambos os arcanos buscam um estado de harmonia. O Enforcado o faz através da inação e da mudança de perspectiva, enquanto a Temperança o faz através da mistura e moderação. Juntos, eles indicam um período de reavaliação paciente para encontrar um novo ponto de equilíbrio na vida."
    },
    "12-16": {
        summary: "A suspensão antes da queda inevitável.",
        details: "O Enforcado representa a sensação de estar em um impasse, e a Torre é a ruptura súbita que resolve essa estagnação de forma chocante. Esta combinação pode indicar um período de espera tenso, sabendo que uma crise é iminente, mas necessária para quebrar as velhas estruturas e permitir o progresso."
    },
    "12-19": {
        summary: "A clareza e a alegria que chegam após um período de sacrifício e nova perspectiva.",
        details: "Após a pausa e a rendição do Enforcado, o Sol brilha, trazendo clareza, sucesso e felicidade. Esta combinação mostra que o sacrifício de olhar para as coisas de uma nova maneira é recompensado com uma compreensão profunda e um período de grande vitalidade e otimismo."
    },
    // --- Combinações com A Morte (13) ---
    "13-14": {
        summary: "A transformação que leva a um novo estado de equilíbrio.",
        details: "Após o fim de um ciclo (Morte), a Temperança surge para integrar as mudanças e criar uma nova harmonia. É o processo de cura e reajuste após uma grande transformação, encontrando um novo equilíbrio com as peças que restaram."
    },
    "13-15": {
        summary: "A transformação que força a confrontar e liberar apegos profundos.",
        details: "A Morte vem para encerrar um ciclo, e isso muitas vezes significa cortar as correntes do Diabo. Esta combinação indica que a transformação requer o desapego de vícios, padrões ou relacionamentos que te prendem. É uma libertação dolorosa, mas necessária."
    },
    "13-17": {
        summary: "A esperança e a cura que surgem após o fim de um ciclo.",
        details: "Esta é a luz no fim do túnel. A Morte representa o fim, e a Estrela é a promessa de renovação e esperança que se segue. É a garantia de que, mesmo após as perdas mais difíceis, um período de calma, cura e fé no futuro está por vir."
    },
    "13-21": {
        summary: "O fim de um ciclo que leva à conclusão e realização de outro.",
        details: "Esta é a sequência final de uma grande jornada. A Morte encerra o capítulo anterior de forma definitiva, permitindo que o Mundo se manifeste como a conclusão bem-sucedida e a integração de todas as lições aprendidas. Para que um mundo termine, outro deve começar."
    },
    // --- Combinações com A Temperança (14) ---
    "14-15": {
        summary: "A luta entre o equilíbrio e o excesso, a moderação e o apego.",
        details: "A Temperança busca o caminho do meio e a harmonia, enquanto o Diabo representa os excessos e os desejos descontrolados. Esta é uma dinâmica de autocontrole, onde a lição é encontrar o equilíbrio sem cair nas tentações do apego ou reprimir completamente a própria natureza passional."
    },
    "14-16": {
        summary: "O equilíbrio que é subitamente quebrado por uma crise.",
        details: "A Temperança representa um estado de harmonia cuidadosamente construído, e a Torre é o evento inesperado que o destrói. Isso pode indicar que o equilíbrio era frágil ou baseado em premissas falsas, e a crise vem para forçar a criação de uma harmonia mais autêntica e resiliente."
    },
    "14-18": {
        summary: "A busca pelo equilíbrio em meio às incertezas e emoções do inconsciente.",
        details: "A Lua traz à tona emoções e medos profundos, e a Temperança oferece a paciência e a habilidade para integrar essas energias sem se afogar nelas. É o processo de alquimia emocional, de misturar luz e sombra para encontrar a paz interior."
    },
    "14-20": {
        summary: "O equilíbrio e a paciência que levam a um chamado para o renascimento.",
        details: "Através de um longo processo de integração e equilíbrio (Temperança), a alma se torna pronta para ouvir um chamado mais elevado (Julgamento). É a harmonia interna que permite o despertar para um novo nível de consciência e propósito."
    },
    // --- Combinações com O Diabo (15) ---
    "15-16": {
        summary: "A libertação explosiva de um apego insustentável.",
        details: "O Diabo representa o apego a uma estrutura ou crença limitante. A Torre é a força externa que destrói essa prisão. É uma combinação que fala de uma libertação súbita e chocante, onde uma crise externa força o rompimento de correntes que a pessoa não conseguia quebrar por conta própria."
    },
    "15-17": {
        summary: "A esperança que surge após o confronto com a própria sombra.",
        details: "Para alcançar a cura e a fé renovada da Estrela, primeiro é preciso confrontar os apegos e medos do Diabo. Esta combinação mostra a jornada de sair da escuridão do vício ou da negatividade para encontrar a luz da esperança e da inspiração. É a libertação que leva à serenidade."
    },
    "15-19": {
        summary: "A clareza que expõe e dissolve os apegos.",
        details: "A luz brilhante e a verdade do Sol têm o poder de expor as ilusões e os medos representados pelo Diabo. A clareza e a alegria de viver do Sol são o antídoto perfeito para as correntes do apego. Onde o Sol brilha, as sombras do Diabo não conseguem se esconder."
    },
    // --- Combinações com A Torre (16) ---
    "16-17": {
        summary: "A esperança e a calma que seguem uma grande crise.",
        details: "A Torre é a tempestade, e a Estrela é a serenidade que vem depois. É a combinação clássica da crise e da cura. A destruição súbita abre espaço para um período de paz, fé renovada e inspiração, mostrando que mesmo após os eventos mais chocantes, a esperança renasce."
    },
    "16-18": {
        summary: "A crise externa que revela medos e ilusões internas.",
        details: "A Torre destrói as seguranças externas, forçando uma jornada pelo território incerto da Lua. A perda de estruturas materiais pode ativar ansiedades e confusões profundas, exigindo que a pessoa navegue por suas emoções e intuições para encontrar um novo caminho no escuro."
    },
    "16-19": {
        summary: "A revelação súbita que traz uma clareza libertadora.",
        details: "O raio da Torre não apenas destrói, ele ilumina. Esta combinação representa o 'momento eureca', uma verdade chocante que, apesar da crise, traz uma clareza imensa e libertadora. A queda da estrutura falsa permite que a verdade do Sol brilhe sem impedimentos."
    },
    "16-20": {
        summary: "Uma crise externa que força um despertar espiritual.",
        details: "Um evento chocante (A Torre) serve como o chamado da trombeta do Julgamento. É uma 'chamada para acordar' que força uma reavaliação completa da vida e dos próprios valores, levando a um renascimento a partir das cinzas da estrutura antiga."
    },
    // --- Combinações com A Estrela (17) ---
    "17-20": {
        summary: "A inspiração e a fé que preparam para um grande chamado espiritual.",
        details: "A Estrela representa a conexão com o divino e a inspiração. O Julgamento é o chamado para agir a partir dessa conexão. É um período de fé e clareza que culmina em uma decisão de seguir um propósito maior, de renascer para uma nova fase da vida alinhada com a alma."
    },
    "17-21": {
        summary: "A esperança e a inspiração que culminam na realização plena.",
        details: "A fé no caminho (A Estrela) leva à chegada bem-sucedida ao destino (O Mundo). Esta combinação representa a jornada ideal, onde a inspiração contínua e a esperança sustentam o viajante até que ele complete seu ciclo e alcance um estado de totalidade e celebração."
    },
    // --- Combinações com A Lua (18) ---
    "18-19": {
        summary: "A clareza que dissipa a ilusão, a consciência que ilumina o inconsciente.",
        details: "A Lua representa o mundo dos sonhos, medos e intuição, enquanto o Sol representa a clareza, a lógica e a consciência. Juntos, eles são a jornada da noite para o dia. É o processo de trazer os medos e as verdades do subconsciente para a luz da razão, encontrando a verdade e a alegria plenas."
    },
    "18-20": {
        summary: "O despertar que vem das profundezas da alma e do inconsciente.",
        details: "O chamado do Julgamento não vem de fora, mas das profundezas da psique, o reino da Lua. Esta combinação indica que sonhos, intuições e emoções reprimidas estão vindo à tona para forçar uma reavaliação e um renascimento. É preciso ouvir as mensagens do subconsciente."
    },
    "18-21": {
        summary: "A integração do inconsciente para alcançar a totalidade.",
        details: "Para alcançar a realização do Mundo, é preciso fazer as pazes com o território da Lua. Esta combinação mostra que a conclusão bem-sucedida de um ciclo requer a integração de nossas emoções, intuições e até mesmo nossos medos. A verdadeira totalidade abraça tanto a luz quanto a sombra."
    },
    // --- Combinações com O Sol (19) ---
    "19-20": {
        summary: "A clareza e o sucesso que levam a um chamado para um novo propósito.",
        details: "Após um período de grande sucesso e clareza (O Sol), surge um chamado para evoluir ainda mais (O Julgamento). Não se trata de abandonar o sucesso, mas de usá-lo como plataforma para um renascimento, para um novo nível de contribuição e consciência no mundo."
    },
    "19-21": {
        summary: "A celebração máxima do sucesso e da realização.",
        details: "Esta é talvez a combinação mais positiva e auspiciosa. O Sol representa o sucesso e a alegria, e o Mundo representa a conclusão e a integração. Juntos, eles indicam a realização plena e a celebração de um grande ciclo de vida, vivido com vitalidade e sabedoria."
    },
    // --- Combinações com O Julgamento (20) ---
    "20-21": {
        summary: "O renascimento final que leva à conclusão e integração.",
        details: "O Julgamento é o penúltimo passo, o despertar e o perdão do passado. O Mundo é o passo final, a celebração da chegada. Esta combinação representa as etapas finais de uma grande jornada, onde a autoavaliação leva à libertação, e a libertação leva à realização plena."
    },
    // --- Preenchendo mais combinações importantes ---
    "0-8": {
        summary: "A espontaneidade que encontra a necessidade de responsabilidade.",
        details: "O Louco age por impulso e fé, enquanto a Justiça exige clareza, fatos e a aceitação das consequências. Esta é uma relação de amadurecimento, onde o Louco é convidado a refletir sobre o impacto de suas ações, e a Justiça aprende que nem tudo pode ser previsto ou controlado pela lógica."
    },
    "0-11": {
        summary: "A fé cega do início da jornada amparada pela coragem interior.",
        details: "Para dar o 'salto de fé', o Louco precisa da Força interior. A Força aqui não restringe o Louco, mas lhe dá a resiliência e a coragem para enfrentar os medos que surgem no caminho desconhecido. É a união da espontaneidade com a bravura da alma."
    },
    "0-21": {
        summary: "O início e o fim da jornada em perfeita harmonia.",
        details: "Esta combinação representa o ciclo completo da autodescoberta, o Alfa e o Ômega. O Louco inicia a jornada com potencial puro, e o Mundo a conclui com total integração e realização. Juntos, eles simbolizam a totalidade da experiência, lembrando que cada fim é um novo começo disfarçado."
    },
    "1-13": {
        summary: "O poder de manifestar que encontra a força da transformação inevitável.",
        details: "O Mago usa sua vontade para criar e controlar, mas a Morte representa uma força de transformação que está além de seu controle. Esta relação ensina ao Mago que o verdadeiro poder não está em prevenir os fins, mas em usar suas habilidades para navegar e reconstruir após um ciclo ter se encerrado."
    },
    "1-18": {
        summary: "A mente consciente que tenta dar forma aos mistérios do subconsciente.",
        details: "O Mago, mestre da lógica e da ação focada, encontra o reino da Lua, um lugar de sonhos, intuições e ilusões. É uma combinação poderosa para artistas e criadores, onde o Mago tenta traduzir as visões e sentimentos da Lua em algo tangível. O desafio é não se perder na confusão ou na autoilusão."
    },
    "2-8": {
        summary: "A união da intuição com a lógica para alcançar a verdade completa.",
        details: "A Sacerdotisa conhece a verdade interior, e a Justiça busca a verdade exterior através de fatos. Juntas, elas formam uma capacidade de julgamento impecável, que equilibra o sentimento com a razão. Uma parceria de profunda integridade e clareza."
    },
    "2-17": {
        summary: "A intuição silenciosa que se conecta com a esperança universal.",
        details: "Ambos são arcanos de energia feminina, passiva e espiritual. A Sacerdotisa é o canal para a sabedoria interior, e a Estrela é o canal para a inspiração e a fé cósmica. É uma conexão de profunda paz, cura e sintonia espiritual, um oásis de serenidade."
    },
    "3-8": {
        summary: "A criação abundante governada pelos princípios do equilíbrio e da justiça.",
        details: "A Imperatriz quer criar e nutrir sem limites, enquanto a Justiça exige que tudo seja feito de forma equilibrada e justa. Juntos, eles podem criar projetos ou famílias onde a abundância é distribuída de forma correta e as decisões são tomadas pensando no bem-estar de todos."
    },
    "3-13": {
        summary: "Os ciclos da natureza: a criação que encontra o fim para renovação.",
        details: "A Imperatriz é a primavera e o verão, a explosão da vida. A Morte é o outono e o inverno, o fim do ciclo que permite que a terra descanse para florescer novamente. Esta combinação é um poderoso lembrete dos ciclos naturais de criação, destruição e renascimento."
    },
    "3-20": {
        summary: "A energia criativa que é chamada para um novo e mais elevado propósito.",
        details: "Após um período de criação e nutrição no plano material (A Imperatriz), o Julgamento soa como um chamado para elevar essa energia criativa a um nível espiritual. Pode ser a transição de criar uma família para guiar uma comunidade, ou de um projeto material para um legado."
    },
    "4-13": {
        summary: "A estrutura rígida que é forçada a se transformar.",
        details: "O Imperador busca criar estruturas eternas e imutáveis. A Morte vem para lembrá-lo de que nada é permanente. Esta combinação representa o fim de uma estrutura de poder, de um trabalho ou de uma forma de vida que se tornou rígida demais, forçando uma transformação profunda para que algo novo possa ser construído."
    },
    "4-16": {
        summary: "A queda do império construído sobre fundações frágeis.",
        details: "Esta é uma combinação de crise de autoridade. Se a estrutura do Imperador foi construída com base em ego, controle excessivo e desonestidade (fundações frágeis), a Torre vem para destruí-la de forma súbita e chocante. É a queda de um tirano ou o colapso de um sistema falido."
    },
    "5-8": {
        summary: "A união da lei moral com a lei civil para um sistema completo.",
        details: "O Hierofante representa as regras da tradição e da fé, enquanto a Justiça representa as regras da lógica e da ética. Juntos, eles formam um sistema de governança completo, que busca o que é moralmente e factualmente correto. Uma parceria baseada em princípios e integridade."
    },
    "5-13": {
        summary: "O fim de uma tradição ou sistema de crenças.",
        details: "A Morte nesta combinação aponta para o fim de um dogma, de uma tradição ou de uma afiliação a um grupo que não serve mais ao crescimento espiritual. É o momento de abandonar velhas crenças para que uma nova filosofia de vida, mais autêntica, possa surgir."
    },
    "5-21": {
        summary: "O ensino tradicional que leva à integração e à compreensão completa.",
        details: "Esta combinação mostra o sucesso do caminho do aprendizado. Ao seguir os ensinamentos e as tradições do Hierofante, o indivíduo alcança um estado de totalidade e integração com o mundo, compreendendo seu lugar no grande esquema das coisas. A lição foi aprendida e a jornada, concluída."
    },
    // --- Combinações com A Força (11), continuação ---
    "11-20": {
        summary: "A coragem interior que atende a um chamado para o despertar.",
        details: "O Julgamento é um chamado para a alma evoluir, e a Força provê a coragem necessária para atender a esse chamado, especialmente se ele exigir perdoar o passado ou enfrentar velhas feridas. É a resiliência que permite o renascimento."
    },
    // --- Combinações com A Morte (13), continuação ---
    "13-18": {
        summary: "O fim de um ciclo que revela medos e incertezas profundas.",
        details: "A Morte remove uma estrutura de segurança, forçando uma jornada pelo terreno desconhecido da Lua. O fim de um relacionamento ou emprego pode trazer à tona medos sobre o futuro, exigindo que se navegue pela incerteza com intuição."
    },
    // --- Combinações de Pares Iguais (mais exemplos) ---
    "0-0": {
        summary: "Uma aventura de espontaneidade pura, com risco de caos.",
        details: "Dois Loucos juntos criam uma relação de liberdade absoluta e aventura constante. Não há planos, apenas o salto de fé no momento presente. Pode ser incrivelmente libertador e divertido, mas o desafio é a falta de qualquer estabilidade ou direção, o que pode levar a um caos imprudente."
    },
    "4-4": {
        summary: "Uma fortaleza de estabilidade, com potencial para uma luta de poder.",
        details: "Dois Imperadores juntos podem construir um império de ordem e segurança inabaláveis. A lógica e a disciplina são compartilhadas. O desafio é claro: quem manda? Se não houver respeito mútuo e uma clara divisão de responsabilidades, a relação pode se tornar uma constante batalha por controle e autoridade."
    },
    "6-6": {
        summary: "Uma relação de grande harmonia e valores compartilhados, mas com risco de indecisão.",
        details: "Dois Enamorados se conectam em um nível profundo de valores e coração. A harmonia pode ser imensa. O desafio é que ambos podem ter dificuldade em tomar decisões práticas e definitivas, ficando presos em um ciclo de ponderação e idealismo sem ação."
    },
    "10-10": {
        summary: "Uma vida de mudanças constantes e reviravoltas do destino.",
        details: "Uma relação sob a dupla influência da Roda é imprevisível e cheia de altos e baixos. A adaptabilidade é a chave para a sobrevivência. Juntos, eles aprendem o desapego e a fluidez, mas podem sentir falta de um senso de estabilidade e controle sobre a própria vida."
    },
    "16-16": {
        summary: "Uma dinâmica de crises constantes e reconstruções.",
        details: "Dois arcanos da Torre juntos podem indicar uma relação marcada por rupturas súbitas e revelações chocantes. Pode ser uma conexão catalisadora que destrói falsas crenças em ambos, mas a instabilidade constante pode ser exaustiva. A relação só sobrevive se ambos estiverem dispostos a reconstruir sobre bases mais verdadeiras a cada crise."
    },
    // --- Combinações Adicionais de Interesse ---
    "0-10": {
        summary: "A jornada espontânea que abraça os ciclos imprevisíveis da vida.",
        details: "O Louco não teme o desconhecido, e a Roda da Fortuna é a personificação do desconhecido. Esta é uma combinação de total entrega ao fluxo da vida. A pessoa se move com os altos e baixos do destino com uma fé inabalável, encontrando aventura em cada reviravolta."
    },
    "1-11": {
        summary: "A união da vontade exterior com a coragem interior.",
        details: "O Mago manifesta no mundo externo, enquanto a Força domina o mundo interno. Juntos, eles representam a maestria completa. É a capacidade não apenas de agir (Mago), mas de agir com coragem, paciência e compaixão (Força). O poder é usado com sabedoria."
    },
    "2-11": {
        summary: "A intuição profunda amparada pela resiliência da alma.",
        details: "A Sacerdotisa recebe a sabedoria silenciosa, e a Força lhe dá a coragem para confiar nessa intuição, mesmo que o mundo exterior a questione. É a força interior que protege e valida o conhecimento que vem do subconsciente."
    },
    "3-12": {
        summary: "A criatividade que emerge de uma pausa e nova perspectiva.",
        details: "A Imperatriz, normalmente ativa em sua criação, encontra o Enforcado e é convidada a uma pausa. Esta combinação sugere que para um novo projeto criativo nascer, é preciso primeiro um período de inação, de olhar para as coisas de outra forma e se render a um processo de gestação mais profundo."
    },
    "4-6": {
        summary: "A estrutura e a ordem que dão segurança a uma escolha do coração.",
        details: "O Imperador oferece um ambiente seguro e estável para que a união representada pelos Enamorados possa florescer. Ele representa o compromisso e a estrutura (casamento, contrato social) que solidificam a escolha feita pelo coração. A razão a serviço da emoção."
    },
    "7-15": {
        summary: "A ambição que corre o risco de se tornar um apego obsessivo.",
        details: "O Carro busca a vitória a todo custo, e o Diabo representa a obsessão e o apego ao poder e ao controle. Esta combinação é um alerta: a vontade de vencer pode se transformar em uma força aprisionadora se não for guiada por um propósito maior, levando a táticas manipuladoras."
    },
    "8-11": {
        summary: "O equilíbrio encontrado através da coragem e do autodomínio.",
        details: "A Justiça busca o equilíbrio externo, e a Força, o interno. Juntas, elas representam a integridade. É a coragem (Força) de ser honesto e responsável (Justiça), e a clareza (Justiça) para aplicar a força interior com compaixão e sabedoria."
    },
    "13-19": {
        summary: "A alegria e a clareza que renascem após uma grande transformação.",
        details: "Esta é a promessa de um novo amanhecer após uma noite escura. A Morte encerra um ciclo doloroso, e o Sol surge com vitalidade e otimismo, mostrando que a transformação, embora difícil, leva a um estado de maior alegria e clareza. É o renascimento em sua forma mais radiante."
    },
    // --- Combinações Finais para Completar a Base ---
    "2-21": {
        summary: "A sabedoria interior que leva à realização e integração completas.",
        details: "A jornada silenciosa da Sacerdotisa para dentro de si mesma encontra sua expressão máxima no Mundo. O conhecimento intuitivo acumulado leva a um estado de totalidade e sucesso, onde o indivíduo se sente perfeitamente integrado e em harmonia com o universo. O mistério foi desvendado e a jornada, completada."
    },
    "3-18": {
        summary: "A criatividade que navega pelas águas da emoção e da intuição.",
        details: "A Imperatriz, mestra da criação material, é convidada a mergulhar no reino da Lua. Esta combinação sugere uma criatividade que brota do subconsciente, dos sonhos e das emoções. É a energia de um artista que materializa seus sentimentos mais profundos. O desafio é não se perder na confusão emocional."
    },
    "4-20": {
        summary: "A estrutura de poder que é chamada a um propósito mais elevado.",
        details: "O Imperador construiu um reino estável e ordenado. O Julgamento o chama para reavaliar o propósito desse reino. É a transição de um líder focado no material para um líder com uma missão espiritual, que usa sua autoridade para um renascimento coletivo."
    },
    "5-12": {
        summary: "A necessidade de suspender a crença para encontrar uma verdade maior.",
        details: "O Hierofante representa as doutrinas e crenças estabelecidas. O Enforcado pede para que essas crenças sejam temporariamente suspensas, para que se possa olhar para a espiritualidade de uma nova perspectiva. É um convite a questionar o dogma para encontrar uma fé mais pessoal e autêntica."
    },
    "6-21": {
        summary: "A escolha do coração que leva à conclusão e realização plenas.",
        details: "Esta combinação mostra o resultado ideal de uma escolha importante. A decisão tomada pelos Enamorados, alinhada com os valores da alma, leva diretamente à integração, ao sucesso e à sensação de totalidade do Mundo. É a prova de que seguir o coração leva ao seu lugar no universo."
    },
    "8-18": {
        summary: "A busca pela clareza em meio a ilusões e verdades ocultas.",
        details: "A Justiça busca a verdade baseada em fatos, mas o reino da Lua é turvo e cheio de ilusões. Esta é uma dinâmica de investigação profunda, que exige usar a intuição (Lua) para encontrar pistas e a lógica (Justiça) para discernir a verdade do engano. É o trabalho de um detetive da alma."
    },
    "9-11": {
        summary: "A sabedoria interior que gera uma imensa coragem e resiliência.",
        details: "A jornada solitária do Eremita para encontrar a si mesmo é o que lhe confere a verdadeira Força. A coragem aqui não é impulsiva, mas sim uma força tranquila que nasce do autoconhecimento. Juntos, eles representam a maestria do eu, uma força inabalável baseada na sabedoria."
    },
    "10-11": {
        summary: "A coragem interior para lidar com os altos e baixos do destino.",
        details: "A Roda da Fortuna traz mudanças imprevisíveis, e a Força oferece a resiliência e a paciência para enfrentá-las. Esta combinação mostra a capacidade de se manter centrado e corajoso, não importa para onde a roda gire. A verdadeira estabilidade não está nas circunstâncias, mas dentro de si."
    },
    "12-18": {
        summary: "Uma profunda imersão no subconsciente através da quietude e da rendição.",
        details: "O Enforcado para o mundo exterior para poder mergulhar no mundo interior da Lua. É uma combinação de profunda meditação e análise dos sonhos. Ao se render e parar de lutar, a pessoa permite que as mensagens e os símbolos do subconsciente venham à tona."
    },
    "13-20": {
        summary: "O fim de um ciclo que aciona um chamado para o renascimento total.",
        details: "A Morte limpa o terreno, removendo o que é antigo e obsoleto. Sobre este terreno limpo, o Julgamento soa a trombeta, chamando a alma para renascer em uma forma nova e mais evoluída. É o processo de morrer para o velho eu para poder nascer como o eu verdadeiro."
    },
    "14-19": {
        summary: "O equilíbrio e a moderação que levam à alegria e ao sucesso plenos.",
        details: "A Temperança, com sua paciência e alquimia, cria o caminho do meio perfeito para que a energia radiante do Sol possa brilhar de forma sustentável. O sucesso aqui não é uma explosão, mas uma felicidade duradoura e harmoniosa, resultado de uma vida equilibrada."
    },
    "15-18": {
        summary: "Os medos e apegos que alimentam as ilusões e ansiedades do inconsciente.",
        details: "Esta é uma combinação desafiadora que mergulha nas sombras da psique. O Diabo representa os apegos e os medos primários, e a Lua é o reino onde esses medos se transformam em ansiedade, paranoia e ilusão. A lição aqui é trazer a consciência para esses padrões para discernir o que é real do que é apenas uma sombra."
    },
    "21-21": {
        summary: "Realização plena e a celebração da conclusão em todas as áreas.",
        details: "Dois arcanos do Mundo juntos indicam um período de sucesso, integração e contentamento absolutos. É a sensação de estar exatamente onde se deveria estar, em perfeita harmonia com o universo e consigo mesmo. O desafio é desfrutar dessa conclusão sem cair na estagnação, lembrando que um novo ciclo (uma nova jornada do Louco) sempre aguarda."
    },
    // --- Combinações Faltantes (Batch 1/4) ---
    "0-9": {
        summary: "A jornada espontânea que se transforma em uma busca por sabedoria.",
        details: "O Louco inicia a jornada sem saber o destino, e o Eremita a continua em busca de um propósito interior. É a evolução da inocência para a sabedoria. O Eremita oferece uma luz para guiar os passos do Louco, transformando a aventura em uma peregrinação significativa."
    },
    "0-12": {
        summary: "A liberdade que vem da rendição e da mudança de perspectiva.",
        details: "Ambos os arcanos falam de uma quebra com o convencional. O Louco o faz através do movimento e da fé cega. O Enforcado o faz através da inação e da suspensão. Juntos, eles indicam que, às vezes, o maior salto de fé é, na verdade, parar tudo e ver o mundo de cabeça para baixo."
    },
    "0-13": {
        summary: "O início de uma jornada que exige uma transformação radical.",
        details: "O salto de fé do Louco o leva diretamente para o portal da Morte. Isso significa que o novo caminho a ser trilhado exige o fim completo e absoluto do antigo eu. Não é uma simples aventura, é um renascimento total."
    },
    "0-14": {
        summary: "A espontaneidade que encontra o caminho do equilíbrio.",
        details: "O Louco é pura energia de potencial, e a Temperança é a alquimista que a canaliza. Esta combinação é sobre encontrar um fluxo equilibrado na jornada. A Temperança ensina ao Louco a moderar seus impulsos sem perder a alegria, encontrando um caminho do meio sustentável."
    },
    "0-16": {
        summary: "Um salto de fé que leva a uma revelação súbita e chocante.",
        details: "A jornada inocente do Louco o leva a colidir com a Torre. Isso pode representar uma crise inesperada que abala as fundações do seu mundo, ou uma revelação súbita que destrói suas ilusões. É um despertar abrupto, mas necessário para seguir por um caminho mais autêntico."
    },
    "0-17": {
        summary: "A jornada guiada pela fé e pela esperança inabalável.",
        details: "Esta é uma das combinações mais puras e otimistas. O Louco tem a fé para dar o primeiro passo, e a Estrela é a promessa cósmica de que ele está sendo guiado e protegido. É uma conexão que inspira confiança total no universo e no caminho à frente."
    },
    "0-18": {
        summary: "Um passo no desconhecido que se revela uma jornada pelo subconsciente.",
        details: "O Louco salta, e a aterrissagem é no terreno misterioso da Lua. A jornada não será lógica ou clara, mas sim através de sonhos, intuições e medos. O Louco deve aprender a navegar não com os olhos, mas com o coração, confiando em seus instintos para atravessar as ilusões."
    },
    "0-19": {
        summary: "A espontaneidade que leva a uma alegria e clareza radiantes.",
        details: "O salto de fé do Louco é recompensado com a luz e a vitalidade do Sol. É uma indicação de que seguir o próprio caminho com alegria e inocência levará a um período de grande sucesso, felicidade e autoconhecimento. A aventura tem um final feliz e iluminado."
    },
    "0-20": {
        summary: "A jornada que culmina em um chamado para um propósito maior.",
        details: "O caminho espontâneo do Louco o leva a um ponto de despertar. O Julgamento representa um chamado para avaliar a jornada até aqui e renascer para um novo nível de consciência. A aventura ganha um significado e uma missão espiritual."
    },
    "1-10": {
        summary: "A vontade de manifestar que aprende a fluir com os ciclos do destino.",
        details: "O Mago quer controlar e criar sua realidade, mas a Roda da Fortuna mostra que forças maiores estão em jogo. Esta combinação ensina que o verdadeiro poder não está em controlar o destino, mas em usar suas habilidades para se adaptar e aproveitar as oportunidades que cada ciclo oferece."
    },
    "1-12": {
        summary: "O poder da ação que aprende a sabedoria da inação.",
        details: "O Mago está sempre agindo, mas o Enforcado o convida a uma pausa. É uma lição de que, às vezes, a melhor ação é não fazer nada, render-se e esperar por uma nova perspectiva. A inação pode ser o ato mais poderoso para destravar uma situação."
    },
    "1-14": {
        summary: "A manifestação que alcança a maestria através do equilíbrio e da paciência.",
        details: "O Mago tem as ferramentas, e a Temperança ensina como usá-las com equilíbrio. É a transição do poder bruto para a maestria refinada. A Temperança adiciona paciência e harmonia à vontade do Mago, resultando em criações mais sustentáveis e equilibradas."
    },
    "1-15": {
        summary: "O poder de manifestação confrontado com a tentação do poder pelo poder.",
        details: "O Mago tem o poder de criar, e o Diabo representa a tentação de usar esse poder para fins egoístas, manipuladores ou materialistas. É uma dinâmica que testa a ética do Mago, questionando se ele é o mestre de suas ferramentas ou se suas ferramentas (e desejos) o dominam."
    },
    "1-16": {
        summary: "A colisão entre a vontade de controlar e a força incontrolável da verdade.",
        details: "O Mago constrói suas criações com vontade e foco. A Torre destrói qualquer criação que não seja baseada na verdade absoluta. Esta combinação pode representar o colapso de um projeto ou de uma autoimagem construída sobre o ego, forçando o Mago a reconstruir com mais humildade e autenticidade."
    },
    "1-17": {
        summary: "A manifestação guiada pela inspiração divina e pela esperança.",
        details: "O Mago canaliza a energia, e a Estrela é a própria fonte de inspiração cósmica. Juntos, eles representam a criação inspirada, a arte e a ciência que curam e elevam. A vontade do Mago está perfeitamente alinhada com um propósito maior."
    },
    "1-20": {
        summary: "O poder de ação que é chamado para servir a um propósito de renascimento.",
        details: "O Mago é convidado a usar suas habilidades não apenas para seus próprios fins, mas para um despertar maior. O Julgamento pede que o Mago use seu poder de comunicação e manifestação para responder a um chamado, seja ele pessoal ou coletivo, levando a uma profunda transformação."
    },
    "1-21": {
        summary: "O poder de manifestação que leva à conclusão e realização completas.",
        details: "O Mago, com seu domínio sobre os elementos, alcança o objetivo final: o Mundo. Esta combinação representa a conclusão bem-sucedida de um grande projeto ou obra de vida, onde a vontade inicial se manifestou perfeitamente e se integrou com o todo."
    },
    "2-10": {
        summary: "A sabedoria intuitiva para navegar as marés da mudança.",
        details: "Enquanto a Roda da Fortuna gira externamente, a Sacerdotisa permanece em seu centro, serena. Ela entende intuitivamente os ciclos da vida e não é perturbada por eles. É uma combinação que confere uma profunda paz interior e a capacidade de sentir para onde o destino está fluindo."
    },
    "2-12": {
        summary: "Uma profunda imersão no mistério através da quietude e da rendição.",
        details: "Ambos os arcanos representam a sabedoria passiva. A Sacerdotisa detém o conhecimento oculto, e o Enforcado oferece a perspectiva para acessá-lo. É um chamado para uma profunda meditação e contemplação, um retiro do mundo para se conectar com verdades espirituais."
    },
    "2-13": {
        summary: "A intuição que aceita e compreende o fim de um ciclo.",
        details: "A Morte traz uma transformação inevitável, e a Sacerdotisa a acolhe com sabedoria, sem resistência. Ela entende intuitivamente que o fim é necessário para a renovação. É uma combinação de aceitação profunda e tranquila dos grandes mistérios da vida e da morte."
    },
    "2-14": {
        summary: "A harmonia interior alcançada através do equilíbrio intuitivo.",
        details: "A Sacerdotisa é o poço de sabedoria, e a Temperança é a alquimista que a utiliza. Juntas, elas criam um estado de equilíbrio e fluxo perfeitos, guiados pela intuição. É a maestria da alma, uma serenidade que vem de uma profunda conexão com o eu interior."
    },
    "2-15": {
        summary: "A intuição que revela os apegos e as verdades ocultas da sombra.",
        details: "A Sacerdotisa, com sua conexão com o subconsciente, tem a capacidade de iluminar os apegos e as ilusões representadas pelo Diabo. É uma combinação poderosa para o autoconhecimento, revelando padrões ocultos para que possam ser liberados. A verdade interior desmascara a mentira do apego."
    },
    "2-16": {
        summary: "A intuição que pressente a crise ou a verdade que a crise revela.",
        details: "A Sacerdotisa pode sentir a tensão antes da Torre desmoronar. Ou, a crise da Torre pode revelar um segredo que a Sacerdotisa guardava. É uma combinação que conecta uma ruptura externa a uma verdade interna profunda que não podia mais ser ignorada."
    },
    "2-18": {
        summary: "Uma imersão total no reino do subconsciente, dos sonhos e da intuição.",
        details: "Esta é a combinação mais profundamente intuitiva do Tarô. A Sacerdotisa é a rainha do subconsciente, e a Lua é o seu território. Juntas, elas representam um período de sonhos vívidos, insights psíquicos e uma poderosa conexão com os mistérios. O desafio é não se perder e saber discernir a intuição da ilusão."
    },
    "2-19": {
        summary: "A sabedoria interior que é trazida à luz com clareza e alegria.",
        details: "O Sol ilumina os mistérios que a Sacerdotisa guarda. É o momento em que uma verdade intuitiva e profunda se torna consciente, clara e compreensível. O conhecimento oculto é revelado, trazendo grande alegria e libertação."
    },
    "2-20": {
        summary: "A voz da intuição que se manifesta como um chamado para o despertar.",
        details: "O chamado do Julgamento é ouvido através do canal da Sacerdotisa. A sua voz interior está lhe dizendo que é hora de um renascimento. É uma combinação que pede para que você confie plenamente na sua intuição para tomar uma decisão que mudará sua vida."
    },
    // --- Combinações Faltantes (Batch 2/4) ---
    "3-9": {
        summary: "A criatividade que encontra a sabedoria da introspecção.",
        details: "A Imperatriz cria no mundo externo, enquanto o Eremita busca sabedoria no mundo interno. É uma combinação que ensina que a verdadeira criação precisa de períodos de gestação e reflexão. O Eremita oferece a sabedoria para guiar a abundante energia criativa da Imperatriz, garantindo que ela seja usada com propósito."
    },
    "3-15": {
        summary: "A abundância confrontada pelo apego material excessivo.",
        details: "A Imperatriz representa a generosidade da natureza e o prazer saudável. O Diabo representa o apego a esses prazeres, o materialismo e a dependência. Esta dinâmica testa a relação com a matéria: ela é uma fonte de nutrição e alegria (Imperatriz) ou uma corrente que aprisiona (Diabo)?"
    },
    "3-16": {
        summary: "A queda de um paraíso ou a destruição que abre espaço para a fertilidade.",
        details: "A Torre pode representar a destruição súbita do conforto e da segurança da Imperatriz. Pode ser uma crise que abala as fundações do lar ou de um projeto criativo. No entanto, a destruição também limpa o terreno, permitindo que a energia fértil da Imperatriz construa algo novo e mais autêntico."
    },
    "3-17": {
        summary: "A criação inspirada pela esperança e pela conexão com o divino.",
        details: "A criatividade da Imperatriz é banhada pela luz da Estrela. É uma combinação de pura inspiração e beleza, indicando um período fértil para a arte, a cura e para nutrir projetos que tragam esperança e bem-estar ao mundo. É a beleza da natureza refletindo a beleza do cosmos."
    },
    "3-19": {
        summary: "A celebração da vida em sua forma mais abundante e alegre.",
        details: "Esta é uma das combinações mais felizes e férteis. A Imperatriz representa a abundância e a criação, e o Sol representa a alegria, a vitalidade e o sucesso. Juntos, eles indicam um período de grande felicidade, prosperidade, crescimento e celebração da vida."
    },
    "3-21": {
        summary: "A criação que atinge seu ciclo de conclusão e realização plena.",
        details: "A energia criativa da Imperatriz encontra sua manifestação final no Mundo. É a conclusão bem-sucedida de um grande projeto criativo, o nascimento de um filho ou a realização de um ciclo de crescimento. A jornada da criação chegou ao seu destino final e bem-sucedido."
    },
    "4-9": {
        summary: "A estrutura que busca a sabedoria para governar com propósito.",
        details: "O Imperador governa o mundo exterior, e o Eremita, o interior. Para que o reino do Imperador seja justo e sábio, ele precisa da orientação e da reflexão do Eremita. É a união da ação com a contemplação, do poder com a sabedoria. Um líder que medita sobre suas decisões."
    },
    "4-11": {
        summary: "A autoridade externa sustentada pela força e coragem internas.",
        details: "A verdadeira autoridade do Imperador não vem apenas de sua coroa, mas de sua Força interior. Esta combinação mostra um líder que governa não pela tirania, mas pela resiliência, coragem e autocontrole. É o poder exercido com firmeza e compaixão."
    },
    "4-12": {
        summary: "A estrutura rígida que é forçada a uma pausa para encontrar uma nova perspectiva.",
        details: "O Imperador quer controle e avanço, mas o Enforcado impõe uma parada. É um chamado para que o líder reavalie suas estratégias e sacrifique uma abordagem antiga para encontrar uma solução inovadora. A rigidez deve ceder à flexibilidade para que o reino possa prosperar."
    },
    "4-14": {
        summary: "A liderança que governa com equilíbrio e moderação.",
        details: "A Temperança traz a diplomacia e o equilíbrio para a autoridade do Imperador. É um líder que não age por extremos, mas que busca o caminho do meio, integrando diferentes pontos de vista para criar um sistema harmonioso e estável. É a arte de governar com paciência."
    },
    "4-15": {
        summary: "O poder que corre o risco de ser corrompido pelo apego e pela tirania.",
        details: "Esta combinação é um alerta sobre os perigos do poder. O Imperador representa a autoridade, e o Diabo, a tentação de abusar desse poder para controle, ganho material ou dominação. A lição é governar com integridade, sem se deixar acorrentar pelas tentações do poder."
    },
    "4-17": {
        summary: "A estrutura e a ordem que servem a um propósito de esperança e inspiração.",
        details: "O Imperador constrói as fundações seguras que permitem que a esperança e a criatividade da Estrela floresçam. Ele cria o 'jardim', e a Estrela o preenche com beleza e fé. É a liderança a serviço de um bem maior, criando um mundo seguro para que os sonhos possam prosperar."
    },
    "4-18": {
        summary: "A lógica e a ordem que tentam controlar o caos das emoções e do inconsciente.",
        details: "O Imperador busca clareza e controle, mas a Lua traz incerteza, emoções e ilusões. É uma dinâmica de tensão, onde a razão tenta impor ordem sobre o que não pode ser controlado. O aprendizado para o Imperador está em aceitar e integrar o mundo invisível das emoções."
    },
    "4-19": {
        summary: "A liderança que leva a um período de grande sucesso e clareza.",
        details: "A estrutura e a disciplina do Imperador criam o caminho para o sucesso radiante do Sol. É uma combinação que indica a realização de grandes ambições através de um planejamento sólido e uma liderança confiante. O reino prospera sob a luz da clareza e da alegria."
    },
    "4-21": {
        summary: "A construção de um império que atinge sua conclusão e realização plenas.",
        details: "O Imperador sonhou em construir algo duradouro, e o Mundo confirma que ele conseguiu. Esta combinação representa a conclusão bem-sucedida de um grande legado, a construção de uma carreira ou de uma vida que atingiu um estado de estabilidade, sucesso e integração total."
    },
    "5-10": {
        summary: "A tradição que é desafiada ou renovada pelos ciclos da mudança.",
        details: "O Hierofante representa o que é fixo e tradicional, enquanto a Roda da Fortuna traz a mudança inevitável. Esta combinação pode indicar um momento em que as velhas tradições precisam se adaptar para sobreviver a um novo tempo, ou onde a fé é testada pelas reviravoltas do destino."
    },
    "5-11": {
        summary: "A força da convicção e a coragem de seguir os próprios valores.",
        details: "O Hierofante representa o sistema de valores, e a Força é a coragem interior para viver de acordo com esses valores, mesmo diante da adversidade. É uma combinação de grande integridade moral e resiliência espiritual. A fé que se torna uma força interior inabalável."
    },
    "5-14": {
        summary: "O ensino que busca o equilíbrio e a integração de diferentes filosofias.",
        details: "O Hierofante é o professor, e a Temperança é a alquimista. Juntos, eles representam uma abordagem de ensino que não é dogmática, mas que busca integrar diferentes pontos de vista para encontrar um caminho do meio harmonioso. É a sabedoria que vem da moderação e do equilíbrio."
    },
    "5-17": {
        summary: "A tradição que aponta o caminho para a esperança e a fé universal.",
        details: "O Hierofante representa o caminho espiritual formal, e a Estrela é a própria fé e inspiração cósmica. Juntos, eles indicam que seguir um caminho de aprendizado espiritual leva a um estado de cura, esperança e uma profunda conexão com o divino. A doutrina que cumpre sua promessa."
    },
    "5-18": {
        summary: "O dogma que é confrontado pelos mistérios e intuições do inconsciente.",
        details: "O Hierofante oferece respostas claras e estruturadas, mas a Lua traz dúvidas, sonhos e verdades que não se encaixam na lógica. É uma dinâmica que testa a fé, onde a pessoa é convidada a olhar para além do dogma e explorar os mistérios de sua própria alma, mesmo que seja um caminho incerto."
    },
    "5-19": {
        summary: "A clareza e a verdade que iluminam e validam os ensinamentos.",
        details: "O Sol traz a clareza que confirma a sabedoria dos ensinamentos do Hierofante. É um momento em que a fé se torna certeza. A verdade é revelada de forma simples e direta, trazendo alegria e confiança no caminho espiritual escolhido."
    },
    "5-20": {
        summary: "Os ensinamentos que preparam a alma para um chamado e um renascimento.",
        details: "O aprendizado e a adesão aos valores do Hierofante culminam em um chamado do Julgamento. A estrutura espiritual que foi construída agora serve como base para um despertar, uma reavaliação da vida e a transição para um novo nível de consciência."
    },
    // --- Combinações Faltantes (Batch 3/4) ---
    "6-8": {
        summary: "A escolha do coração que deve ser validada pela clareza da mente.",
        details: "Os Enamorados representam uma escolha baseada no sentimento e nos valores. A Justiça exige que essa escolha seja analisada com lógica, honestidade e responsabilidade. Juntos, eles garantem que uma decisão importante seja tanto autêntica (coração) quanto correta (mente), considerando todas as consequências."
    },
    "6-10": {
        summary: "Uma escolha que coloca o destino em movimento.",
        details: "Esta combinação indica que a escolha a ser feita pelos Enamorados tem o poder de girar a Roda da Fortuna, iniciando um novo e importante ciclo de vida. A decisão não é trivial; ela tem implicações kármicas e definirá a direção do seu destino por um bom tempo."
    },
    "6-13": {
        summary: "A escolha que exige o fim de um antigo relacionamento ou identidade.",
        details: "Para fazer a escolha representada pelos Enamorados, algo precisa terminar de forma definitiva (A Morte). Isso pode ser o fim de um relacionamento antigo para começar um novo, ou o fim de uma antiga versão de si mesmo para se comprometer com um novo caminho. É uma escolha transformadora."
    },
    "6-14": {
        summary: "A busca pelo equilíbrio e harmonia dentro de uma escolha de relacionamento.",
        details: "A Temperança traz a paciência e a alquimia necessárias para a união dos Enamorados. Ela sugere que a harmonia na relação não é algo dado, mas algo que é construído com cuidado, misturando as diferenças para criar um todo equilibrado e sustentável."
    },
    "6-16": {
        summary: "Uma escolha que leva a uma revelação súbita ou à quebra de uma ilusão.",
        details: "Esta combinação pode ser um alerta. A escolha dos Enamorados pode ser baseada em uma ilusão, e a Torre vem para destruir essa falsa premissa de forma chocante. Pode representar a revelação de uma verdade sobre um parceiro que abala as fundações da relação."
    },
    "6-17": {
        summary: "A escolha guiada pela esperança e pela fé em um amor verdadeiro.",
        details: "A Estrela ilumina o caminho dos Enamorados, oferecendo esperança e inspiração. É a indicação de que a escolha feita com o coração está alinhada com um propósito maior e tem o potencial de levar a uma relação de cura, serenidade e profunda conexão espiritual."
    },
    "6-18": {
        summary: "Uma escolha de relacionamento envolta em incertezas, sonhos e ilusões.",
        details: "A Lua lança uma luz turva sobre a escolha dos Enamorados. Pode haver sentimentos confusos, medos ocultos ou uma idealização do parceiro. É preciso navegar pelas emoções com intuição para discernir o que é um vínculo real do que é apenas uma projeção ou fantasia."
    },
    "6-19": {
        summary: "A escolha do coração que leva à alegria, clareza e uma união feliz.",
        details: "O Sol ilumina a escolha dos Enamorados, trazendo clareza, verdade e felicidade. É a confirmação de que a decisão tomada levará a uma relação cheia de vitalidade, honestidade e sucesso. Uma união abençoada pela alegria de viver."
    },
    "6-20": {
        summary: "Uma escolha de relacionamento que representa um chamado da alma.",
        details: "A decisão a ser tomada pelos Enamorados é mais do que uma simples escolha; é um chamado do Julgamento para um novo nível de consciência. Pode representar um relacionamento kármico, um reencontro de almas que força uma reavaliação da vida e um renascimento."
    },
    "7-10": {
        summary: "A vontade de avançar que aprende a se alinhar com as reviravoltas do destino.",
        details: "O Carro quer controlar sua direção, mas a Roda da Fortuna mostra que forças maiores podem mudar o rumo a qualquer momento. Um motorista de Carro sábio não luta contra a Roda, mas usa sua habilidade para manobrar e aproveitar as novas estradas que o destino abre."
    },
    "7-11": {
        summary: "A união da determinação externa com a resiliência interna.",
        details: "O Carro é a vontade de conquistar o mundo, e a Força é a coragem para dominar a si mesmo. Juntos, eles representam um poder completo: a ambição para seguir em frente e a força interior para superar não apenas os obstáculos externos, but também os medos e dúvidas internas."
    },
    "7-12": {
        summary: "O conflito entre o impulso de avançar e a necessidade de parar.",
        details: "Esta é a dinâmica do 'para e arranca'. O Carro quer acelerar em direção ao objetivo, mas o Enforcado pisa no freio, forçando uma pausa para reavaliação. O avanço só será bem-sucedido depois que a nova perspectiva do Enforcado for integrada. A pressa aqui é inimiga da perfeição."
    },
    "7-14": {
        summary: "O avanço que se torna mais poderoso através do equilíbrio e da paciência.",
        details: "A Temperança ensina ao condutor do Carro a arte da moderação. Em vez de uma corrida desenfreada, a jornada se torna um fluxo constante e equilibrado. A energia é usada de forma mais eficiente, garantindo que o Carro não apenas chegue rápido, mas chegue ao destino com recursos e harmonia."
    },
    "7-17": {
        summary: "A jornada de conquista guiada por uma inspiração e um propósito maior.",
        details: "A Estrela é o farol que guia o Carro. A ambição aqui não é egoísta, mas inspirada por uma esperança ou um ideal. É a jornada do herói que luta por uma causa nobre, com a certeza de que está no caminho certo e sendo guiado pelo universo."
    },
    "7-18": {
        summary: "Avançando em território desconhecido, guiado apenas pela intuição.",
        details: "O Carro avança, mas a estrada à frente está enevoada pela Lua. Não há um mapa claro, apenas a intuição e as emoções como guia. É uma jornada que exige coragem para enfrentar o desconhecido e confiança nos próprios instintos para não se desviar do caminho."
    },
    "7-19": {
        summary: "A jornada que leva a uma vitória clara e indiscutível.",
        details: "A determinação do Carro é recompensada com a clareza e o sucesso do Sol. Esta combinação indica a conquista de um objetivo de forma triunfante. O caminho se torna claro, os obstáculos são superados e a chegada é marcada por reconhecimento e alegria."
    },
    "7-20": {
        summary: "O avanço que leva a um ponto de despertar e reavaliação.",
        details: "A jornada do Carro não leva apenas a uma conquista material, mas a um chamado do Julgamento. O sucesso alcançado força uma reavaliação de propósito, um chamado para usar essa vitória para um renascimento pessoal ou para servir a uma missão maior."
    },
    "8-13": {
        summary: "A decisão que leva a um fim de ciclo necessário e transformador.",
        details: "A Justiça, com sua espada, toma uma decisão clara e definitiva. Essa decisão aciona a Morte, que corta os laços com o passado. É a combinação de uma escolha lógica que resulta em uma transformação inevitável. Não há como voltar atrás."
    },
    "8-14": {
        summary: "A busca pelo equilíbrio perfeito entre a lógica e a harmonia.",
        details: "A Justiça busca o equilíbrio através de regras e fatos, enquanto a Temperança o busca através do fluxo e da integração. Juntas, elas representam a maestria do equilíbrio, a capacidade de tomar decisões justas que também são harmoniosas e sustentáveis a longo prazo."
    },
    "8-15": {
        summary: "A verdade que expõe um apego ou uma situação de desonestidade.",
        details: "A espada da Justiça vem para cortar as correntes do Diabo. Esta combinação representa o momento em que a clareza e a verdade expõem uma situação de apego, vício ou manipulação. É a tomada de consciência que revela uma verdade inconveniente, mas libertadora."
    },
    "8-16": {
        summary: "A revelação da verdade que causa a destruição de uma estrutura.",
        details: "A Justiça revela um fato ou uma verdade que age como o raio que atinge a Torre. Pode ser a descoberta de uma traição ou de uma mentira que destrói as fundações de um relacionamento ou de uma crença. A verdade, aqui, é chocante e desestabilizadora, mas necessária."
    },
    "8-17": {
        summary: "A decisão correta que leva a um futuro de esperança e serenidade.",
        details: "Após uma decisão difícil mas justa, a Estrela surge como a promessa de um futuro melhor. Esta combinação mostra que agir com integridade e verdade, mesmo que seja difícil no momento, nos alinha com um caminho de cura, paz e inspiração."
    },
    "8-19": {
        summary: "A verdade que vem à luz, trazendo clareza e libertação.",
        details: "O Sol ilumina a balança da Justiça, não deixando espaço para dúvidas ou enganos. É a manifestação da verdade de forma clara e inquestionável. Esta combinação indica a resolução de um conflito com total transparência, trazendo alegria e um senso de alívio."
    },
    "8-21": {
        summary: "A ação correta que leva à conclusão bem-sucedida de um ciclo.",
        details: "Agir com justiça e responsabilidade leva à realização plena do Mundo. Esta combinação mostra que a conclusão bem-sucedida de uma jornada é o resultado direto de ter feito as escolhas corretas e éticas ao longo do caminho. O sucesso é merecido e completo."
    },
    // --- Combinações Faltantes (Batch 4/4 - Final) ---
    "9-13": {
        summary: "A introspecção que leva à aceitação de um fim necessário.",
        details: "O Eremita, em sua busca interior, encontra a Morte. Isso indica que a sabedoria encontrada na solidão leva à compreensão de que um ciclo precisa terminar. Não há medo, apenas a aceitação sábia de que a transformação é uma parte natural da jornada."
    },
    "9-14": {
        summary: "A sabedoria interior que guia o caminho do equilíbrio.",
        details: "O Eremita encontra a verdade dentro de si, e a Temperança a aplica no mundo com equilíbrio e paciência. É a combinação da sabedoria com a prática harmoniosa. A jornada interior do Eremita o ensina a viver de forma mais equilibrada e integrada."
    },
    "9-15": {
        summary: "A busca interior que confronta os apegos e as sombras pessoais.",
        details: "Em sua jornada de autoconhecimento, o Eremita inevitavelmente encontra o Diabo, a representação de seus próprios apegos e padrões limitantes. Esta é uma combinação de profundo trabalho de sombra, onde a luz da consciência do Eremita é usada para iluminar e se libertar das correntes internas."
    },
    "9-16": {
        summary: "A sabedoria que surge da destruição de uma solidão ou crença.",
        details: "A Torre pode representar a quebra do isolamento do Eremita de forma súbita. Pode ser uma revelação que destrói uma crença antiga que ele mantinha. Embora chocante, essa crise força o Eremita a sair de sua zona de conforto e a reconstruir sua sabedoria sobre uma base mais verdadeira."
    },
    "9-17": {
        summary: "A sabedoria interior que se alinha com a esperança universal.",
        details: "A luz da lanterna do Eremita é um reflexo da luz da Estrela. É a combinação da sabedoria pessoal com a fé cósmica. A jornada interior leva a um estado de paz, esperança e uma profunda sensação de estar conectado com um propósito maior no universo."
    },
    "9-19": {
        summary: "A clareza e a alegria que são encontradas no fim da jornada interior.",
        details: "Após o período de introspecção do Eremita, o Sol nasce, trazendo clareza, compreensão e felicidade. A sabedoria encontrada na solidão agora pode ser compartilhada com o mundo com alegria e confiança. É a iluminação que vem de dentro e se irradia para fora."
    },
    "9-20": {
        summary: "A introspecção que leva a um profundo chamado para o despertar.",
        details: "A busca solitária do Eremita o prepara para ouvir o chamado do Julgamento. A sabedoria acumulada culmina em um momento de despertar, onde ele é chamado a perdoar seu passado e renascer para um novo nível de propósito, talvez como um guia para os outros."
    },
    "9-21": {
        summary: "A jornada de autoconhecimento que leva à totalidade e à integração.",
        details: "O Eremita busca a si mesmo, e o Mundo representa o encontro bem-sucedido. A jornada interior leva à conclusão, a um estado de integração onde o indivíduo se sente completo e em paz com seu lugar no universo. A busca terminou com a realização."
    },
    "10-12": {
        summary: "A pausa necessária para se adaptar a uma virada do destino.",
        details: "A Roda da Fortuna gira, mudando as circunstâncias, e o Enforcado representa a necessidade de parar e se adaptar a essa nova realidade. Em vez de lutar contra a mudança, é preciso se render, ganhar uma nova perspectiva e esperar o momento certo para agir no novo cenário."
    },
    "10-17": {
        summary: "Uma virada do destino que traz esperança, cura e renovação.",
        details: "A Roda gira para uma posição favorável, trazendo a energia de cura e otimismo da Estrela. É uma combinação que indica o fim de um período difícil e o início de uma fase de fé, inspiração e boa sorte. O destino sorri."
    },
    "10-18": {
        summary: "Uma mudança de ciclo que leva a um período de incerteza e confusão.",
        details: "A Roda da Fortuna gira e a paisagem se torna o território misterioso da Lua. Uma mudança inesperada pode trazer confusão, ansiedade e falta de clareza. É um período que exige navegar pelas mudanças com intuição, pois o caminho lógico não está visível."
    },
    "10-19": {
        summary: "Uma virada afortunada do destino que leva ao sucesso e à alegria.",
        details: "Esta é uma combinação extremamente positiva. A Roda gira e traz a luz radiante do Sol, indicando um golpe de sorte que leva a um período de grande felicidade, sucesso, clareza e reconhecimento. É o momento de aproveitar a maré alta."
    },
    "12-15": {
        summary: "A pausa que revela a natureza de um apego ou vício.",
        details: "O estado de suspensão do Enforcado permite uma nova perspectiva sobre as correntes do Diabo. Ao parar de agir, a pessoa pode ver claramente quais apegos, padrões ou vícios a estão controlando. É uma pausa necessária para a tomada de consciência que precede a libertação."
    },
    "12-17": {
        summary: "A rendição que leva a um estado de paz, cura e esperança.",
        details: "Ao soltar o controle e se render (O Enforcado), a pessoa se abre para receber a energia de cura e fé da Estrela. É a paz que vem da aceitação. A pausa e o sacrifício são recompensados com uma profunda sensação de serenidade e conexão com o universo."
    },
    "12-20": {
        summary: "A pausa para reavaliação que culmina em um chamado para o renascimento.",
        details: "O Enforcado representa a suspensão de velhos padrões de pensamento, e o Julgamento é o chamado para nascer em um novo. É um período de profunda reavaliação que leva a uma transformação de consciência, onde o velho eu é sacrificado para que o novo possa emergir."
    },
    "12-21": {
        summary: "A rendição final que leva à integração e à conclusão da jornada.",
        details: "Para alcançar a totalidade do Mundo, é preciso primeiro se render completamente, como o Enforcado. Esta combinação mostra que a realização plena vem quando paramos de lutar e nos permitimos integrar todas as partes de nós mesmos, aceitando nosso lugar no grande ciclo da vida."
    },
    "15-20": {
        summary: "O chamado para o despertar que exige a libertação de velhos apegos.",
        details: "O Julgamento é um chamado para renascer, mas para isso, é preciso primeiro quebrar as correntes do Diabo. Esta combinação indica que a evolução espiritual requer a confrontação e o perdão de padrões de apego, culpa ou materialismo do passado. A libertação é a condição para o renascimento."
    },
    // --- Combinações Finais para Completar 100% da Matriz ---
    "11-16": {
        summary: "A coragem interior que é testada por uma crise súbita.",
        details: "A resiliência da Força é posta à prova pela ruptura da Torre. Esta combinação mostra que a verdadeira coragem não é a ausência de crise, mas a capacidade de se manter firme e centrado quando as estruturas ao redor desmoronam. É a força que emerge das cinzas."
    },
    "11-18": {
        summary: "A coragem para enfrentar os medos e ilusões do inconsciente.",
        details: "A Força oferece a bravura necessária para caminhar pelo território sombrio e incerto da Lua. Em vez de fugir dos medos e das ansiedades, a pessoa os encara com compaixão e paciência, domando as sombras internas para encontrar a verdade."
    },
    "11-21": {
        summary: "A maestria interior que leva à realização completa no mundo.",
        details: "A jornada de autodomínio da Força culmina na integração e no sucesso do Mundo. Esta combinação indica que a verdadeira realização e o sentimento de pertencimento vêm de uma profunda força interior e da coragem de ser autenticamente você mesmo."
    },
    "14-17": {
        summary: "O equilíbrio que abre o caminho para a cura e a esperança.",
        details: "A Temperança cria um estado de harmonia e fluxo, e é nesse estado de paz que a inspiração e a fé da Estrela podem ser recebidas. É a combinação da alquimia interior com a graça divina, um período de profunda serenidade e otimismo."
    },
    "14-21": {
        summary: "O equilíbrio perfeito que leva à conclusão e à totalidade.",
        details: "A jornada de integração da Temperança atinge sua meta final no Mundo. Todos os opostos foram harmonizados, todas as lições foram aprendidas. O resultado é um estado de realização plena, paz e uma conexão perfeita com o fluxo do universo."
    },
    "15-21": {
        summary: "A integração que só é possível após se libertar dos apegos.",
        details: "O Mundo representa a totalidade, e não se pode estar completo enquanto se está acorrentado. Esta combinação mostra que o passo final para a realização plena exige o desapego consciente das amarras materiais ou emocionais representadas pelo Diabo."
    },
    "16-21": {
        summary: "A reconstrução após a crise que leva a uma realização mais autêntica.",
        details: "Após a Torre destruir as velhas estruturas, o Mundo representa a conclusão bem-sucedida da reconstrução sobre uma base nova e verdadeira. É a prova de que a crise, embora dolorosa, foi necessária para alcançar um estado de sucesso mais genuíno e integrado."
    },
    "20-20": {
        summary: "Um período de profundo despertar e reavaliação em todas as áreas.",
        details: "Dois arcanos do Julgamento indicam um chamado para a transformação que não pode ser ignorado. É um momento crucial de autoavaliação, de perdoar o passado e de renascer para um novo paradigma de vida. A mudança é profunda e abrangente."
    },
    "2-2": {
        summary: "Uma conexão de silêncio profundo e sabedoria intuitiva.",
        details: "Duas Sacerdotisas juntas criam um espaço de profundo mistério e compreensão não-verbal. A comunicação acontece em um nível psíquico. O desafio é trazer essa conexão para o mundo prático, evitando que a relação se torne excessivamente passiva ou isolada da realidade."
    },
    "3-3": {
        summary: "Abundância e criatividade exponenciais, com risco de excesso de indulgência.",
        details: "Uma dupla de Imperatrizes cria um ambiente de extremo conforto, beleza e criatividade. A vida é fértil e generosa. O perigo está em cair na estagnação, no luxo excessivo ou na superproteção, onde o conforto impede o crescimento."
    },
    "5-5": {
        summary: "Uma relação baseada em valores e tradições compartilhadas.",
        details: "Dois Hierofantes se conectam através de um sistema de crenças e valores muito forte e compartilhado. A relação é estável e previsível. O risco é o dogmatismo e a falta de abertura para novas ideias que desafiem suas tradições."
    },
    "7-7": {
        summary: "Uma dupla de alta ambição e determinação, com potencial para conflito.",
        details: "Dois condutores de Carro juntos formam uma parceria de alta performance, focada em conquistar objetivos. O progresso pode ser rápido e impressionante. O desafio é garantir que ambos estejam indo na mesma direção e não competindo para ver quem chega primeiro ou quem está no controle."
    },
    "8-8": {
        summary: "Uma relação baseada na lógica, na verdade e na responsabilidade mútua.",
        details: "A clareza, a honestidade e o equilíbrio são os pilares desta conexão. As decisões são tomadas com base em fatos e de forma imparcial. O desafio é não deixar que a lógica sufoque a emoção, tornando a relação fria ou excessivamente crítica."
    },
    // --- Bloco Final para Completar 100% da Matriz ---
    "1-19": {
        summary: "A manifestação da vontade que culmina em sucesso e clareza radiante.",
        details: "Esta é uma combinação de poder e positividade. A vontade focada do Mago encontra a energia da clareza e do sucesso do Sol. Juntos, eles indicam que a ação consciente e direcionada levará a um resultado brilhante, cheio de alegria e reconhecimento."
    },
    "11-19": {
        summary: "A coragem interior que se manifesta como sucesso e vitalidade no mundo.",
        details: "A resiliência e o autodomínio da Força são a base para a alegria e o sucesso do Sol. Esta combinação mostra que a verdadeira felicidade vem de uma fonte de poder interior, da coragem de ser autêntico e de dominar os próprios medos."
    },
    "11-11": {
        summary: "Uma fonte inesgotável de coragem e resiliência.",
        details: "Duas forças juntas criam uma fortaleza de poder interior. A paciência e a compaixão são dobradas. O desafio é garantir que essa imensa força não se torne teimosia ou uma resistência passiva à mudança, mas sim uma fonte de poder gentil."
    },
    "12-12": {
        summary: "Um período de profunda inação, contemplação e mudança de perspectiva.",
        details: "Uma dupla de Enforcados indica uma grande pausa na vida. É um momento de total rendição e reavaliação. O potencial para iluminação espiritual é imenso, mas o risco de estagnação completa e de se perder em um limbo de inação também é muito alto."
    },
    "13-13": {
        summary: "Uma transformação radical e abrangente em todos os níveis.",
        details: "Esta combinação indica uma limpeza completa. Não é apenas o fim de um ciclo, mas o fim de uma era. Tudo o que não é essencial está sendo eliminado para que um renascimento totalmente novo possa ocorrer. A resistência é inútil; a entrega é a única opção."
    },
    "14-14": {
        summary: "Um estado de equilíbrio, harmonia e fluxo perfeitos.",
        details: "Duas Temperanças criam uma sinergia de paz e moderação. A paciência é a maior virtude aqui. A relação flui sem esforço. O desafio é evitar a falta de paixão ou a incapacidade de tomar decisões firmes quando os extremos são necessários."
    },
    "15-15": {
        summary: "Uma conexão de intensa paixão e apegos profundos.",
        details: "Dois Diabos juntos podem criar uma relação de magnetismo e prazer irresistíveis, mas também de codependência e padrões tóxicos. É uma dinâmica poderosa que pode ser incrivelmente criativa ou destrutiva. A libertação aqui só acontece quando ambos decidem quebrar as correntes juntos."
    },
    "17-17": {
        summary: "Um oásis de esperança, inspiração e serenidade.",
        details: "Uma dupla de Estrelas cria uma atmosfera de paz, cura e otimismo. A fé no universo é inabalável. É uma conexão espiritual e inspiradora. O desafio é garantir que essa energia de esperança se traduza em alguma ação no mundo real, para não se tornar apenas um sonho distante."
    },
    "18-18": {
        summary: "Uma imersão profunda no mundo dos sonhos, da intuição e das ilusões.",
        details: "Dois arcanos da Lua juntos criam uma conexão psíquica extremamente forte. Os sonhos são vívidos, e a intuição é a principal forma de comunicação. O perigo é imenso: a linha entre a intuição e a ilusão ou paranoia se torna muito tênue. A clareza é o maior desafio."
    },
    // --- Bloco Final para Completar 100% da Matriz ---
    "0-15": {
        summary: "Uma atração magnética entre a liberdade absoluta e o apego profundo.",
        details: "O Louco busca a liberdade sem amarras, enquanto o Diabo representa as correntes do desejo e do materialismo. Esta relação pode ser incrivelmente apaixonada, mas carrega o risco de um se sentir aprisionado pelo outro. O aprendizado está em encontrar a liberdade dentro do compromisso."
    },
    "1-1": {
        summary: "Potencial imenso de manifestação, com risco de competição de egos.",
        details: "Dois mestres da vontade juntos podem criar realidades incríveis. A energia é dinâmica e cheia de ação. O desafio é garantir que ambos estejam trabalhando na mesma direção, em vez de competir para ver quem tem mais poder ou controle."
    },
    "2-4": {
        summary: "A poderosa união do mistério com a estrutura, da intuição com a lógica.",
        details: "A Sacerdotisa governa o mundo interior, enquanto o Imperador governa o exterior. Se houver respeito, um oferece a sabedoria e o outro, a ação para manifestá-la. O desafio é a comunicação entre a passividade e a atividade."
    },
    "3-1": {
        summary: "A parceria de manifestação e criação mais poderosa do Tarô.",
        details: "O Mago traz a faísca da vontade e as ferramentas, enquanto a Imperatriz oferece o útero fértil da criatividade. Juntos, eles podem transformar qualquer ideia em uma realidade abundante e bela. É a união da vontade com a criação."
    },
    "4-5": {
        summary: "Uma aliança de estrutura e tradição.",
        details: "Ambos valorizam a ordem e os sistemas. O Imperador constrói o império no mundo material, e o Hierofante constrói as doutrinas que o sustentam. Uma relação de grande respeito mútuo e solidez."
    },
    "5-15": {
        summary: "O confronto direto entre a tradição e o tabu, o dogma e a liberdade.",
        details: "O Hierofante representa as regras, enquanto o Diabo representa a quebra dessas regras e a indulgência nos desejos. É uma relação de tensão constante, onde um desafia as crenças fundamentais do outro, forçando uma reavaliação do que é 'certo' e 'errado'."
    },
    "6-11": {
        summary: "Uma aliança de apoio entre a escolha do coração e a coragem interior.",
        details: "A Força traz coragem e domínio sobre as próprias paixões. O Enamorado, por sua vez, vive na dúvida e nas escolhas. Essa relação pode ser de grande apoio, onde a Força dá clareza ao Enamorado, mas também de conflito, se houver pressa em impor decisões."
    },
    "7-9": {
        summary: "O equilíbrio dinâmico entre a ação no mundo e a busca interior.",
        details: "O Carro avança com determinação, enquanto o Eremita se retira para refletir. Esta relação ensina que a ação sem sabedoria é cega, e a sabedoria sem ação é estéril. Um precisa da direção e do propósito do outro para encontrar o verdadeiro caminho."
    },
    "9-9": {
        summary: "Uma profunda conexão de almas, mas com risco de isolamento.",
        details: "Dois Eremitas juntos entendem a necessidade um do outro por espaço e introspecção. A conexão pode ser profunda e silenciosa. O desafio é garantir que a busca interior não os leve a se isolarem um do outro, esquecendo de nutrir a relação no plano terreno."
    },
    "10-14": {
        summary: "O equilíbrio e a paciência para navegar as mudanças do destino.",
        details: "A Roda da Fortuna traz mudanças constantes, e a Temperança oferece a harmonia e a moderação para se adaptar a elas. Em vez de ser levado passivamente, a pessoa usa a alquimia interior para encontrar o fluxo e o propósito em cada reviravolta."
    },
    "10-16": {
        summary: "Uma virada do destino que se manifesta como uma crise súbita.",
        details: "A Roda gira para a posição mais desafiadora, acionando a Torre. É uma combinação que indica uma mudança de sorte drástica e negativa, uma crise inesperada que destrói as fundações atuais. É um lembrete de que o destino pode ser tanto criador quanto destruidor."
    },
    "10-21": {
        summary: "A jornada cíclica que leva à conclusão bem-sucedida.",
        details: "A Roda representa os altos e baixos da jornada, enquanto o Mundo representa a chegada e a realização. Juntos, eles formam a história completa de um ciclo de vida, mostrando que cada reviravolta do destino foi uma parte necessária para alcançar a plenitude."
    },
    "11-12": {
        summary: "A interação entre a ação interior e a inação exterior para um bem maior.",
        details: "A Força representa o domínio interno e a coragem, enquanto o Enforcado representa a rendição e a mudança de perspectiva. Juntos, eles mostram que às vezes a maior força está em saber quando agir, e às vezes, em saber quando parar e esperar pela clareza."
    },
    "13-16": {
        summary: "Uma dinâmica de transformação profunda e rupturas súbitas.",
        details: "Ambos são arcanos de mudança drástica. A Morte é o fim de um ciclo natural, enquanto a Torre é a destruição de algo construído sobre falsas premissas. A relação pode ser caótica, mas é extremamente poderosa para eliminar o que não é mais verdadeiro na vida de ambos."
    },
    "17-19": {
        summary: "A combinação do otimismo com a esperança radiante.",
        details: "Esta é uma conexão de pura luz. A Estrela traz a fé e a inspiração, e o Sol traz a alegria e o sucesso. Juntos, eles criam um ambiente de positividade contagiante, capaz de superar qualquer escuridão."
    },
    "19-19": {
        summary: "Uma explosão de alegria, sucesso e vitalidade.",
        details: "Esta é uma relação de brilho intenso. Há otimismo, clareza e celebração mútua. O único risco é o excesso de energia, que pode levar a um esgotamento ou a uma competição para ver quem brilha mais. É importante que um ilumine o outro, e não o ofusque."
    },
    "17-18": {
        summary: "Uma conexão de almas, onde a esperança encontra o mistério.",
        details: "Esta é uma das relações mais intuitivas e psíquicas. A Estrela oferece uma fé calma e uma luz de esperança que pode guiar através do território muitas vezes confuso e ilusório da Lua. A Lua, por sua vez, oferece uma profundidade emocional e onírica que a Estrela pode inspirar. O desafio é discernir a intuição verdadeira da ilusão, e a esperança genuína do otimismo cego."
    },
};
/**
 * Função principal que busca na matriz e monta o resultado da compatibilidade.
 * @param arcana1 - O objeto MajorArcana da primeira pessoa.
 * @param arcana2 - O objeto MajorArcana da segunda pessoa.
 * @returns Um objeto CompatibilityAspect completo.
 */
function getArchetypeCompatibility(arcana1, arcana2) {
    // 1. Cria uma chave de busca que independe da ordem (ex: "2-4" é o mesmo que "4-2")
    const key = `${Math.min(arcana1.id, arcana2.id)}-${Math.max(arcana1.id, arcana2.id)}`;
    // 2. Busca a interpretação na nossa matriz de dados
    let interpretation = matrix[key];
    // 3. Lógica de Fallback: se a combinação exata não for encontrada
    if (!interpretation) {
        interpretation = {
            summary: "Uma combinação de energias únicas e complexas.",
            details: `A interação entre ${arcana1.name} e ${arcana2.name} cria uma dinâmica com grande potencial para crescimento. A chave está em entender e respeitar as qualidades distintas que cada um traz para a relação.`
        };
    }
    // 4. Lógica de Score (Gamificação) - um exemplo simples que pode ser refinado
    // (Esta é uma lógica simbólica para ilustrar a funcionalidade)
    const score = (100 - Math.abs(arcana1.id - arcana2.id) * 3) % 101;
    // 5. Monta o objeto final
    return {
        title: `Compatibilidade Arquetípica: ${arcana1.name} e ${arcana2.name}`,
        harmonyScore: score,
        summary: interpretation.summary,
        details: interpretation.details,
    };
}
