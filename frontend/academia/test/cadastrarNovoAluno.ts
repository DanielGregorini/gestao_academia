import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function testNovoAlunoForm(): Promise<void> {
  // Inicializa o WebDriver para o navegador Chrome
  const driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    // Navega até a rota (lembre-se de codificar espaços como %20)
    await driver.get("http://localhost:3000/professor/novoaluno");

    // Aguarda que o input com id "nome" esteja presente na página
    await driver.wait(until.elementLocated(By.id("nome")), 10000);

    // Preenche o campo "Nome"
    const nomeInput = await driver.findElement(By.id("nome"));
    await nomeInput.clear();
    await nomeInput.sendKeys("Teste Aluno");

    // Preenche o campo "CPF"
    const cpfInput = await driver.findElement(By.id("cpf"));
    await cpfInput.clear();
    await cpfInput.sendKeys("12345678901");

    // Preenche o campo de data (id "dateInput")
    const dateInput = await driver.findElement(By.id("dateInput"));
    await dateInput.clear();
    // Envia a data no formato "YYYY-MM-DD"
    await dateInput.sendKeys("2000-01-01");

    // Preenche o campo "Login"
    const loginInput = await driver.findElement(By.id("login"));
    await loginInput.clear();
    await loginInput.sendKeys("testeusuario");

    // Preenche o campo "Senha"
    const senhaInput = await driver.findElement(By.id("senha"));
    await senhaInput.clear();
    await senhaInput.sendKeys("senha1234");

    // Localiza e clica no botão de submit (botão com type="submit")
    const submitButton = await driver.findElement(By.css("button[type='submit']"));
    await submitButton.click();

    // Se o formulário funcionar conforme o esperado, a página deve redirecionar para /professor/meusalunos.
    // Aguarda até que a URL contenha esse caminho.
    await driver.wait(until.urlContains("/professor/meusalunos"), 10000);
    console.log("Teste passou: Formulário enviado e redirecionamento realizado.");

  } catch (error) {
    console.error("Erro durante o teste:", error);
  } finally {
    // Encerra a sessão do navegador
    await driver.quit();
  }
}

testNovoAlunoForm().catch(console.error);
