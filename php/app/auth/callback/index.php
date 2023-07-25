<?php
// Verifica se há um código de autorização no parâmetro da URL
if (isset($_GET['code'])) {
    
    $data = array(
    'client_id' => getenv('KEYCLOAK_CLIENT_ID'),
    'grant_type' => 'authorization_code',
    'code' => $_GET['code'], 
    'redirect_uri' => getenv('APP_HOST') . '/auth/callback',
    );

    // URL para obter o token de acesso usando o código de autorização
    $url = 'http://keycloak:8080/realms/' . getenv('KEYCLOAK_REALM') . '/protocol/openid-connect/token';

    
    // Parâmetros necessários para obter o token de acesso
    $params = array(
        'grant_type' => 'authorization_code',
        'code' => $_GET['code'],
        'client_id' => getenv('KEYCLOAK_CLIENT_ID'),
        'client_secret' => getenv('KEYCLOAK_CLIENT_SECRET'),
        'redirect_uri' => getenv('APP_HOST') . '/auth/callback',
    );

    // Faz uma solicitação POST para obter o token de acesso
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($params));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    
    curl_close($ch);

    // Decodifica a resposta JSON
    $token_data = json_decode($response, true);
    
    echo '<b>PHP Debug </b>';
    echo '<hr>';
    echo '<pre>';
    echo var_dump($token_data);
    echo '</pre>';
    exit;
    
    // Verifica se o token de acesso foi obtido com sucesso
    if (isset($token_data['access_token'])) {
        // Token de acesso obtido com sucesso, você pode realizar ações aqui
        // Por exemplo, redirecionar o usuário para uma área restrita do site
        header('Location: https://seu_site.com/area_restrita.php');
        exit();
    } else {
        // Ocorreu um erro ao obter o token de acesso, você pode lidar com isso aqui
        echo "Erro ao obter o token de acesso: " . $token_data['error_description'];
    }
} else {
    // O código de autorização não está presente na URL, o usuário pode ter chegado aqui de forma inesperada
    echo "Código de autorização não encontrado na URL.";
}