<?php
/**
 * @file
 * amazee.io Drupal 7 production environment configuration file.
 *
 * This file will only be included on production environemnts.
 *
 * It contains some defaults that the amazee.io team suggests, please edit them as required.
 */

// Don't show any error messages on the site (will still be shown in watchdog)
$conf['error_level'] = 0;

// Anonymous caching enabled
$conf['cache'] = 1;

// Block caching enabled
$conf['block_cache'] = 1;

// Expiration of cached pages on Varnish to 15 min
$conf['page_cache_maximum_age'] = 900;

// Aggregate and compress CSS files on
$conf['preprocess_css'] = 1;

// Aggregate JavaScript files on
$conf['preprocess_js'] = 1;

// Disabling stage_file_proxy on production, with that the module can be enabled even on production
$conf['stage_file_proxy_origin'] = false;
$conf['stage_file_proxy_origin_dir'] = false;


// Enable Tag Manager
 $config['e3_google_tag.settings']['gtm_code'] = 'GTM-PQPMKR5';

// Stripe production API config
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['mode'] = 'live';
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['publishable_key'] = getenv('AMAZEEIO_STRIPE_PK');
$config['commerce_payment.commerce_payment_gateway.stripe']['configuration']['secret_key'] = getenv('AMAZEEIO_STRIPE_SK');
