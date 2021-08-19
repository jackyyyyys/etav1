<?php

$request = $_SERVER['REQUEST_URI'];

switch ($request) {
    case '/' :
        require __DIR__ . '/index.html';
        break;
    case '' :
        require __DIR__ . '/index.html';
        break;
    case '/fulham' :
        require __DIR__ . '/index.html';
        break;
    case '/pokfield' :
        require __DIR__ . '/pokfield.html';
        break;
    case '/cyberport' :
        require __DIR__ . '/cyberport.html';
        break;
    case '/kcity' :
        require __DIR__ . '/kcity.html';
        break;
    default:
        http_response_code(404);
        require __DIR__ . '/views/404.php';
        break;
}