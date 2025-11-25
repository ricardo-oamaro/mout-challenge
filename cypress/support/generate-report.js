const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const reportsDir = path.join(__dirname, '..', 'reports');
const htmlReportsDir = path.join(reportsDir, 'html');

function generateReport() {
  try {
    if (!fs.existsSync(reportsDir)) {
      console.log('✗ Pasta de relatórios não encontrada:', reportsDir);
      console.log('  Execute os testes primeiro para gerar os relatórios JSON.');
      return;
    }

    const jsonFiles = fs.readdirSync(reportsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(reportsDir, file));

    if (jsonFiles.length === 0) {
      console.log('✗ Nenhum arquivo JSON de relatório encontrado em:', reportsDir);
      return;
    }

    console.log(`✓ Encontrados ${jsonFiles.length} arquivo(s) de relatório JSON`);

    try {
      if (!fs.existsSync(htmlReportsDir)) {
        fs.mkdirSync(htmlReportsDir, { recursive: true });
      }

      const mergedReportPath = path.join(reportsDir, 'merged-report.json');
      
      if (jsonFiles.length === 1) {
        fs.copyFileSync(jsonFiles[0], mergedReportPath);
      } else {
        try {
          execSync(`npx mochawesome-merge "${jsonFiles.join('" "')}" > "${mergedReportPath}"`, {
            stdio: 'inherit',
            cwd: path.join(__dirname, '..', '..'),
          });
        } catch (error) {
          console.log('⚠ mochawesome-merge não encontrado, usando o primeiro relatório JSON');
          fs.copyFileSync(jsonFiles[0], mergedReportPath);
        }
      }

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

generateReport();



