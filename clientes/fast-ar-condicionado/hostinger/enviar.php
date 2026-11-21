<?php
/*
 * Substitui o Contact Form 7 do WordPress original.
 * Recebe o formulário da página /contato/ e envia por e-mail (mail() da Hostinger).
 * Ajuste DESTINO se o cliente quiser receber em outro endereço.
 */
const DESTINO = 'contato@fastarcondicionado.com';
const REMETENTE = 'site@fastarcondicionado.com'; // use um e-mail do próprio domínio na Hostinger

header('Content-Type: application/json; charset=utf-8');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['ok' => false]); exit; }
if (!empty($_POST['website'])) { echo json_encode(['ok' => true]); exit; } // honeypot

$campo = fn($k, $max = 400) => trim(mb_substr(strip_tags($_POST[$k] ?? ''), 0, $max));
$nome = $campo('nome'); $email = $campo('email'); $assunto = $campo('assunto');
$tel = $campo('tel'); $mensagem = $campo('mensagem', 2000);
// evita injeção de cabeçalhos de e-mail
$nome = str_replace(["\r", "\n"], ' ', $nome); $assunto = str_replace(["\r", "\n"], ' ', $assunto);

$erros = [];
foreach (['nome' => $nome, 'email' => $email, 'assunto' => $assunto, 'tel' => $tel, 'mensagem' => $mensagem] as $k => $v) {
  if ($v === '') $erros[$k] = 'O campo é obrigatório.';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $erros['email'] = 'O endereço de e-mail informado é inválido.';
if ($erros) { http_response_code(422); echo json_encode(['ok' => false, 'erros' => $erros, 'mensagem' => 'Um ou mais campos possuem erros. Verifique e tente novamente.']); exit; }

$corpo = "Nome: $nome\nE-mail: $email\nTelefone: $tel\nAssunto: $assunto\n\nMensagem:\n$mensagem\n\n-- \nEnviado pelo formulário de contato do site.";
$cabecalhos = "From: Fast Ar <" . REMETENTE . ">\r\nReply-To: $nome <$email>\r\nContent-Type: text/plain; charset=UTF-8";
$ok = mail(DESTINO, '=?UTF-8?B?' . base64_encode("[Site] $assunto") . '?=', $corpo, $cabecalhos);

if (!$ok) http_response_code(500);
echo json_encode(['ok' => $ok, 'mensagem' => $ok ? 'Agradecemos a sua mensagem. Ela foi enviada.' : 'Ocorreu um erro ao tentar enviar sua mensagem. Tente novamente mais tarde.']);
