<?php

header('content-type:text/html;charset=utf-8');

session_start();

echo '用户名：'.$_SESSION['username'];