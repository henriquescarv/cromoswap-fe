# CromoSwap Frontend — Branch `infra-devops`

## Sobre esta branch

Esta branch foi criada para testes locais com o backend rodando no **AWS ECS**, mantendo o `app.json` adequado para desenvolvimento sem conflito com o EAS Build da Play Store/App Store.

---

## Diferenças em relação à `main`

### `app.json`
O bloco `extra` com o `projectId` do EAS foi **removido** nesta branch:

```json
// REMOVIDO para testes locais — necessário para publicação nas lojas
"extra": {
  "eas": {
    "projectId": "0304215d-4548-4dfa-8026-61759ac2d94e"
  }
}
```

> ⚠️ Antes de publicar na Play Store ou App Store, o `projectId` deve ser readicionado ao `app.json` na branch `main`.

### `src/fakeenv.js`
Configurado para usar a variável de ambiente `EXPO_PUBLIC_API_URL` com fallback para o IP local:

```js
export const urlApi = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.229:3000';
```

---

## Como rodar localmente

### 1. Configurar o `.env`

Para testar com o backend no **ECS (produção)**:
```
EXPO_PUBLIC_API_URL=http://<alb_dns_name>.us-east-1.elb.amazonaws.com
```

Para testar com o backend **local**:
```
EXPO_PUBLIC_API_URL=http://<seu_ip_local>:3000
```

> O `alb_dns_name` é gerado pelo Terraform após o `terraform apply` na pasta `iac` do backend.

### 2. Instalar dependências
```bash
npm install
```

### 3. Iniciar o Expo
```bash
npx expo start -c
```

---

## Observações

- O backend no ECS é provisionado via Terraform na pasta `iac` do repositório `cromoswap-be`, branch `infra-devops`
- Após um `terraform destroy` e novo `terraform apply`, o DNS do ALB muda — atualize o `.env` com o novo endpoint
- O `.env` **não é commitado** no repositório — cada desenvolvedor mantém o seu localmente
