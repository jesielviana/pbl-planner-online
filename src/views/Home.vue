<template>
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-white mb-4">
      <div class="navbar-brand">
        <img class="img-logo" src="img/logo.png" />
        <h2 class="title">PBL Planner <i>Online</i></h2>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mr-auto"></ul>
        <ul class="navbar-nav">
          <li class="nav-item pbl-canvas-link">
            <a class="nav-link" href="#tutorial">
              Tutorial
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#planning">
              Processo de Planejamento
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">
              Contato
            </a>
          </li>
          <li class="nav-item pbl-canvas-link">
            <router-link class="nav-link nav-primary" to="/planejamentos">
              PLANEJAR
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid">
      <section class="row">
        <div class="col-md-6" style="font-size: 20px;">
          <h3 class="call-to-action">
            Transforme sua aula com o método PBL e aprimore o aprendizado, engajamento e motivação
            de seus alunos!
          </h3>
          <br />
          <p>
            <b>PBL Planner Online</b> é uma plataforma colaborativa para o planejamento de ensino na
            abordagem PBL - Problem-Based Learning (em português, Aprendizagem Baseada em
            Problemas).
          </p>
          <p>
            Faça o planejamento de seu curso ou disciplina, colaborativamente, a qualquer horas e
            onde quiser.
          </p>
          <router-link class="btn btn-call-to-action" to="/planejamentos">
            Faça seu Planejamento <br />
            Gratuitamente
          </router-link>
        </div>
        <div class="col-md-6">
          <img src="img/homepage.png" class="img-fluid" alt="imagem de equipe trabalhando" />
        </div>
      </section>

      <section class="bg-section-color">
        <h3 id="tutorial">Assista nosso vídeo sobre como usar o PBL Planner <i>Online</i></h3>
        <br />
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="row videoWrapper">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/I-m2pxhw0Go"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>

              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/n6B0zHKPiyc"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div class="col-md-3"></div>
        </div>
      </section>

      <section class="row text-center">
        <div class="col-md-12 text-center flex-col">
          <img class="icon img-fluid" src="img/icon-canvas-azul.png" alt="" />
          <h3>PBL Canvas</h3>
          <p class="text-description">
            O PBL Canvas é composto por um quadro, dividido em onze campos. Cada um dos campos
            representa um conjunto de aspectos a serem contemplados no planejamento.<br />
            Veja os campos abaixo e suas respectivas descrições.
          </p>
        </div>

        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/course-front.svg" alt="" />
          <h5>
            Curso
          </h5>
          <p>
            Contextualização do curso/disciplina definindo itens como nome do curso, tempo de
            duração, modalidade, público-alvo e pré-requisitos.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/objectives-front.svg" alt="" />
          <h5>Objetivos</h5>
          <p>
            Definição das metas de aprendizagem dos alunos relacionadas à motivação, engajamento e à
            assiduidade, bem como ao desempenho geral da turma.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/indicators-front.svg" alt="" />
          <h5>Indicadores de Sucesso</h5>
          <p>Definição dos indicadores de sucesso do discente, da metodologia e do curso.</p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/problems-front.png" alt="" />
          <h5>Problema</h5>
          <p>
            Captação, descrição sistemática, apresentação, aprovação da proposta do problema e
            alteração da escolha do problema.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/environment-front.svg" alt="" />
          <h5>Ambiente</h5>
          <p>
            Definição dos equipamentos, softwares e materiais necessários para execução do curso,
            espaço físico, ambientação e espaço virtual.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/capital-front.svg" alt="" />
          <h5>Capital Humano</h5>
          <p>Definição dos papéis e da equipe que fará parte do curso.</p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/content-front.svg" alt="" />
          <h5>Conteúdo</h5>
          <p>
            Descrição do conteúdo de um módulo educacional. Indicação de fontes para apoio ou
            aprofundamento dos conhecimentos.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/avaliacao-front.svg" alt="" />
          <h5>Avaliação de Aprendizagem</h5>
          <p>
            Contempla vários aspectos relacionados a avaliação, tais como: conteúdo, satisfação do
            cliente, processo e resultado da resolução do problema, competências interpessoais, etc
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/process-front.svg" alt="" />
          <h5>Processos</h5>
          <p>
            Descrição do processo de aprendizagem com base na resolução de problemas e processo de
            divisão dos alunos que formarão grupos.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/schedule-front.svg" alt="" />
          <h5>Cronograma</h5>
          <p>
            Definição das datas de aulas, da agenda de avaliações discentes e docentes e das
            entregas dos artefatos.
          </p>
        </div>
        <div class="col-md-3">
          <img class="img-fluid canvas-item" src="img/cards/scratchs-front.svg" alt="" />
          <h5>Riscos</h5>
          <p>
            Levantamento das ameaças relacionadas à infraestrutura, ao planejamento e execução do
            projeto e das metodologias de ensino e aprendizagem, além das influências externas ao
            ambiente do projeto.
          </p>
        </div>
      </section>

      <section class="row">
        <div class="col-md-6 col-12 text-center ml-auto  mr-auto">
          <img class="icon img-fluid" src="img/icon-cartas-azul.png" alt="" />
          <h3>Cartas PBL</h3>
          <p>
            Um conjunto de 40 cartas que tem como objetivo principal guiar o processo de
            preenchimento do PBL Canvas e assim realizar o planejamento
          </p>
          <img class="img-fluid" src="img/exemplo-cartas.png" alt="" />
        </div>
      </section>

      <section class="row text-center bg-section-color">
        <div class="col-md-12">
          <img class="img-fluid" src="img/icon-processos-pbl.png" alt="" />
          <h3 id="planning">Processo de Planejamento com o PBL Planner <i>Online</i></h3>
          <p>
            A realização do planejamento de curso na abordagem PBL utilizando o PBL Planner Online é
            <br />
            dividida em três fases: <b>Planejar</b>, <b>Revisar</b> e <b>Compartilhar</b>.
          </p>
        </div>
        <div class="col-md-4">
          <img class="img-fluid" src="img/icon-planejar.png" alt="" />
          <h3>1 - Fase de Planejar</h3>
          <p>
            Esta fase consiste em preencher o PBL Canvas respondendo adequadamente a cada pergunta
            contida nas Cartas PBL de acordo com a ordenação das cartas. Para isso é importante a
            participação de todas as pessoas que atuarão no curso como professores, tutores e
            coordenador.
          </p>
        </div>

        <div class="col-md-4">
          <img class="img-fluid" src="img/icon-revisar.png" alt="" />
          <h3>2 - Fase de Revisar</h3>
          <p>
            O objetivo da fase de revisão é analisar dúvidas levantadas durante o planejamento, bem
            como algum aspecto que não foi totalmente respondido. Também é importante verificar se
            as dependências entre os campos estão alinhadas corretamente.

            <!-- Por exemplo, os campos de objetivo com os de
          avaliações nas quais o primeiro define o objetivo e no segundo
          como medir se foi atingido. -->
          </p>
        </div>

        <div class="col-md-4">
          <img class="img-fluid" src="img/icon-compartilhamento.png" alt="" />
          <h3>3 - Fase de Compartilhar</h3>
          <p>
            A fase final visa construir um plano de ação que deve listar todas as tarefas e
            artefatos planejados durante a fase de planejamento. O plano de ação deve conter, além
            da lista de tarefas e artefatos, o prazo para criação, o status da tarefa ou artefato e
            quem é o responsável.

            <!-- Com a criação do plano de
          ação, é gerada uma versão do plano de ensino (linha de base),
          que pode sofrer adaptações e melhorias ao longo de sua
          implementação. -->
          </p>
        </div>
      </section>

      <section id="contact" class="row text-center">
        <div class="col-md-12">
          <div style="max-width: 600px; margin: 0 auto;">
            <h3>Como posso te ajudar?</h3>
            <p>
              Transforme sua aula com o método PBL e consiga um melhor aprendizado, engajamento e
              motivação de seus alunos.
            </p>
          </div>
          <div class="row">
            <div class="col-md-6 text-right contact">
              <b>Gustavo Alexandre | Consultor PBL</b> <br />
              <span style="font-size: 0.9rem;">PhD em Ciência da Computação<br /></span>
              contato@gustavoalexandre.com.br <br />
              <a href="https://www.gustavoalexandre.com.br/" target="_blank">
                www.gustavoalexandre.com.br
              </a>
            </div>
            <div class="col-md-6 text-left contact-right">
              <b>Jesiel Viana da Silva</b> <br />
              <span style="font-size: 0.9rem;">Professor e Engenheiro de Software<br /></span>
              jesiel@ifpi.edu.br <br />
              <a href="https://prof.jesielviana.com" target="_blank">
                https://prof.jesielviana.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <footer class="container-fluid text-center">
      <div class="row">
        <div class="col-md-6 copyright">
          <span>© 2020 PBL Planner Online</span>
        </div>
        <div class="col-md-6 dev">
          Desenvolvedor da plataforma PBL Planner Online<br />
          <b>Jesiel Viana</b> |
          <a href="https://twitter.com/jesielviana" target="_blank">
            <img class="img-fluid" src="img/twitter.png" alt="logo do twitter" /> @jesielviana
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
<style scoped>
/* @import url('https://fonts.googleapis.com/css?family=Roboto:300,700,900'); */

.navbar-light .navbar-nav a.nav-primary {
  color: #fff !important;
  background-color: #51c5e6;
  border-color: #51c5e6;
  border-radius: 5px;
}

.navbar-light .navbar-nav a.nav-primary:hover {
  color: #fff;
  background-color: #3bbadd !important;
  border-color: #3bbadd !important;
}

.navbar-light .navbar-nav a.nav-outline-primary {
  border: 1px solid #51c5e6 !important;
  border-radius: 5px;
  color: #51c5e6 !important;
}

body {
  font-family: galano grotesque alt, Arial, sans-serif;
}

h1,
h2,
h3 {
  color: #5f6368;
  position: relative;
  font-weight: 600;
}

b {
  font-weight: 500;
}

section {
  margin-bottom: 50px !important;
  padding: 50px 0 !important;
}

.row {
  margin-bottom: 16px;
}

.container-fluid {
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 70px;
}

.navbar-light .navbar-nav .nav-link:focus,
.navbar-light .navbar-nav .nav-link:hover {
  cursor: pointer;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand h2 {
  font-size: 32px;
  margin: 0;
  color: #51c5e6;
  font-weight: 700;
}

h2 i,
h3 i,
h4 i {
  font-weight: 500;
}

.text-highlight {
  color: #51c5e6;
  font-weight: 600;
}

.text-black {
  color: #5f6368;
}

h3,
h4,
h5,
h6 {
  color: #51c5e6;
}

footer {
  background-color: #eee;
}

footer.container-fluid {
  padding: 0 15px;
}

footer .row {
  margin-bottom: 0;
  display: flex;
  align-items: center;
}

footer .copyright {
  padding: 2rem;
  background-color: #fafafa;
}

.call-to-action {
  font-size: 2.5rem;
  text-align: left;
}

.btn-call-to-action {
  color: #fff !important;
  border-radius: 5px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1.2rem;
  background-color: #3bbadd;
  border-color: #3bbadd;
}

.btn-call-to-action:hover {
  color: #fff;
  background-color: #51c5e6;
  border-color: #51c5e6;
}

footer .dev {
  padding: 1rem;
}

.social-icon {
  width: 30px;
}

.text-underline {
  text-decoration: underline;
}

.container-fluid h2,
.container h2 {
  text-align: center;
}

.navbar {
  padding: 5px 30px !important;
  background-color: #fff;
  border: 1px solid #eee;
  height: 65px;
}

.navbar-light .navbar-nav .nav-link {
  color: #5f6368 !important;
}

.nav-icon {
  width: 24px;
  height: 24px;
}

.nav-link {
  margin-right: 1rem;
}

.nav-link:hover {
  background-color: rgba(32, 33, 36, 0.039);
  border-radius: 5px;
}

.contact {
  border-right: 1px solid #ccc;
}

.img-logo {
  width: 60px;
  height: 60px;
  margin-right: 10px;
}

.modal-header {
  padding: 0.5rem 1rem !important;
}

/* ######### TEMPORARIO ######  */
.container-fluid .card-body,
.embla .card-body {
  padding: 0 !important;
}

.icon {
  width: 64px;
  margin-right: 10px;
}

.flex {
  display: flex;
  align-items: center;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#accordionCanvas {
  width: 100%;
  max-width: 760px;
}

.text-description {
  text-align: center;
  max-width: 760px;
  width: 100%;
}

@media (max-width: 960px) {
  .nav-item {
    margin-bottom: 10px;
  }
  .nav-outline-primary,
  .nav-primary {
    padding: 10px !important;
  }
}

@media (max-width: 600px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }
  .navbar {
    padding: 10px 15px !important;
  }
}

@media (max-width: 767px) {
  .row .contact {
    text-align: center !important;
    border: none;
  }

  .row .contact-right {
    text-align: center !important;
  }
}

/*
*
* ==========================================
* Collapse
* ==========================================
*
*/
/* Horizontal line */
.collapsible-link::before {
  content: '';
  width: 14px;
  height: 2px;
  background: #333;
  position: absolute;
  top: calc(50% - 1px);
  right: 1rem;
  display: block;
  transition: all 0.3s;
}

/* Vertical line */
.collapsible-link::after {
  content: '';
  width: 2px;
  height: 14px;
  background: #333;
  position: absolute;
  top: calc(50% - 7px);
  right: calc(1rem + 6px);
  display: block;
  transition: all 0.3s;
}

.collapsible-link[aria-expanded='true']::after {
  transform: rotate(90deg) translateX(-1px);
}

.collapsible-link[aria-expanded='true']::before {
  transform: rotate(180deg);
}

.accordion .card {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125) !important;
}

.accordion h6 a,
.accordion h5 a {
  color: #51c5e6;
}

.accordion .card-header {
  padding: 0.5rem;
}

.accordion .card-body {
  padding: 1rem;
}

.canvas-item {
  width: 32px;
  margin-bottom: 5px;
}
/*
*
* ==========================================
* Vídeo
* ==========================================
*
*/
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 7px solid #51c5e6;
}

#tutorial {
  text-align: center;
}

.bg-section-color {
  background: #fafafa;
  margin-left: -30px;
  margin-right: -30px;
  padding-left: 30px !important;
  padding-right: 30px !important;
}
</style>
