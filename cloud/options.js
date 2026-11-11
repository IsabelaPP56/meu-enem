// Configuração pública. Não coloque chave privada, service account ou chave Gemini aqui.
export const cloudOptions = {
  appCheckProvider: 'enterprise', // 'enterprise' recomendado; 'v3' também é aceito.
  appCheckSiteKey: 'COLE_AQUI_A_SITE_KEY_PUBLICA_DO_RECAPTCHA',
  model: 'gemini-3.8-flash', // Modelo estável listado na documentação Firebase em 11/11/2026.
  dailyLimit: 30,
  maxEssayImageBytes: 8_000_000,
  maxSyncBytes: 750_000
};
