// Configuração pública. Não coloque chave privada, service account ou chave Gemini aqui.
export const cloudOptions = {
  appCheckProvider: 'enterprise', // 'enterprise' recomendado; 'v3' também é aceito.
  appCheckSiteKey: '6LeqURsuAAAAALIkdX2lqmUx2tLOXQQnU_AOPOX4',
  model: 'gemini-3.8-flash', // Modelo estável listado na documentação Firebase em 11/11/2026.
  fallbackModels: ['gemini-3.5-flash-lite', 'gemini-3.5-flash'], // reserva se o principal estiver sobrecarregado (503).
  dailyLimit: 30,
  maxEssayImageBytes: 8_000_000,
  maxSyncBytes: 750_000
};
