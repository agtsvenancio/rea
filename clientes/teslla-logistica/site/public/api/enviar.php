<?php
// Recebe os formulários do site e envia por e-mail (Hostinger tem PHP e mail() ativos).
// CONFIGURE: e-mail que recebe os contatos.
$DESTINO = 'contato@tesllalogistica.com.br';
$REMETENTE = 'site@tesllalogistica.com.br'; // precisa ser um e-mail do domínio criado na Hostinger

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo '{"ok":false}'; exit; }

$dados = json_decode(file_get_contents('php://input'), true);
if (!is_array($dados) || empty($dados['campos']) || !empty($dados['campos']['_site'])) { http_response_code(400); echo '{"ok":false}'; exit; }

$limpa = fn($v) => trim(str_replace(["\r", "\n"], ' ', strip_tags((string)$v)));
$tipo = $limpa($dados['tipo'] ?? 'Contato');
$linhas = [];
foreach ($dados['campos'] as $k => $v) { if ($k !== '_site' && $v !== '') $linhas[] = ucfirst($limpa($k)) . ': ' . $limpa($v); }
$linhas[] = 'Página: ' . $limpa($dados['pagina'] ?? '');

$replyTo = filter_var($dados['campos']['email'] ?? '', FILTER_VALIDATE_EMAIL) ?: $REMETENTE;
$headers = "From: Site Teslla <$REMETENTE>\r\nReply-To: $replyTo\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail($DESTINO, "=?UTF-8?B?" . base64_encode("[Site] $tipo") . "?=", implode("\n", $linhas), $headers);
echo json_encode(['ok' => $ok]);
