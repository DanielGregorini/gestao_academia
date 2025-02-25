namespace academia_api.services
{
    public static class Settings
    {
        private static string secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");
        
        // Propriedade com setter privado para permitir alterações apenas internamente.
        public static string Secret { get; set; } = string.IsNullOrEmpty(secretKey) 
            ? "chave_aleatoria_de_teste_32_chars" 
            : secretKey;

        // Método para testes que permite definir um novo valor para a chave secreta.
        public static void SetSecretForTesting(string newSecret)
        {
            Secret = newSecret;
        }
    }
}
