import { Builder, By, until, WebDriver } from "selenium-webdriver";

async function testProfessorLogin(): Promise<void> {
  // Inicializa o WebDriver para o navegador Chrome
  const driver: WebDriver = await new Builder().forBrowser("chrome").build();

  try {
    // Acessa a página de login (ajuste a URL se necessário)
    await driver.get("http://localhost:3000/login");

    // Aguarda que o input de usuário (id "username") esteja presente na página
    await driver.wait(until.elementLocated(By.id("username")), 10000);

    // Preenche o campo "username" com o login do professor (ajuste os valores conforme o seu ambiente)
    const usernameInput = await driver.findElement(By.id("username"));
    await usernameInput.clear();
    await usernameInput.sendKeys("professor1");

    // Preenche o campo "password" com a senha do professor
    const passwordInput = await driver.findElement(By.id("password"));
    await passwordInput.clear();
    await passwordInput.sendKeys("senha1");

    // Localiza e clica no botão de login (id "login_button")
    const loginButton = await driver.findElement(By.id("login_button"));
    await loginButton.click();

    // Aguarda até que a URL contenha "/professor", indicando redirecionamento
    await driver.wait(until.urlContains("/professor"), 10000);
    
    // Verifica a URL atual
    const currentUrl = await driver.getCurrentUrl();
    console.log("Redirecionado para:", currentUrl);

    if (currentUrl.includes("/professor")) {
      console.log("Teste de login do professor passou: Redirecionamento correto.");
    } else {
      console.log("Teste de login do professor falhou: Redirecionamento incorreto.");
    }
  } catch (error) {
    console.error("Erro durante o teste de login do professor:", error);
  } finally {
    // Fecha o navegador após a execução do teste
    await driver.quit();
  }
}

testProfessorLogin().catch(console.error);
