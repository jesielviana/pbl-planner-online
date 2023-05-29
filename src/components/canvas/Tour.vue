<template>
  <div>
    <v-tour name="myTour" :steps="steps" :options="myOptions"></v-tour>
  </div>
</template>

<script>
export default {
  name: 'Tour',
  props: {},
  data() {
    return {
      myOptions: {
        highlight: true,
        useKeyboardNavigation: true,
        labels: {
          buttonSkip: 'Sair',
          buttonPrevious: 'Anterior',
          buttonNext: 'Próximo',
          buttonStop: 'Finalizar',
        },
      },
      steps: [
        {
          target: '.curso',
          content:
            '1 - Curso <br> Contextualização do curso ou da disciplina '
            + 'definindo itens como nome do curso, tempo de duração, '
            + 'modalidade, público-alvo, pré-requisitos para cursar são '
            + 'descritos neste campo.',
          params: {
            placement: 'bottom',
            // enableScrolling: false
          },
        },
        {
          target: '.objetivos',
          content:
            '2 - Objetivos <br> Definição das metas de aprendizagem dos alunos, '
            + 'metas relacionadas à motivação, ao engajamento e à assiduidade '
            + 'dos alunos, bem como ao desempenho geral da turma. '
            + 'Definição de metas relacionadas à empregabilidade e ao '
            + 'desempenho profissional geral do aluno.',
          params: {
            placement: 'bottom',
            // enableScrolling: false
          },
        },
        {
          target: '.indicadores-sucesso',
          content:
            '3 - Indicadores de Sucesso <br> Definição dos indicadores '
            + 'de sucesso do discente, da metodologia e do curso.',
          params: {
            placement: 'bottom',
            // enableScrolling: false
          },
        },
        {
          target: '.problema',
          content:
            '4 - Problema <br> Captação, descrição sistemática, apresentação, '
            + 'aprovação da proposta do problema e alteração da escolha do problema.',
          params: {
            placement: 'bottom',
          },
        },
        {
          target: '.ambiente',
          content:
            '5 - Ambiente <br> Definição dos equipamentos, softwares e '
            + 'materiais necessários para execução do curso; '
            + 'definição do espaço físico, ambientação e do espaço virtual.',
          params: {
            placement: 'bottom',
          },
        },
        {
          target: '.capital-humano',
          content: '6 - Capital Humano <br> Definição dos papéis e da equipe '
          + 'que fará parte do curso.',
          params: {
            placement: 'bottom',
          },
        },
        {
          target: '.conteudo',
          content:
            '7 - Conteúdo <br> escrição do conteúdo de um módulo educacional. '
            + 'Indicação de fontes para apoio ou aprofundamento dos conhecimentos.',
          params: {
            placement: 'bottom',
          },
        },
        {
          target: '.avaliacao-aprendizagem',
          content:
            '8 - Avaliação da Aprendizagem <br> Processo de avaliação que '
            + 'contempla vários aspectos como: conteúdo, satisfação do cliente, '
            + 'processo de resolução do problema, resultado da resolução do problema, '
            + 'competências interpessoais, desempenho e planejamento docente, '
            + 'objetivos metodológicos e execução geral do curso.',
          params: {
            placement: 'bottom',
          },
        },
        {
          target: '.processos',
          content: '9 - Processos <br> Descrição do processo de aprendizagem com '
          + 'base na resolução de problemas e processo de divisão dos alunos que '
          + 'formarão grupos.',
          params: {
            placement: 'top',
          },
        },
        {
          target: '.cronograma',
          content: '10 - Cronograma <br> Definição das datas de aulas, da agenda '
          + 'de avaliações discentes e docentes, das entregas dos artefatos solicitados '
          + 'pelos docentes, das avaliações dos objetivos metodológicos e da avaliação '
          + 'da qualidade do curso.',
          params: {
            placement: 'top',
          },
        },
        {
          target: '.riscos',
          content: '11 - Riscos <br> Levantamento das ameaças relacionadas à '
          + 'infraestrutura de TIC, planejamento e execução das metodologias de '
          + 'ensino e aprendizagem, influências externas ao ambiente do projeto, '
          + 'comunicação, definição de objetivos, gestão do capital humano, custo, '
          + 'prazo e escopo.',
          params: {
            placement: 'top',
          },
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
.v-step{
  width: 33% !important;
  max-width: 500px !important;
}

.gridContainerGeral .v-tour__target--highlighted {
  box-shadow: 0 0 0 99999px rgba(0,0,0,.4);
}
</style>
