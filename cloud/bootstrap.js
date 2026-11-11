// v3.5: ajuda somente se o gate inicial continuar após 8 segundos.
(()=>{setTimeout(()=>{const status=document.getElementById('cloud-bootstrap-status'),help=document.getElementById('cloud-bootstrap-help');if(!status||!help)return;status.textContent='O acesso está demorando. Confira a conexão ou tente novamente.';help.hidden=false},8000)})();
