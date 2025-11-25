const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

function generateClientDocument() {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "Projeto de Automação de Testes - ServeRest",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            text: "Evolução, Escalabilidade e Plano de Melhorias",
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),

          new Paragraph({
            text: "Sumário Executivo",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),
          
          new Paragraph({
            text: "Este documento apresenta o estado atual do projeto de automação de testes desenvolvido para a aplicação ServeRest, destacando os resultados alcançados, a evolução do projeto, estratégias de escalabilidade e o plano de melhorias futuras.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "O projeto foi desenvolvido utilizando metodologias modernas de desenvolvimento orientado a comportamento (BDD) e ferramentas de automação de testes de última geração, resultando em uma solução robusta, escalável e de fácil manutenção.",
            spacing: { after: 400 },
          }),

          new Paragraph({
            text: "Estado Atual do Projeto",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "Cobertura de Testes Implementada",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            text: "O projeto atualmente possui uma cobertura abrangente de testes automatizados, incluindo:",
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Testes End-to-End (E2E): 6 cenários cobrindo cadastro de usuário, login/logout e fluxo de compra"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Testes de API: 5 cenários validando criação de usuários, listagem e criação de produtos"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Total de 11 cenários de teste automatizados"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Resultados Obtidos",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Taxa de sucesso: 100% (10 testes passando de 10 executados)"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Tempo de execução total: aproximadamente 23 segundos"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Zero falhas na última execução completa"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Tecnologias Utilizadas",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Cypress 13.6.0 - Framework líder em automação de testes E2E"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Cucumber/Gherkin - Metodologia BDD para escrita de testes legíveis"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Mochawesome Reporter - Geração de relatórios HTML profissionais"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Evolução do Projeto",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "Fase 1: Implementação Inicial",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Configuração do ambiente de testes com Cypress"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação dos primeiros testes E2E para cadastro e login"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Criação de comandos customizados para reutilização de código"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Fase 2: Estruturação e Organização",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Migração para metodologia BDD com Cucumber/Gherkin"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Organização de seletores em arquivos separados por feature"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de testes de API para validação de endpoints"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Criação de estrutura modular e reutilizável"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Fase 3: Integração de Relatórios",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Configuração do Mochawesome Reporter para geração de relatórios HTML"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de scripts para consolidação de múltiplos relatórios"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Automação da geração de relatórios após execução dos testes"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Próximas Fases Planejadas",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Expansão da cobertura de testes para novas funcionalidades"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de testes de regressão automatizados"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Integração com pipeline de CI/CD"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Estratégia de Escalabilidade",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "Arquitetura Modular",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            text: "O projeto foi desenvolvido com uma arquitetura modular que facilita a adição de novos testes e funcionalidades:",
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Separação clara entre testes E2E e testes de API"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Organização de seletores em arquivos dedicados por feature"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Comandos customizados reutilizáveis para ações comuns"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Dados de teste centralizados em arquivos fixtures"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Processo para Adicionar Novos Testes",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Criar arquivo de feature (.feature) com cenários em linguagem Gherkin"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementar step definitions correspondentes aos cenários"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Organizar seletores em arquivo de locators dedicado"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Executar testes e validar resultados"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Padrões Estabelecidos",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Uso de metodologia BDD para testes legíveis e compreensíveis"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Isolamento de testes para garantir independência entre execuções"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Geração dinâmica de dados de teste para evitar conflitos"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Configuração de retry automático para aumentar confiabilidade"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Plano de Melhorias Futuras",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "Curto Prazo (1-3 meses)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Expansão da cobertura de testes para funcionalidades críticas adicionais"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de testes de regressão para garantir estabilidade"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Otimização do tempo de execução dos testes"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Melhoria na documentação técnica e guias de uso"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Médio Prazo (3-6 meses)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Integração com pipeline de CI/CD para execução automática"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de testes de performance e carga"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Adição de testes de acessibilidade (WCAG compliance)"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Criação de dashboard para monitoramento de qualidade"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Longo Prazo (6-12 meses)",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de testes cross-browser para múltiplos navegadores"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Desenvolvimento de testes de segurança e vulnerabilidades"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Integração com ferramentas de análise de código estático"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Implementação de machine learning para detecção de padrões de falha"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Benefícios Esperados",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Redução significativa no tempo de validação manual"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Aumento na confiabilidade e qualidade do software"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Detecção precoce de bugs e problemas"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Facilitação da documentação viva através de testes BDD"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Investimento e Retorno sobre Investimento (ROI)",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "Benefícios da Automação",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Redução de custos operacionais através da eliminação de testes manuais repetitivos"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Aceleração do ciclo de desenvolvimento com feedback rápido"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Melhoria na qualidade do produto através de testes consistentes e abrangentes"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Aumento da confiança nas entregas com validação automatizada"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Métricas de Sucesso",
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 100, after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Tempo de execução: 23 segundos para suite completa de testes"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Taxa de sucesso: 100% na última execução"),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun("Cobertura: 11 cenários automatizados cobrindo funcionalidades críticas"),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Conclusão",
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 200, after: 200 },
          }),

          new Paragraph({
            text: "O projeto de automação de testes desenvolvido para a aplicação ServeRest demonstra resultados sólidos e uma base sólida para crescimento futuro. Com uma arquitetura modular, metodologias modernas e processos bem definidos, o projeto está preparado para escalar conforme as necessidades do negócio.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "Os próximos passos recomendados incluem a expansão gradual da cobertura de testes, integração com pipelines de CI/CD e implementação de melhorias contínuas baseadas em métricas e feedback.",
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: "O investimento em automação de testes representa uma estratégia de longo prazo que resultará em maior qualidade, velocidade de entrega e redução de custos operacionais.",
            spacing: { after: 400 },
          }),
        ],
      },
    ],
  });

  Packer.toBuffer(doc).then((buffer) => {
    const outputPath = path.join(__dirname, 'Projeto_Automatizacao_Testes_ServeRest.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log('✓ Documento DOCX gerado com sucesso!');
    console.log(`  Localização: ${outputPath}`);
  }).catch((error) => {
    console.error('✗ Erro ao gerar documento:', error);
  });
}

generateClientDocument();

