<template>
  <div>
    <div class="search">
      <div>
        <button
          @click.prevent="go('.course')"
          class="field-button"
        >
          <img
            :src="'/img/cards/course-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click.prevent="go('.objectives')"
          class="field-button"
        >
          <img
            :src="'/img/cards/objectives-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click.prevent="go('.indicators')"
          class="field-button"
        >
          <img
            :src="'/img/cards/indicators-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click.prevent="go('.problem-cards')"
          class="field-button"
        >
          <img
            :src="'/img/cards/problems-front.png'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.enviroment')"
          class="field-button"
        >
          <img
            :src="'/img/cards/environment-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.human')"
          class="field-button"
        >
          <img
            :src="'/img/cards/capital-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.content')"
          class="field-button"
        >
          <img
            :src="'/img/cards/content-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.assessment')"
          class="field-button"
        >
          <img
            :src="'/img/cards/avaliacao-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.process')"
          class="field-button"
        >
          <img
            :src="'/img/cards/process-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.schedule')"
          class="field-button"
        >
          <img
            :src="'/img/cards/schedule-front.svg'"
            class="img-fluid"
          />
        </button>
        <button
          @click="go('.risks')"
          class="field-button"
        >
          <img
            :src="'/img/cards/scratchs-front.svg'"
            class="img-fluid"
          />
        </button>
      </div>
      <b-form
        style="display:flex"
        @submit.prevent="onSearch"
      >
        <b-form-input
          style="margin-right: 10px"
          v-model="cardNum"
          type="number"
          min="1"
          max="40"
          placeholder="Número da Carta"
        ></b-form-input>
        <b-button
          style="padding: 6px 10px 0px 10px;"
          type="submit"
          variant="primary"
        >
          <span class="material-icons">search</span>
        </b-button>
      </b-form>
    </div>
    <div class="cards">
      <div class="course">
        <h3>Curso</h3>
        <div
          id="1"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/course-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Descritivo Básico</span>
            </div>
            <span>01</span>
          </header>
          <p>Descrição do curso o qual se deseja criar ou ajustar.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual área de atuação?
              <br />
              <span>Ex.: Engenharia de Software</span>
            </li>
            <li>
              Qual a modalidade?
              <br />
              <span>Ex.: Presencial</span>
            </li>
            <li>
              Qual o nome do curso?
              <br />
              <span>Ex.: Gestão de Projetos</span>
            </li>
            <li>
              Qual o nível?
              <br />
              <span>Ex.: Graduação</span>
            </li>
            <li>
              Qual o público-alvo?
              <br />
              <span>Ex.: Estudantes de Computação</span>
            </li>
            <li>
              Qual tamanho máximo da turma?
              <br />
              <span>Ex.: 40 Alunos</span>
            </li>
            <li>
              Qual a carga horária e duração?
              <br />
              <span>Ex.: 60 horas, em 04 meses</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Formalização da descrição do curso (plano de curso).
          </p>
        </div>

        <div
          id="2"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/course-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Pré-Requisitos</span>
            </div>
            <span>02</span>
          </header>
          <p>Requisitos básicos necessários que os alunos devem possuir para ingressar no curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais são os pré-requisitos que os alunos precisam atender?
              <br />
              <span>
                Ex.: Leitura fluente na língua inglesa e conceitos básicos em metodologias de
                gerenciamento de projetos
              </span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Formalização dos pré-requisitos do curso (plano de curso).
          </p>
        </div>
      </div>
      <div class="objectives">
        <h3>Objetivos</h3>
        <div
          id="3"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/objectives-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Objetivos Educacionais</span>
            </div>
            <span>03</span>
          </header>
          <p>Definição das competências de aprendizagem dos alunos.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais competências técnicas os alunos devem desenvolver?
              <br />
              <span>Ex.: Gerenciamento ágil, técnicas de gestão.</span>
            </li>
            <li>
              Quais as competências não-técnicas (pessoais, gerenciais e de negócio)?
              <br />
              <span>
                Ex.: Liderança, trabalho em grupo, iniciativa, comunicação, inovação, processos de
                negócio.
              </span>
            </li>
            <li>
              Quais as habilidades práticas?
              <br />
              <span>Ex.: Planejamento de projetos de software.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Formalização dos objetivos educacionais (plano de curso).
          </p>
        </div>
        <div
          id="4"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/objectives-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Objetivos Gerais do curso</span>
            </div>
            <span>04</span>
          </header>
          <p>Definição dos objetivos globais que se pretende alcançar no curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais são os objetivos globais para o curso?
              <br />
              <span>Ex.: Alunos engajados, baixa evasão, alta taxa de aproveitamento
                do ensino por turma e por equipe, planejamento docente eficiente,
                professores ministrando as aulas com excelência.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Formalização dos objetivos do curso (plano de curso).
          </p>
        </div>
        <div
          id="5"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/objectives-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Objetivos Metodológicos</span>
            </div>
            <span>05</span>
          </header>
          <p>Definição dos propósitos relacionados à aplicação do método PBL.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os objetivos a serem alcançados com o uso do método PBL e
              seus processos do curso?
              <br />
              <span>Ex.: Atividades de aprendizado ancoradas em um problema,
                aprendiz dono do problema, problema real.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Formalização dos objetivos estratégicos (plano de curso).
          </p>
        </div>
      </div>

      <div class="indicators">
        <h3>Indicadores</h3>
        <div
          id="6"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/indicators-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Sucesso do professor</span>
            </div>
            <span>06</span>
          </header>
          <p>
            Definição das métricas para avaliação do sucesso do professor, quanto ao seu desempenho e
            planejamento.
          </p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais as metas definidas para avaliar o sucesso da atuação do professor?
              <br />
              <span>
                Ex.: Obter o conceito mínimo classificado como BOM na média dos seguintes aspectos:
                Experiência x teoria, planejamento, dinâmica de aula.
              </span>
            </li>
            <li>
              Que tipo de instrumento será utilizado?
              <br />
              <span>Ex.: Formulários online.</span>
            </li>
            <li>
              Quem irá aplicar e acompanhar a avaliação?
              <br />
              <span>Ex.: Coordenador.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Instrumento de acompanhamento contendo os indicadores definidos para cada métrica.
          </p>
        </div>

        <div
          id="7"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/indicators-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Sucesso do aluno</span>
            </div>
            <span>07</span>
          </header>
          <p>Indicadores que serão acompanhados para medir o grau de sucesso do aluno.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais as metas para avaliar o sucesso do desempenho do aluno?
              <br />
              <span>
                Ex.: Obter 70% de aproveitamento na média considerando 5 aspectos: Domínio do
                conteúdo, capacidade de resolução de problemas, qualidade das entregas, relacionamento
                interpessoal e atendimento ao cliente.
              </span>
            </li>
            <li>
              Como serão aferidos?
              <br />
              <span>
                Ex.: Através de questionários, relatórios, entrega de artefatos, apresentações e
                avaliações.
              </span>
            </li>
            <li>
              Quem irá aplicar e acompanhar a avaliação?
              <br />
              <span>Ex.: Professor e tutores.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Instrumento de acompanhamento contendo as métricas de cada indicador.
          </p>
        </div>

        <div
          id="8"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/indicators-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Sucesso do método PBL</span>
            </div>
            <span>08</span>
          </header>
          <p>Metas para medição do sucesso da aplicação do método PBL.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais as metas que serão definidas para avaliar o sucesso do método de aprendizagem?
              <br />
              <span>
                Ex.: Taxa de aprovação do método pelos alunos de 85%. Taxa de aprovação do cliente de
                80%. Nota 9,0 em aderência dos princípios PBL.
              </span>
            </li>
            <li>
              Como serão afetados?
              <br />
              <span>Ex.: Questionário do PBL-test.</span>
            </li>
            <li>
              Quem irá aplicar e acompanhar a avaliação?
              <br />
              <span>Ex.: Coordenador, tutores.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Instrumento de acompanhamento contendo as métricas de cada indicador.
          </p>
        </div>

        <div
          id="9"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/indicators-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Sucesso do curso</span>
            </div>
            <span>09</span>
          </header>
          <p>Elementos que serão monitorados a fim de indicar o grau de sucesso do curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais as metas que serão definidas para avaliar o sucesso do curso?
              <br />
              <span>
                Ex.: Média de engajamento da turma de 80%, taxa de evasão de 10%, nota média da turma
                de 70%.
              </span>
            </li>
            <li>
              Como serão aferidos?
              <br />
              <span>Ex.: Através de questionário, relatórios e avaliações dos módulos educacionais.</span>
            </li>
            <li>
              Quem irá aplicar e acompanhar a avaliação?
              <br />
              <span>Ex.: Professores e Coordenador.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Instrumento de acompanhamento contendo as métricas de cada indicador.
          </p>
        </div>
      </div>

      <div class="problem-cards">
        <h3>Problema</h3>
        <div
          id="10"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/problems-front.png'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Captação e Seleção</span>
            </div>
            <span>10</span>
          </header>
          <p>Seleção de clientes dispostos a aprensentar oportunidades.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Como será feito a captação das oportunidades?
              <br />
              <span>
                Ex.: Equipes buscam o cliente real e problemas a serem resolvidos para futura
                apresentação.
              </span>
            </li>
            <li>
              Quem fará a captação?
              <br />
              <span>Ex.: Cada equipe de alunos.</span>
            </li>
            <li>
              Quando será feita a captura?
              <br />
              <span>Ex.: Na primeira semana de aula.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Agenda de apresentações dos problemas fechada.
          </p>
        </div>

        <div
          id="11"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/problems-front.png'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Descrição textual</span>
            </div>
            <span>11</span>
          </header>
          <p>Descrição sistemática e detalhada do problema.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais informações devem compor a descrição do problema?
              <br />
              <span>
                Ex.: Domínio do problema, público alvo, necessidades do cliente, relevância do
                problema.
              </span>
            </li>
            <li>
              Quem fará a descrição?
              <br />
              <span>Ex.: Cada equipe de alunos.</span>
            </li>
            <li>
              Quando será feita a descrição?
              <br />
              <span>Ex.: Primeira semana de aula.</span>
            </li>
            <li>
              Onde será feita a descrição?
              <br />
              <span>Ex.: Sala de Aula.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Documento que contenha a formalização do problema.
          </p>
        </div>

        <div
          id="12"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/problems-front.png'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Apresentação.</span>
            </div>
            <span>12</span>
          </header>
          <p>Apresentação dos problemas.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Como será feito a apresentação do problema?
              <br />
              <span>Ex.: Formato livre.</span>
            </li>
            <li>
              Quem fará a apresentação?
              <br />
              <span>Ex.: Cada equipe de alunos.</span>
            </li>
            <li>
              Quando será feita a apresentação?
              <br />
              <span>Ex.: Durante a primeira semana de aula.</span>
            </li>
            <li>
              Onde será feita a apresentação?
              <br />
              <span>Ex.: Sala de aula.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Documento que contenha a formalização do problema.
          </p>
        </div>

        <div
          id="13"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/problems-front.png'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Validação</span>
            </div>
            <span>13</span>
          </header>
          <p>Aprovação dos problemas apresentados.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os critérios para validação dos problemas apresentados?
              <br />
              <span>Ex.: Adequação, relevância, inovação.</span>
            </li>
            <li>
              Quem irá validar?
              <br />
              <span>Ex.: Tutores e coordenação.</span>
            </li>
            <li>
              Quando será divulgado o feedback da validação?
              <br />
              <span>Ex.: Logo após cada apresentação.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Checklist de aceitação do problema preenchido. Notificação da avaliação aos principais
            stakeholders.
          </p>
        </div>

        <div
          id="14"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/problems-front.png'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Modificação</span>
            </div>
            <span>14</span>
          </header>
          <p>Alterar a escolha de um problema.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Como será feita a solicitação de mudança do problema?
              <br />
              <span>Ex.: A equipe deverá solicitar para a coordenação.</span>
            </li>
            <li>
              Quando poderá ser feita a mudança?
              <br />
              <span>Ex.: Até o final do primeiro módulo educacional.</span>
            </li>
            <li>
              O que é preciso apresentar na solicitação?
              <br />
              <span>Ex.: Apresentação de novo problema.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Registro da mudança, com justificativa. Atualização do checklist de aceitação com o novo
            problema. Notificação do resultado da alteração do problema aos principais stakeholders.
          </p>
        </div>
      </div>

      <div class="enviroment">
        <h3>Ambiente</h3>
        <div
          id="15"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/environment-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Infraestrutura de TIC</span>
            </div>
            <span>15</span>
          </header>
          <p>Definição dos equipamentos, softwares e materiais necessários para execução do curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os equipamentos necessários para execução do curso?
              <br />
              <span>Ex.: Tablets ou computadores, projetor.</span>
            </li>
            <li>
              Quais os softwares?
              <br />
              <span>Ex.: Editor de texto e Dropbox.</span>
            </li>
            <li>
              É necessário acesso à internet?
              <br />
              <span>Ex.: Sim, link mínimo de 5 mb.</span>
            </li>
            <li>
              Quais materiais de escritório serão necessários?
              <br />
              <span>Ex.: Hidrocor, apagador, cartolina, post-it, fita adesiva.</span>
            </li>
            <li>
              Onde serão usados os materiais?
              <br />
              <span>Ex.: Na sala de aula.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Detalhamento dos itens de infra TIC(hardware, software, materiais) e seleção de
            fornecedor.
          </p>
        </div>

        <div
          id="16"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/environment-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Infraestrutura Física</span>
            </div>
            <span>16</span>
          </header>
          <p>Definição do espaço físico e ambientação da sala de aula.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual espaço necessário para realização do curso?
              <br />
              <span>Ex.: Sala climatizada com capacidade para 40 pessoas.</span>
            </li>
            <li>
              Qual a arquitetura necessária para o ambiente?
              <br />
              <span>Ex.: Mesas e cadeiras de forma a privilegiar o trabalho em equipe.</span>
            </li>
            <li>
              Qual o mobiliário necessário?
              <br />
              <span>
                Ex.: 6 quadros brancos, 5 mesas redondas para 8 pessoas, 40 cadeiras de rodinhas,
                tela para projeção, 2 armários.
              </span>
            </li>
            <li>
              Quais materiais de escritório serão necessários?
              <br />
              <span>Ex.: Hidrocor, apagador, cartolina, post-it, fita adesiva.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Detalhamento de itens de infra física (mobília, utensílios) e seleção de fornecedor.
          </p>
        </div>

        <div
          id="17"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/environment-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Ambiente virtual</span>
            </div>
            <span>17</span>
          </header>
          <p>
            Espaço virtual que permite o acesso a um curso e a interação entre todos os envolvidos no
            processo de ensino-aprendizagem.
          </p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual será o ambiente virtual de aprendizado?
              <br />
              <span>Ex.: Moodle.</span>
            </li>
            <li>
              Quais os recursos do ambiente virtual que serão utilizados?
              <br />
              <span>Ex.: E-mail, vídeos, fórum, chat, quiz.</span>
            </li>
            <li>
              Quais as principais características desejadas do ambiente?
              <br />
              <span>
                Ex.: Acessibilidade, compatibilidade, interface amigável, capacidade de
                customização.
              </span>
            </li>
            <li>
              Quem serão os usuários do ambiente?
              <br />
              <span>Ex.: Professores, alunos, tutores e coordenador.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Indicação de e acesso ao ambiente virtual.
          </p>
        </div>
      </div>

      <div class="human">
        <h3>Capital Humano</h3>
        <div
          id="18"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Cliente</span>
            </div>
            <span>18</span>
          </header>
          <p>Responsável por trazer as oportunidades, validar resultados parciais e totais.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quem será o cliente?
              <br />
              <span>Ex.: Empresa GHSA.</span>
            </li>
            <li>
              Como será sua participação?
              <br />
              <span>
                Ex.: No Workshop de oportunidades, nas avaliações de satisfação e apresentação
                final.
              </span>
            </li>
            <li>
              Em que local se dará a sua atuação?
              <br />
              <span>Ex.: Sala de aula ou remotamente.</span>
            </li>
            <li>
              Em quais momentos se dará sua atuação?
              <br />
              <span>Ex.: Sob demanda.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Agenda do workshop. Informação sobre possíveis visitas de acompanhamento. Definição de
            canal de comunicação remoto.
          </p>
        </div>

        <div
          id="19"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Aluno</span>
            </div>
            <span>19</span>
          </header>
          <p>Responsável pela resolução do problema, junto a sua equipe.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual o perfil do aluno?
              <br />
              <span>Ex.: Perfil de gestor.</span>
            </li>
            <li>
              Qual sua faixa etária?
              <br />
              <span>Ex.: Entre 18 e 20 anos.</span>
            </li>
            <li>
              Quanto tempo de experiência profissional?
              <br />
              <span>Ex.: Experiência profissional de 2 anos.</span>
            </li>
            <li>
              Como prefere aprender?
              <br />
              <span>Ex.: Aulas práticas e projetos.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Modelo de identificação de personalidade. Diagnóstico de alinhamento ao método
          </p>
        </div>

        <div
          id="20"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Professor</span>
            </div>
            <span>20</span>
          </header>
          <p>Consultor e facilitador na condução das atividades em sala de aula.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quem serão os professores?
              <br />
              <span>Ex.: Leo Macedo.</span>
            </li>
            <li>
              Em quais módulos educacionais lecionarão?
              <br />
              <span>Ex.: De acordo com o mapa de alocação do curso.</span>
            </li>
            <li>
              Como serão suas aulas?
              <br />
              <span>Ex.: Práticas apoiadas pelos módulos educacionais.</span>
            </li>
            <li>
              Onde serão as aulas?
              <br />
              <span>Ex.: Salas de aula/laboratórios.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Mapa de alocação do professor. Termo de compromisso para formalização do professor.
          </p>
        </div>

        <div
          id="21"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Tutor Técnico</span>
            </div>
            <span>21</span>
          </header>
          <p>Consultor especialista, responsável pelo apoio em questões de natureza técnica.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quem será o tutor ?
              <br />
              <span>Ex.: Pedro Gomes.</span>
            </li>
            <li>
              Em que momento atuará?
              <br />
              <span>Ex.: De acordo com o calendário do curso e sob demanda.</span>
            </li>
            <li>
              De que maneira o tutor auxiliará os alunos?
              <br />
              <span>
                Ex.: Questões específicas relacionadas a soluções de problemas, como por exemplo,
                métodos, técnicas e ferramentas.
              </span>
            </li>
            <li>
              Onde se dará a sua atuação?
              <br />
              <span>Ex.: Salas de aula/laboratórios.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Mapa de alocação dos tutores. Termo de compromisso para formalização do tutor.
          </p>
        </div>

        <div
          id="22"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Tutor PBL</span>
            </div>
            <span>22</span>
          </header>
          <p>
            Responsável pelo acompanhamento e melhorias da metodologia de ensino-aprendizagem, e
            acompanhamento dos alunos
          </p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quem será o tutor?
              <br />
              <span>Ex.: Maria da Silva.</span>
            </li>
            <li>
              Quando atuará?
              <br />
              <span>Ex.: De acordo com calendário do curso e sob demanda.</span>
            </li>
            <li>
              De que maneiras o tutor auxiliará os alunos?
              <br />
              <span>Ex.: Questões específicas relacionadas a metodologia de ensino</span>
            </li>
            <li>
              Onde se dará sua atuação?
              <br />
              <span>Ex.: Salas de aula/laboratórios.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Mapa de alocação de tutores. Termos de compromisso para formalização do tutor.
          </p>
        </div>

        <div
          id="23"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/capital-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Coordenador</span>
            </div>
            <span>23</span>
          </header>
          <p>Pessoa responsável por coordenar, acompanar e avaliar as atividades acadêmicas do curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quem será o coordenador?
              <br />
              <span>Ex.: Gustavo Alexandre.</span>
            </li>
            <li>
              Em que momento deve atuar?
              <br />
              <span>Ex.: De acordo com calendário do curso e sob demanda.</span>
            </li>
            <li>
              Quais suas atividades?
              <br />
              <span>
                Ex.: Responsável pela alocação dos professores, acompanhamento da turma, análise de
                satisfação dos alunos com o curso e instituição.
              </span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Termos de compromisso para formalização do coordenador.
          </p>
        </div>
      </div>

      <div class="content">
        <h3>Conteúdo</h3>
        <div
          id="24"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/content-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Módulo educacional</span>
            </div>
            <span>24</span>
          </header>
          <p>Descrição do conteúdo de um módulo educacional.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os módulos educacionais do curso?
              <br />
              <span>Ex.: 1) Planejamento, 2) Acompanhamento.</span>
            </li>
            <li>
              Quais os assuntos de cada módulo educacional?
              <br />
              <span>
                Ex.: Para o módulo 1: planejar projetos de software e para o módulo 2: cronograma,
                custos, riscos, comunicação.
              </span>
            </li>
            <li>
              Qual a carga horária de cada módulo?
              <br />
              <span>Ex.: 20h para o módulo 1 e 30h para o módulo 2.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Plano de aula de cada módulo educacional.
          </p>
        </div>

        <div
          id="25"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/content-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Fontes de referência</span>
            </div>
            <span>25</span>
          </header>
          <p>Fontes que possuem conteúdos para apoio ou aprofundamento dos conhecimentos.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais bases de pesquisa serão indicadas?
              <br />
              <span>Ex.: ACM, Emerald.</span>
            </li>
            <li>
              Quais os sites?
              <br />
              <span>Ex.: www.pmi.org</span>
            </li>
            <li>
              Quais os livros?
              <br />
              <span>Ex.: Livro PMBOK v5.</span>
            </li>
            <li>
              Quais as revistas e periódicos?
              <br />
              <span>Ex.: Mundo PM.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Lista de referências ou fontes de referências
          </p>
        </div>
      </div>

      <div class="assessment">
        <h3>Avaliação</h3>
        <div
          id="26"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação de conteúdo</span>
            </div>
            <span>26</span>
          </header>
          <p>Avaliação com base nos conceitos, práticas e contextos utilizados durante as aulas.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>
                Ex.: Entendimento de: conceitos básicos do projeto, ciclo de vida, processos e
                fatores críticos.
              </span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: A critério do professor (ao menos 1 por módulos educacionais).</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: A critério do professor (oral, escrita, prática, entre outros).</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de notas, por dimensão. Gráfico de evolução dos estudantes, para feedback
            contínuos.
          </p>
        </div>

        <div
          id="27"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Processo de resolução de problema</span>
            </div>
            <span>27</span>
          </header>
          <p>Avaliação do cumprimento do processo de resolução de problemas de cada equipe.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>Ex.: Projeto planejado, projeto realizado, pontos fortes, e de melhoria.</span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 6 vezes.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Durante reunião de acompanhamento de projeto.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de notas, por dimensão. Gráfico de evolução dos estudantes, para feedback
            contínuos.
          </p>
        </div>

        <div
          id="28"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação de resultados</span>
            </div>
            <span>28</span>
          </header>
          <p>Avaliação das demandas do cliente real.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>Ex.: Completude da entrega, corretude da entrega, inovação de produtos.</span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 4 vezes.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Durante reunião de acompanhamento de projeto.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de notas, por dimensão. Gráfico de evolução dos estudantes, para feedback
            contínuos.
          </p>
        </div>

        <div
          id="29"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação de desempenho</span>
            </div>
            <span>29</span>
          </header>
          <p>Avaliação do cumprimento do processo de resolução de problemas de cada equipe.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>Ex.: Comunicação, iniciativa, liderança, inovação.</span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 4 vezes.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Durante reunião de acompanhamento de projeto.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de notas, por dimensão. Gráfico de evolução dos estudantes, para feedback
            contínuos.
          </p>
        </div>

        <div
          id="30"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação de satisfação do cliente</span>
            </div>
            <span>30</span>
          </header>
          <p>
            Avaliação de satisfação do cliente quanto ao desenvolvimento da solução e suas partes
            pelos alunos.
          </p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>
                Ex.: Entendimento das necessidades, nível e qualidade de interação; Qualidade das
                soluções propostas.
              </span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 4 vezes.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>
                Ex.: Por meio de um formulário eletrônico com critérios de satisfação, definidos
                desde o início do curso com o apoio do cliente.
              </span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de notas, por dimensão. Gráfico de evolução dos estudantes, para feedback
            contínuos.
          </p>
        </div>

        <div
          id="31"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação do professor</span>
            </div>
            <span>31</span>
          </header>
          <p>Avaliação da atuação do professor.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>
                Ex.: Para planejamento: Definição e alcance de objetivos, contribuição para o
                currículo, referências fornecidas. Para desempenho: Teoria x Prática, domínio do
                conteúdo, exposição de ideias, encorajamento dos estudantes.
              </span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 1 vez ao final de cada módulo educacional.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Remotamente, por meio de formulário eletrônico.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de desempenho contendo os critérios. Gráfico de evolução dos professores, para
            ações de melhoria.
          </p>
        </div>

        <div
          id="32"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação dos objetivos metodológicos</span>
            </div>
            <span>32</span>
          </header>
          <p>Avaliação referente ao atendimento dos princípios PBL.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>
                Ex.: Adequabilidade do problema, interações entre o capital humano envolvido, apoio
                do conteúdo, ambiente, processo de avaliação.
              </span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 2 vezes, uma na metade e outra no fim do curso.</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Remotamente, por meio de formulário eletrônico.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Questionário do PBL-Test; Respostas do questionário.
          </p>
        </div>

        <div
          id="33"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/avaliacao-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Avaliação do curso</span>
            </div>
            <span>33</span>
          </header>
          <p>Avaliação referente a qualidade do curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais critérios serão utilizados?
              <br />
              <span>
                Ex.: Satisfação do aluno, alunos matriculados x alunos concluintes, participação,
                frequência, notas.
              </span>
            </li>
            <li>
              Quantas avaliações serão aplicadas?
              <br />
              <span>Ex.: 3 vezes (no início, meio e final do curso).</span>
            </li>
            <li>
              Como serão realizadas?
              <br />
              <span>Ex.: Através de questionário, relatórios e avaliações dos módulos educacionais.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Questionário de avaliação do curso. Respostas do questionário.
          </p>
        </div>
      </div>

      <div class="process">
        <h3>Processos</h3>
        <div
          id="34"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/process-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Formação de equipe</span>
            </div>
            <span>34</span>
          </header>
          <p>Divisão dos alunos que formarão equipes.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os critérios para a divisão das equipes?
              <br />
              <span>Ex.: Nível de formação, competências, experiência profissional e afinidades.</span>
            </li>
            <li>
              Quantos alunos por equipe?
              <br />
              <span>Ex.: De 5 a 7 por equipe.</span>
            </li>
            <li>
              Quem fará a divisão?
              <br />
              <span>Ex.: Professores e tutores.</span>
            </li>
            <li>
              Quando será feita a divisão?
              <br />
              <span>Ex.: Proposta inicial de equipes durante as primeiras aulas.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Planilha de formação de equipes, incluindo nomes dos alunos e
            tipo de personalidade.
            Modelo de identificação de personalidade.
          </p>
        </div>

        <div
          id="35"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/process-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Processo de aprendizagem</span>
            </div>
            <span>35</span>
          </header>
          <p>Descrição do processo de aprendizagem com base na resolução de problemas.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual o processo de aprendizagem a ser seguido?
              <br />
              <span>
                Ex.: Processo PBL de Barrows de 4 etapas (Propor, Discutir, Solucionar e
                Avaliar).
              </span>
            </li>
            <li>
              Como o processo é executado?
              <br />
              <span>
                Ex.: De forma interativa, conduzido pelas próprias equipes dos
                alunos e acompanhado
                pelo professor e tutores.
              </span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Desenho descritivo do processo e estratégia de aplicação.
          </p>
        </div>
      </div>

      <div class="schedule">
        <h3>Cronograma</h3>
        <div
          id="36"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/schedule-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Agenda de aulas</span>
            </div>
            <span>36</span>
          </header>
          <p>Definição do calendário de aulas.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Qual será o período de aulas?
              <br />
              <span>
                Ex.: As aulas ocorrerão quinzenalmente nas sextas (19h às 22h) e sábados (8h às 18h).
                O curso terá duração de 18 meses
              </span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Calendário de Aulas.
          </p>
        </div>

        <div
          id="37"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/schedule-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Agenda de avaliações</span>
            </div>
            <span>37</span>
          </header>
          <p>Definição das datas das avaliações de aluno, professor, objetivos metodológicos e curso.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quando serão as avaliações dos alunos?
              <br />
              <span>
                Ex.: Avaliação de conteúdo, o final dos dois primeiros módulos, processo, resultado e
                satisfação do cliente, na reunião de acompanhamento do projeto, desempenho, no final
                do primeiro e do penúltimo módulo.
              </span>
            </li>
            <li>
              Quando serão as avaliações dos professores?
              <br />
              <span>Ex.: No final de cada módulo educacional.</span>
            </li>
            <li>
              Quando será a avaliação dos objetivos metodológicos?
              <br />
              <span>Ex.: Três vezes ao longo do curso, no final de cada módulo educacional.</span>
            </li>
            <li>
              Quando será a avaliação do curso?
              <br />
              <span>Ex.: No final da primeira metade do curso e no final do último módulo.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Agenda de avaliações.
          </p>
        </div>

        <div
          id="38"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/schedule-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Agenda de entregas</span>
            </div>
            <span>38</span>
          </header>
          <p>Definição das datas de entregas dos artefatos solicitados pelos professores.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quando será as datas de entregas dos artefatos?
              <br />
              <span>Ex.: Até 10 dias após o final de cada módulo.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Agenda de avaliações.
          </p>
        </div>
      </div>

      <div class="risks">
        <h3>Riscos</h3>
        <div
          id="39"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/scratchs-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Riscos metodológicos</span>
            </div>
            <span>39</span>
          </header>
          <p>Ameaças relacionadas ao planejamento e execução da metodologia de ensino e aprendizagem.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os riscos relativos aos objetivos e aos pré-requisitos definidos?
              <br />
              <span>Ex.: Objetivos mal definidos.</span>
            </li>
            <li>
              Quais os riscos quanto ao processo de aprendizagem?
              <br />
              <span>Ex.: Escopo do problema inadequado.</span>
            </li>
            <li>
              Quais os riscos no processo de avaliação?
              <br />
              <span>Ex.: Falta de clareza na definição dos critérios de avaliação.</span>
            </li>
            <li>
              Quais os riscos relativos aos indicadores de sucesso?
              <br />
              <span>Ex.: Instrumento de avaliação não adequado para o indicador.</span>
            </li>
            <li>
              Quais os riscos relacionados aos Stakeholders?
              <br />
              <span>Ex.: Não comparecimento nas datas agendadas.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Plano de gestão de riscos.
          </p>
        </div>

        <div
          id="40"
          class="pbl-card-content"
        >
          <header>
            <div class="pbl-card-header">
              <img
                :src="'/img/cards/scratchs-front.svg'"
                class="img-fluid"
              />
              <span class="pbl-card-title">Riscos acadêmicos administrativos</span>
            </div>
            <span>40</span>
          </header>
          <p>Ameaças relacionadas aos processos e ações acadêmicas administrativas.</p>
          <span class="bold">PERGUNTAS e RESPOSTAS</span>
          <ol>
            <li>
              Quais os riscos relativos a alocação do capital humano?
              <br />
              <span>Ex.: Falta de experiência da equipe alocada.</span>
            </li>
            <li>
              Quais os riscos relativos quanto às formas e meios de comunicação entre os
              envolvidos?
              <br />
              <span>Ex.: Falta de canais de comunicação eficientes.</span>
            </li>
            <li>
              Que riscos envolvem custos de aquisição?
              <br />
              <span>Ex.: Estimativas inapropriadas para insumos do curso.</span>
            </li>
            <li>
              Quais os riscos relativos ao cronograma?
              <br />
              <span>Ex.: Adiamento/Cancelamento de aula ou avaliação.</span>
            </li>
            <li>
              Quais os riscos relativos ao escopo do curso?
              <br />
              <span>Ex.: Carga horária insuficiente.</span>
            </li>
          </ol>
          <p>
            <b>ARTEFATOS</b>
            <br />Plano de gestão de riscos.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cartas',
  data() {
    return {
      cardNum: '',
    };
  },
  methods: {
    onSearch() {
      const elmnt = document.getElementById(this.cardNum);
      elmnt.scrollIntoView({ block: 'end', behavior: 'instant' });
    },

    go(item) {
      const elmnt = document.querySelector(item);
      elmnt.scrollIntoView({ block: 'start', behavior: 'instant' });
    },
  },
};
</script>

<style lang="scss">
.sidebar {
  width: 0;
  position: fixed;
  z-index: 99999;
  top: 65px;
  bottom: 5px;
  background-color: #fafafa;
  transition: 0.5s;
  padding-top: 0px;

}

.sidebar .cards{
  height: calc(100% - 65px);
  overflow-x: hidden;
  padding-bottom: 120px;
    position: absolute;
}

.search {
  width: 350px;
  padding: 5px 10px;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
}

.btnOpenSidebar {
  position: fixed;
  cursor: pointer;
  top: 65px;
  padding: 5px 0;
  border: none;
  z-index: 9999;
  transition: 0.5s;
  width: 45px;
  text-align: center;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}

.sidebar h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 10px;
  color: #fff;
  padding: 0 2px;
  margin-left: -5px;
  margin-right: -5px;
}

.closeSidebar {
  font-family: "Comic Sans MS", sans-serif;
  font-size: 1.5rem;
}

.sidebar-right, .sidebar-right .search {
  right: 0;
}

.sidebar-left, .sidebar-left .search {
  left: 0;
}

.sidebar div {
  padding: 0 3px;
}

/*
$course: #2a6333 !default;
$objectives: #48aaa9 !default;
$indicators: #83cf50 !default;
$risks: #642c95 !default;
$process: #fbdf59 !default;
$schedule: #e67eb2 !default;
$assessment: #2b80c4 !default;
$content: #ed893b !default;
$problem: #ed3833 !default;
$enviroment: #ed477d !default;
$humam: #2e3737 !default;
*/

.enviroment h3 {
  background-color: #ed477d;
}

.human h3 {
  background-color: #2e3737;
}

.course h3 {
  background-color: #2a6333;
}

.objectives h3 {
  background-color: #48aaa9;
}

.indicators h3 {
  background-color: #83cf50;
}

.risks h3 {
  background-color: #642c95;
}

.process h3 {
  background-color: #fbdf59;
}

.schedule h3 {
  background-color: #e67eb2;
}

.assessment h3 {
  background-color: #2b80c4;
}

.content h3 {
  background-color: #ed893b;
}

.problem-cards h3 {
  background-color: #ed3833;
}

.search div {
  display: flex;
  align-items: center;
}

.search input {
  border: 1px solid #eee;
}

.pbl-card-content {
  background-color: #fff;
}
/* Curso  */
.course .pbl-card {
  background-color: #2a6333;
}

.course .pbl-card-content {
  border: 4px solid #2a6333;
}

.course li span {
  font-weight: normal;
  color: #2a6333;
}

/* Objetivos  */
.objectives .pbl-card {
  background-color: #48aaa9;
}

.objectives .pbl-card-content {
  border: 4px solid #48aaa9;
}

.objectives li span {
  font-weight: normal;
  color: #48aaa9;
}

.indicators .pbl-card {
  background-color: #83cf50;
}

.indicators .pbl-card-content {
  border: 4px solid #83cf50;
}

.indicators li span {
  font-weight: normal;
  color: #8bc864;
}

#mySidebar .problem-cards {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.problem-cards .pbl-card {
  background-color: #ed3833;
}

.problem-cards .pbl-card-content {
  border: 4px solid #ed3833;
}

.problem-cards li span {
  font-weight: normal;
  color: #ed3833;
}

.enviroment .pbl-card {
  background-color: #ed477d;
}

.enviroment .pbl-card-content {
  border: 4px solid #ed477d;
}

.enviroment li span {
  font-weight: normal;
  color: #ed477d;
}

.human .pbl-card {
  background-color: #2e3737;
}

.human .pbl-card-content {
  border: 4px solid #2e3737;
}

.human li span {
  font-weight: normal;
  color: #313c3c;
}

.content .pbl-card {
  background-color: #ed893b;
}

.content .pbl-card-content {
  border: 4px solid #ed893b;
}

.content li span {
  font-weight: normal;
  color: #ee953d;
}

.schedule .pbl-card {
  background-color: #e67eb2;
}

.schedule .pbl-card-content {
  border: 4px solid #e67eb2;
}

.schedule li span {
  font-weight: normal;
  color: #e595af;
}

.process .pbl-card {
  background-color: #fbdf59;
}

.process .pbl-card-content {
  border: 4px solid #fbdf59;
}

.process li span {
  font-weight: normal;
  color: #fbdf59;
}

.assessment .pbl-card {
  background-color: #2b80c4;
}

.assessment .pbl-card-content {
  border: 4px solid #2b80c4;
}

.assessment li span {
  font-weight: normal;
  color: #2b80c4;
}

.risks .pbl-card {
  background-color: #642c95;
}

.risks .pbl-card-content {
  border: 4px solid #642c95;
}

.risks li span {
  font-weight: normal;
  color: #6a3595;
}

.pbl-card {
  border-radius: 10px;
  min-height: 100px;
  padding: 25px 5px;
  height: 100%;
}

.pbl-card div {
  text-align: center;
}

.pbl-card h3 {
  text-align: center;
  color: #fff;
  margin-top: 5px;
  margin-bottom: 0;
}

a:hover {
  text-decoration: none;
}

.pbl-card-content {
  padding: 10px;
  border-radius: 10px;
  margin: 10px 0 0 0;
  overflow-y: auto;
}

.pbl-card-content p {
  text-align: left;
}

.pbl-card-content ol {
  margin-block-start: 0em;
  padding-inline-start: 1em;
}

.pbl-card-content header {
  margin-bottom: 5px;
}

.pbl-card-content header,
.pbl-card-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1em;
}

.pbl-card-header img {
  width: 40px;
}

.pbl-card-title {
  font-weight: 600;
  margin-left: 0.5rem;
  line-height: 1;
}

.pbl-card-content li {
  font-weight: 500;
}

.pbl-card-content li span {
  font-weight: normal;
}

.field-button {
  width: 29px;
  padding: 0;
  background: transparent;
  border: 1px solid #fff;
  margin-bottom: 5px;
}

@media (max-width: 1160px) {
  .pbl-card h3 {
    font-size: 1.2rem;
  }
}

@media (max-width: 600px) {
  .pbl-card h3 {
    font-size: 1.1rem;
  }
  .pbl-card-content {
    font-size: 0.9rem;
    height: 500px;
  }
}

@media (max-width: 400px) {
  .pbl-card h3 {
    font-size: 1rem;
  }
}
</style>
