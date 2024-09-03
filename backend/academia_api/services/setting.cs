namespace academia_api.services
{
    public static class Settings
    {
        private static readonly string secretKey = Environment.GetEnvironmentVariable("SECRET_KEY");

        // Se a chave não for encontrada, use uma chave padrão (apenas para desenvolvimento ou testes)
        public static string Secret { get; } = string.IsNullOrEmpty(secretKey) ? "chave_aleatoria_de_teste_32_chars" : secretKey;
    }
}
