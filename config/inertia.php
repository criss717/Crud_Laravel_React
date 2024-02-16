<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Inertia Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for storing the configuration for Inertia. You can modify
    | the configuration as needed, but this file provides a sensible
    | default configuration out of the box. Note: You may also want to
    | check out the inertia.php configuration file for more options.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | SSR (Server-Side Rendering)
    |--------------------------------------------------------------------------
    |
    | This option controls whether or not the Inertia SSR (Server-Side Rendering)
    | is enabled. When SSR is enabled, Inertia will send a full HTML page
    | on initial load instead of a bare-bones HTML page with a script tag.
    |
    */

    'ssr' => [
        'enabled' => true,
        'url' => env('SSR_URL', 'http://127.0.0.1:13714'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Share Everything
    |--------------------------------------------------------------------------
    |
    | This option controls whether or not all shared data should be included in
    | every Inertia response. If this option is enabled, you do not need to
    | use the `with` method to include shared data in your Inertia responses.
    |
    */

    
    /*
    |--------------------------------------------------------------------------
    | Middleware
    |--------------------------------------------------------------------------
    |
    | These middleware will be run during every Inertia response. You can
    | use middleware to add data to all of your views.
    |
    */

    'middleware' => [
        // Add your middleware here
    ],

];
