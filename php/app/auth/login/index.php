<?php

$url = getenv('KEYCLOAK_HOST') . '/realms/' . getenv('KEYCLOAK_REALM') . '/protocol/openid-connect/auth';

$data = array(
    'client_id' => getenv('KEYCLOAK_CLIENT_ID'),
    'redirect_uri' => getenv('APP_HOST') . '/auth/callback',
    'response_type' => 'code',
    'scope' => 'openid'
);

$query = http_build_query($data);

// Redireciona para a URL de autenticação do Keycloak
header('Location: ' . $url . '?' . $query);
exit;
