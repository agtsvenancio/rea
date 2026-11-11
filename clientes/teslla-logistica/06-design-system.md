# 06. Design system

> **Status: parcial.** O CSS do tema não pôde ser lido (o domínio estava bloqueado na rede do ambiente de análise e a leitura indireta remove `<link>`/`<style>`). Cores hex, fontes, tamanhos e espaçamentos **ainda não foram extraídos**. Nada abaixo foi inventado.

## O que já se sabe

- **Arquitetura visual:** template corporativo de logística, seções alternadas com fundos e formas decorativas (`slider-shape-1.png`, `service-shape-1.png`, `faq-shape.png`, `content-shape.png`, `cta-shape.png`).
- **Título de seção:** eyebrow H4 + H2 (padrão em 100% das seções).
- **Ícones:** PNGs próprios (`feature-icon-*`, `process-icon-1..4`, `service-details-icon-*`, `about-icon-*`, `counter-1..4`, `quote.png`) e 3 SVGs em Quem Somos (`rdc-2.svg`, `especializacao-farma-2.svg`, `frota-dedicada-2.svg`). Não é Font Awesome.
- **Interações:** slider no hero, carrossel de depoimentos, marquee de logos, acordeão de FAQ, lightbox nas galerias, contadores animados, menu off-canvas, 2 modais.
- **Imagens:** fotos reais da operação (WhatsApp-Image-2025-09-*.jpeg), banners PNG, post em WebP 1660×900.
- **Logo:** https://tesllalogistica.com.br/wp-content/uploads/2025/09/logo.png (header) e logo-300x80.png (footer).

## Para completar (qualquer uma das opções)

1. Liberar o domínio `tesllalogistica.com.br` na rede do ambiente; aí extraio as variáveis CSS, fontes e cores automaticamente com navegador headless (inclusive prints de cada seção em desktop e mobile).
2. Ou mandar a pasta do tema (`/wp-content/themes/<tema>/`) ou um export do All-in-One WP Migration.
3. Ou mandar o manual de marca do cliente (cores e fontes oficiais).

## Tokens a preencher

| Token | Valor | Origem |
|---|---|---|
| `--color-primary` | ? | |
| `--color-secondary` | ? | |
| `--color-heading` | ? | |
| `--color-text` | ? | |
| `--color-bg-alt` | ? | |
| `--font-heading` | ? | |
| `--font-body` | ? | |
| `--h1` … `--h4` | ? | |
| `--radius-button` / `--radius-card` | ? | |
| `--container` | ? | |
| `--section-py` | ? | |
| breakpoints | ? | |
