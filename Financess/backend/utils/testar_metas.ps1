$resposta = Invoke-RestMethod -Uri http://localhost:5000/api/auth/login -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"email":"samuel@teste.com","senha":"123"}'
$headers = @{ "Content-Type" = "application/json"; "Authorization" = "Bearer $($resposta.token)" }

$bodyMeta = @{ titulo = "Viagem de Ferias"; valor_alvo = 2000.00; prazo = "2026-12-01" } | ConvertTo-Json
$metaCriada = Invoke-RestMethod -Uri http://localhost:5000/api/metas -Method POST -Headers $headers -Body $bodyMeta
Write-Output $metaCriada.mensagem

$idMeta = $metaCriada.meta.id
$bodyContribuicao = @{ valor = 150.50 } | ConvertTo-Json
$contribuicao = Invoke-RestMethod -Uri "http://localhost:5000/api/metas/$idMeta/contribuir" -Method POST -Headers $headers -Body $bodyContribuicao
Write-Output $contribuicao.mensagem
Write-Output "Saldo Atual da Meta: $($contribuicao.meta.valor_atual)"