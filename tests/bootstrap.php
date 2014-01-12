<?php

$file = __DIR__ . '/../vendor/autoload.php';
if (file_exists($file)) {
    $loader = require_once($file);
    $loader->add('', __DIR__);
}

// Disable circular reference garbage collection as this sometimes leads to crashes (noticed on Windows as well as on
// Ubuntu systems).
gc_disable();
