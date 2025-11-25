const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminhos dos relatórios
const reportsDir = path.join(__dirname, '..', 'reports');
const htmlReportsDir = path.join(reportsDir, 'html');

/**
 * Consolida múltiplos relatórios JSON em um único relatório HTML
 */
function generateReport() {
  try {
    // Verifica se a pasta de relatórios existe
    if (!fs.existsSync(reportsDir)) {
      console.log('✗ Pasta de relatórios não encontrada:', reportsDir);
      console.log('  Execute os testes primeiro para gerar os relatórios JSON.');
      return;
    }

    // Busca todos os arquivos JSON na pasta de relatórios
    const jsonFiles = fs.readdirSync(reportsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(reportsDir, file));

    if (jsonFiles.length === 0) {
      console.log('✗ Nenhum arquivo JSON de relatório encontrado em:', reportsDir);
      return;
    }

    console.log(`✓ Encontrados ${jsonFiles.length} arquivo(s) de relatório JSON`);

    // Tenta usar mochawesome-merge e marge se disponíveis
    try {
      // Cria pasta para relatório HTML se não existir
      if (!fs.existsSync(htmlReportsDir)) {
        fs.mkdirSync(htmlReportsDir, { recursive: true });
      }

      // Consolida os relatórios JSON
      const mergedReportPath = path.join(reportsDir, 'merged-report.json');
      
      if (jsonFiles.length === 1) {
        // Se houver apenas um arquivo, copia diretamente
        fs.copyFileSync(jsonFiles[0], mergedReportPath);
      } else {
        // Se houver múltiplos arquivos, tenta usar mochawesome-merge
        try {
          execSync(`npx mochawesome-merge "${jsonFiles.join('" "')}" > "${mergedReportPath}"`, {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..', '..'),
          });
        } catch (error) {
          // Se mochawesome-merge não estiver disponível, usa o primeiro arquivo
          console.log('⚠ mochawesome-merge não encontrado, usando o primeiro relatório JSON');
          fs.copyFileSync(jsonFiles[0], mergedReportPath);
        }
      }

      // Gera o relatório HTML usando marge
      try {
        execSync(`npx marge "${mergedReportPath}" -o "${htmlReportsDir}" --reportFilename index.html`, {
          stdio: 'inherit',
          cwd: path.join(__dirname, '..', '..'),
        });
        console.log('\n✓ Relatório HTML gerado com sucesso!');
        console.log(`  Localização: ${htmlReportsDir}/index.html`);
      } catch (error) {
        console.log('\n⚠ marge (mochawesome-report-generator) não encontrado.');
        console.log('  Instale com: npm install --save-dev mochawesome-merge mochawesome-report-generator');
        console.log(`  Relatórios JSON disponíveis em: ${reportsDir}`);
      }
    } catch (error) {
      console.log('\n⚠ Erro ao gerar relatório consolidado:', error.message);
      console.log(`  Relatórios JSON individuais disponíveis em: ${reportsDir}`);
    }
  } catch (error) {
    console.error('✗ Erro ao processar relatórios:', error.message);
  }
}

// Executa a geração do relatório
generateReport();



