import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function testCadastrarTreino(): Promise<void> {
  // Inicializa o WebDriver para o navegador Chrome
  const driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    // Acesse a página de treinos para um aluno específico (exemplo: ID 1)
    await driver.get("http://localhost:3000/professor/meusalunos/1");

    // Aguarda que o elemento que indica o carregamento da página esteja presente (ex.: texto "Aluno ID:")
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Aluno ID:')]")), 10000);

    // Localiza o botão "+ NOVO TREINO" e clica nele para exibir o formulário
    const novoTreinoButton = await driver.findElement(By.xpath("//button[contains(.,'+ NOVO TREINO')]"));
    await novoTreinoButton.click();

    // Aguarda que o campo de input com id "letra" apareça, sinalizando que o formulário foi renderizado
    await driver.wait(until.elementLocated(By.id("letra")), 10000);

    // Preenche o campo "Letra do treino" com o valor "B"
    const letraInput = await driver.findElement(By.id("letra"));
    await letraInput.clear();
    await letraInput.sendKeys("B");

    // Preenche o campo "dia da Semana" com o valor "Segunda-feira"
    const diaSemanaInput = await driver.findElement(By.id("diaSemana"));
    await diaSemanaInput.clear();
    await diaSemanaInput.sendKeys("Segunda-feira");

    // Preenche o campo "lista de exercicios" com o valor "Exercicio1;Exercicio2"
    const listaExerciciosInput = await driver.findElement(By.id("listaExercicios"));
    await listaExerciciosInput.clear();
    await listaExerciciosInput.sendKeys("Exercicio1;Exercicio2");

    // Localiza o botão de submit do formulário (texto: "Criar novo Treino") e clica nele
    const submitButton = await driver.findElement(By.xpath("//button[contains(.,'Criar novo Treino')]"));
    await submitButton.click();

    // Aguarda que o novo treino seja exibido na listagem (por exemplo, procurando o texto "B")
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'B')]")), 10000);

    console.log("Teste passou: Treino cadastrado com sucesso.");
  } catch (error) {
    console.error("Erro durante o teste de cadastro de treino:", error);
  } finally {
    // Fecha o navegador após o teste
    await driver.quit();
  }
}

testCadastrarTreino().catch(console.error);
