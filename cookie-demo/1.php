<?php

header('content-type:text/html;charset=utf-8');

session_start();

$_SESSION['username'] = 'mooc';

echo '<a href="2.html">链接到第二页</a>';